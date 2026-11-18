/* ==========================================================================
   AZIZ COMPUTERS — BACKEND (Express on Render)
   --------------------------------------------------------------------------
   Serves the website files and takes card payments through Stripe.
   ========================================================================== */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/* ---------------------------------------------- reading products / config */

function parseJsValue(src, start) {
  let i = start;
  const fail = (msg) => { throw new Error(msg + ' at character ' + i); };

  function skip() {
    for (;;) {
      const c = src[i];
      if (c === ' ' || c === '\n' || c === '\r' || c === '\t' || c === '﻿') { i++; }
      else if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') { i++; } }
      else if (c === '/' && src[i + 1] === '*') {
        const end = src.indexOf('*/', i + 2);
        if (end === -1) { fail('Unclosed comment'); }
        i = end + 2;
      } else { return; }
    }
  }

  function str() {
    const q = src[i++];
    let out = '';
    while (i < src.length && src[i] !== q) {
      const c = src[i++];
      if (c !== '\\') { out += c; continue; }
      const n = src[i++];
      if (n === 'n') { out += '\n'; }
      else if (n === 't') { out += '\t'; }
      else if (n === 'r') { out += '\r'; }
      else if (n === 'u') { out += String.fromCharCode(parseInt(src.substr(i, 4), 16)); i += 4; }
      else if (n === '\n') { /* line continuation */ }
      else { out += n; }
    }
    if (src[i] !== q) { fail('Unclosed string'); }
    i++;
    return out;
  }

  function value() {
    skip();
    const c = src[i];
    if (c === '{') {
      i++;
      const obj = {};
      for (;;) {
        skip();
        if (src[i] === '}') { i++; return obj; }
        let key;
        if (src[i] === "'" || src[i] === '"' || src[i] === '`') { key = str(); }
        else {
          const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 80));
          if (!m) { fail('Expected a property name'); }
          key = m[0]; i += key.length;
        }
        skip();
        if (src[i] !== ':') { fail('Expected ":"'); }
        i++;
        obj[key] = value();
        skip();
        if (src[i] === ',') { i++; }
      }
    }
    if (c === '[') {
      i++;
      const arr = [];
      for (;;) {
        skip();
        if (src[i] === ']') { i++; return arr; }
        arr.push(value());
        skip();
        if (src[i] === ',') { i++; }
      }
    }
    if (c === "'" || c === '"' || c === '`') { return str(); }
    const rest = src.slice(i, i + 40);
    const num = /^-?\d+(\.\d+)?([eE][+-]?\d+)?/.exec(rest);
    if (num) { i += num[0].length; return parseFloat(num[0]); }
    const word = /^(true|false|null|undefined)\b/.exec(rest);
    if (word) { i += word[0].length; return word[1] === 'true' ? true : word[1] === 'false' ? false : null; }
    return fail('Unexpected "' + (c || 'end of file') + '"');
  }

  return value();
}

function readConst(src, name) {
  const m = new RegExp('const\\s+' + name + '\\s*=\\s*').exec(src);
  if (!m) { throw new Error('Could not find "const ' + name + '"'); }
  return parseJsValue(src, m.index + m[0].length);
}

/* ---------------------------------------------------------------- the app */

function createApp(options) {
  const stripe = options.stripe;
  const rootDir = options.rootDir || __dirname;
  const env = options.env || process.env;

  const cache = { products: null, config: null, mtime: '' };
  function siteData() {
    const pFile = path.join(rootDir, 'assets/js/products.js');
    const cFile = path.join(rootDir, 'assets/js/config.js');
    const stamp = fs.statSync(pFile).mtimeMs + ':' + fs.statSync(cFile).mtimeMs;
    if (stamp !== cache.mtime) {
      const list = readConst(fs.readFileSync(pFile, 'utf8'), 'products');
      const byId = {};
      list.forEach((p) => { if (p && p.id) { byId[p.id] = p; } });
      cache.products = byId;
      cache.config = readConst(fs.readFileSync(cFile, 'utf8'), 'storeConfig');
      cache.mtime = stamp;
    }
    return cache;
  }

  function quote(items) {
    const { products, config } = siteData();
    const merged = {};
    items.forEach((it) => {
      const id = String((it && it.id) || '');
      const qty = parseInt(it && it.qty, 10);
      if (!id || !qty || qty < 1) { throw clientError('Invalid quantity in your cart.'); }
      merged[id] = (merged[id] || 0) + qty;
    });

    const lines = [];
    let subtotalFils = 0;
    Object.keys(merged).forEach((id) => {
      const p = products[id];
      const qty = merged[id];
      if (!p) { throw clientError('An item in your cart is no longer sold. Please refresh the page.'); }
      const stock = Number(p.stock) || 0;
      if (stock <= 0) { throw clientError(p.name + ' is out of stock.'); }
      if (qty > stock || qty > 99) { throw clientError('Only ' + Math.min(stock, 99) + ' of "' + String(p.name).slice(0, 60) + '" available.'); }
      const price = (p.salePrice != null && p.salePrice < p.price) ? p.salePrice : p.price;
      subtotalFils += Math.round(price * 100) * qty;
      lines.push((p.sku || p.id) + ' x' + qty);
    });
    if (!lines.length) { throw clientError('Your cart is empty.'); }

    const freeOver = Math.round(Number(config.freeDeliveryOver) * 100);
    const deliveryFils = subtotalFils >= freeOver ? 0 : Math.round((Number(config.deliveryFee) || 0) * 100);
    const rate = Number(config.vatRate) || 0;
    const vatFils = rate > 0 ? Math.round((subtotalFils + deliveryFils) * rate) : 0;
    return {
      currency: String(config.currency || 'AED').toLowerCase(),
      subtotalFils, deliveryFils, vatFils,
      totalFils: subtotalFils + deliveryFils + vatFils,
      summary: lines.join('; ')
    };
  }

  function clientError(message) { const e = new Error(message); e.client = true; return e; }

  const clip = (s, n) => { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
  const makeRef = () => 'AZ-' + crypto.randomBytes(4).readUInt32BE(0).toString(36).toUpperCase().padStart(6, '0').slice(-6);

  const app = express();
  app.set('trust proxy', 1);

  /* Explicitly whitelist your production domain to prevent CORS blocking */
  function allowedOrigins() {
    const list = [
      'https://azizcomputers.com',
      'https://www.azizcomputers.com'
    ];
    const add = (u) => { try { if (u) { list.push(new URL(u.trim()).origin); } } catch (e) { /* ignore */ } };
    try { add(siteData().config.siteUrl); } catch (e) { /* ignore */ }
    add(env.RENDER_EXTERNAL_URL);
    String(env.ALLOWED_ORIGINS || '').split(',').forEach(add);
    if (env.NODE_ENV !== 'production') { add('http://localhost:4242'); add('http://localhost:8080'); }
    return list;
  }

  app.use(cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins().indexOf(origin) !== -1) { return cb(null, true); }
      return cb(null, false);
    }
  }));
  app.use(express.json({ limit: '20kb' }));

  const hits = new Map();
  function limit(max, windowMs) {
    return (req, res, next) => {
      const now = Date.now();
      const key = req.ip + req.path;
      const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
      if (recent.length >= max) { return res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' }); }
      recent.push(now);
      hits.set(key, recent);
      next();
    };
  }

  app.get('/healthz', (req, res) => res.json({ ok: true }));

  app.post('/api/create-payment-intent', limit(20, 10 * 60 * 1000), async (req, res) => {
    try {
      const body = req.body || {};
      const items = Array.isArray(body.items) ? body.items : [];
      const c = body.customer || {};
      if (!items.length || items.length > 50) { throw clientError('Your cart is empty.'); }

      const name = String(c.name || '').trim();
      const phone = String(c.phone || '').trim();
      const email = String(c.email || '').trim();
      const address = String(c.address || '').trim();
      const city = String(c.city || '').trim();
      if (name.length < 2 || phone.replace(/\D/g, '').length < 9 || address.length < 8 || city.length < 2) {
        throw clientError('Please check your delivery details.');
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { throw clientError('That email address does not look right.'); }

      const q = quote(items);
      const ref = makeRef();
      const meta = {
        ref, name: clip(name, 480), phone: clip(phone, 480), email: clip(email, 480),
        address: clip(address.replace(/\s*\n\s*/g, ', '), 480), city: clip(city, 480),
        notes: clip(c.notes, 480), items: clip(q.summary, 480),
        subtotal: (q.subtotalFils / 100).toFixed(2), delivery: (q.deliveryFils / 100).toFixed(2), vat: (q.vatFils / 100).toFixed(2)
      };
      Object.keys(meta).forEach((k) => { if (meta[k] === '') { delete meta[k]; } });

      const params = {
        amount: q.totalFils,
        currency: q.currency,
        automatic_payment_methods: { enabled: true },
        description: 'Order ' + ref + ' — ' + clip(name, 60),
        metadata: meta
      };
      if (email) { params.receipt_email = email; }

      const intent = await stripe.paymentIntents.create(params);
      res.json({ clientSecret: intent.client_secret, ref, amount: q.totalFils / 100 });
    } catch (err) {
      if (err.client) { return res.status(400).json({ error: err.message }); }
      console.error('create-payment-intent failed:', err && err.message);
      res.status(500).json({ error: 'We could not start the card payment. Please try again or choose another payment method.' });
    }
  });

  app.get('/api/verify-payment', limit(60, 10 * 60 * 1000), async (req, res) => {
    const id = String(req.query.payment_intent || '');
    if (!/^pi_[A-Za-z0-9]+$/.test(id)) { return res.status(400).json({ error: 'Invalid payment.' }); }
    try {
      const pi = await stripe.paymentIntents.retrieve(id);
      res.json({
        paid: pi.status === 'succeeded',
        processing: pi.status === 'processing',
        ref: (pi.metadata && pi.metadata.ref) || '',
        total: (pi.amount || 0) / 100,
        currency: String(pi.currency || '').toUpperCase()
      });
    } catch (err) {
      console.error('verify-payment failed:', err && err.message);
      res.status(502).json({ error: 'Could not confirm the payment.' });
    }
  });

  app.use((req, res, next) => {
    let p;
    try { p = decodeURIComponent(req.path).toLowerCase(); } catch (e) { return res.status(400).send('Bad request'); }
    if (/^\/(server\.js|package(-lock)?\.json|render\.ya?ml|node_modules(\/|$)|worker(\/|$))/.test(p) || p.indexOf('/.') !== -1) {
      return res.status(404).send('Not found');
    }
    next();
  });
  app.use(express.static(rootDir, { dotfiles: 'deny' }));

  return app;
}

module.exports = { createApp, parseJsValue, readConst };

if (require.main === module) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set. Add it in Render -> Environment.');
    process.exit(1);
  }
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const PORT = process.env.PORT || 4242;
  createApp({ stripe }).listen(PORT, () => {
    console.log('Aziz Computers backend running at http://localhost:' + PORT);
  });
}