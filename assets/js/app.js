/* ==========================================================================
   AZIZ UTHMAN ELECTRONICS — core application script
   --------------------------------------------------------------------------
   Loaded on every page, after config.js and products.js.
   Provides: money formatting, catalogue queries, cart state (localStorage),
   wishlist, header/footer rendering, cart drawer, search, WhatsApp links.

   You should not need to edit this file to change business details or
   products — use assets/js/config.js and assets/js/products.js instead.
   ========================================================================== */

/* eslint-disable no-var */
var App = (function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */

  var STORAGE = {
    cart: 'aziz.cart.v1',
    wishlist: 'aziz.wishlist.v1',
    recent: 'aziz.recent.v1'
  };

  /* localStorage with an in-memory fallback (private mode / sandboxes) */
  var store = (function () {
    var mem = {};
    var ok = false;
    try {
      window.localStorage.setItem('__t', '1');
      window.localStorage.removeItem('__t');
      ok = true;
    } catch (e) { ok = false; }
    return {
      get: function (k) {
        try { return ok ? window.localStorage.getItem(k) : (mem[k] || null); }
        catch (e) { return mem[k] || null; }
      },
      set: function (k, v) {
        try { if (ok) { window.localStorage.setItem(k, v); } else { mem[k] = v; } }
        catch (e) { mem[k] = v; }
      }
    };
  })();

  function readJSON(key, fallback) {
    var raw = store.get(key);
    if (!raw) { return fallback; }
    try {
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) { store.set(key, JSON.stringify(value)); }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) { return null; }
  }

  function money(amount) {
    var n = Math.round(Number(amount) || 0);
    var num;
    try { num = new Intl.NumberFormat(storeConfig.currencyLocale || 'en-AE').format(n); }
    catch (e) { num = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
    return storeConfig.currency + ' ' + num;
  }

  /* Placeholder used when a product photo is missing or fails to load */
  var FALLBACK_IMG = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<rect width="400" height="400" fill="#F0EFEA"/>' +
    '<rect x="140" y="150" width="120" height="90" rx="6" fill="none" stroke="#C3BFB2" stroke-width="7"/>' +
    '<path d="M170 250h60M200 240v10" stroke="#C3BFB2" stroke-width="7" stroke-linecap="round"/>' +
    '</svg>');

  function imgTag(src, alt, cls) {
    var safe = src && String(src).length ? src : FALLBACK_IMG;
    return '<img src="' + esc(safe) + '" alt="' + esc(alt || '') + '" loading="lazy"' +
      (cls ? ' class="' + cls + '"' : '') +
      ' onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'">';
  }

  /* ----------------------------------------------------------------- icons */
  var icons = {
    search: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
    cart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2.2l2 12.2h11.2L21 7H6"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/></svg>',
    heart: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/></svg>',
    heartFill: '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/></svg>',
    user: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8.5" r="3.6"/><path d="M4.5 20c1.4-3.6 4.2-5.4 7.5-5.4S18.1 16.4 19.5 20"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    chevron: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m7 10 5 5 5-5"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h3.5l1.6 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.6V19a1.5 1.5 0 0 1-1.7 1.5A15.5 15.5 0 0 1 3.5 5.7 1.5 1.5 0 0 1 5 4z"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.6 6.5 8.4 6 8.4-6"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/></svg>',
    whatsapp: '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.03c-.25.69-1.44 1.32-1.99 1.37-.53.05-1.02.24-3.44-.72-2.9-1.14-4.73-4.1-4.87-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09 1-2.38c.26-.29.57-.36.76-.36l.55.01c.18.01.41-.07.64.49.25.6.83 2.07.9 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.76 1.26 1.63 2.04 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.15.19-.29.39-.24.65-.14.26.1 1.65.78 1.93.92.29.14.48.22.55.34.07.12.07.7-.18 1.39z"/></svg>',
    truck: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7h10v9H3zM13 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3.2 5 6v5.5c0 4.3 3 7.6 7 9.3 4-1.7 7-5 7-9.3V6z"/><path d="m9 12 2.2 2.2L15.4 10"/></svg>',
    cash: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg>',
    tools: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6l-8 8a2.3 2.3 0 0 1-3.3-3.3z"/><path d="M6 6l3 3"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
    laptop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2.5 19h19"/></svg>',
    desktop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="3" width="12" height="18" rx="1.6"/><path d="M9 7h6M9 10h3"/></svg>',
    gpu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="7" width="19" height="10" rx="1.5"/><circle cx="9" cy="12" r="2.4"/><circle cx="16" cy="12" r="2.4"/></svg>',
    cpu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3"/></svg>',
    board: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="6" height="6" rx="1"/><path d="M16 8h2M16 11h2M8 17h8"/></svg>',
    ram: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="8" width="19" height="8" rx="1.2"/><path d="M6 16v2M10 16v2M14 16v2M18 16v2"/></svg>',
    ssd: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3.4"/></svg>',
    power: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="9" cy="12" r="3"/><path d="M15 10h3M15 14h3"/></svg>',
    case: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="2.5" width="14" height="19" rx="1.6"/><circle cx="12" cy="9" r="3"/><path d="M9 16h6"/></svg>',
    fan: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 10V5M14 12h5M12 14v5M10 12H5"/></svg>',
    monitor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="1.6"/><path d="M9 20h6M12 16v4"/></svg>',
    keyboard: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="6.5" width="19" height="11" rx="1.6"/><path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M8 14h8"/></svg>',
    mouse: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v3"/></svg>',
    headset: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4.5" height="6" rx="1.6"/><rect x="17" y="13" width="4.5" height="6" rx="1.6"/></svg>',
    wifi: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 9a13 13 0 0 1 17 0M6.5 12.5a8.5 8.5 0 0 1 11 0M9.5 16a4 4 0 0 1 5 0"/><circle cx="12" cy="19" r="1.2"/></svg>',
    plug: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/></svg>',
    sun: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/></svg>',
    moon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.5 13.4A8.4 8.4 0 0 1 10.6 3.5a8.4 8.4 0 1 0 9.9 9.9z"/></svg>',
    instagram: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r="1"/></svg>',
    facebook: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.5-1.5h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.7v8z"/></svg>',
    linkedin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 20H4V9h2.9zM5.4 7.6A1.7 1.7 0 1 1 5.4 4a1.7 1.7 0 0 1 0 3.6zM20 20h-2.9v-5.4c0-1.3-.5-2.2-1.6-2.2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V20H10.9V9h2.9v1.5a2.9 2.9 0 0 1 2.6-1.4c1.9 0 3.6 1.2 3.6 4z"/></svg>',
    tiktok: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2 1.6 3.3 3.5 3.5v2.6c-1.3.1-2.5-.2-3.6-.9v5.9a5.5 5.5 0 1 1-5.5-5.5c.3 0 .5 0 .8.1v2.7a2.8 2.8 0 1 0 2 2.7V3z"/></svg>',
    x: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.8 21h-5.9l-4.3-5.6L6.6 21H3.5l7-8L2.6 3h6l3.9 5.2zm-1 16h1.6L8.1 4.6H6.4z"/></svg>'
  };

  /* ------------------------------------------------------------ catalogue */

  var Catalog = {
    all: function () { return products.slice(); },

    byId: function (id) {
      for (var i = 0; i < products.length; i++) { if (products[i].id === id) { return products[i]; } }
      return null;
    },

    bySlug: function (slug) {
      for (var i = 0; i < products.length; i++) { if (products[i].slug === slug) { return products[i]; } }
      return null;
    },

    category: function (slug) {
      for (var i = 0; i < categories.length; i++) { if (categories[i].slug === slug) { return categories[i]; } }
      return null;
    },

    categoryName: function (slug) {
      var c = Catalog.category(slug);
      return c ? c.name : slug;
    },

    countIn: function (slug) {
      return products.filter(function (p) { return p.category === slug; }).length;
    },

    price: function (p) { return (p.salePrice != null && p.salePrice < p.price) ? p.salePrice : p.price; },

    discountPct: function (p) {
      if (p.salePrice == null || p.salePrice >= p.price) { return 0; }
      return Math.round(((p.price - p.salePrice) / p.price) * 100);
    },

    inStock: function (p) { return Number(p.stock) > 0; },

    /* keyword search across name, brand, sku, category, tags */
    search: function (query) {
      var q = String(query || '').trim().toLowerCase();
      if (!q) { return []; }
      var words = q.split(/\s+/);
      return products.filter(function (p) {
        var hay = [
          p.name, p.brand, p.sku, p.subcategory || '',
          Catalog.categoryName(p.category),
          (p.tags || []).join(' '),
          p.shortDescription || ''
        ].join(' ').toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
    },

    related: function (p, limit) {
      var same = products.filter(function (x) { return x.id !== p.id && x.category === p.category; });
      if (same.length < (limit || 4)) {
        var brandMatch = products.filter(function (x) {
          return x.id !== p.id && x.brand === p.brand && x.category !== p.category;
        });
        same = same.concat(brandMatch);
      }
      return same.slice(0, limit || 4);
    }
  };

  /* ------------------------------------------------------------ recently viewed */

  var Recent = {
    list: function () {
      return readJSON(STORAGE.recent, []).filter(function (id) { return !!Catalog.byId(id); });
    },
    push: function (id) {
      var list = Recent.list().filter(function (x) { return x !== id; });
      list.unshift(id);
      writeJSON(STORAGE.recent, list.slice(0, 8));
    }
  };

  /* ------------------------------------------------------------- wishlist */

  var Wishlist = {
    ids: function () {
      return readJSON(STORAGE.wishlist, []).filter(function (id) { return !!Catalog.byId(id); });
    },
    has: function (id) { return Wishlist.ids().indexOf(id) !== -1; },
    toggle: function (id) {
      var list = Wishlist.ids();
      var i = list.indexOf(id);
      if (i === -1) { list.push(id); } else { list.splice(i, 1); }
      writeJSON(STORAGE.wishlist, list);
      UI.syncCounts();
      return i === -1;
    }
  };

  /* ---------------------------------------------------------------- theme */

  /* Two themes: 'light' (blue gradient) and 'dark' (gold gradient).
     The choice is remembered per visitor. storeConfig.defaultTheme decides
     what a first-time visitor sees: 'auto' follows their device setting. */
  var Theme = {
    KEY: 'aziz.theme',

    saved: function () {
      var v = store.get(Theme.KEY);
      return (v === 'light' || v === 'dark') ? v : null;
    },

    systemPrefersDark: function () {
      try { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
      catch (e) { return false; }
    },

    current: function () {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    },

    /* write the palette from config over the CSS variables */
    apply: function (mode, remember) {
      var t = (storeConfig.theme && storeConfig.theme[mode]) || {};
      var root = document.documentElement;
      root.setAttribute('data-theme', mode);
      if (t.accent) { root.style.setProperty('--gold', t.accent); }
      if (t.accentDeep) { root.style.setProperty('--gold-deep', t.accentDeep); }
      if (t.gradient) { root.style.setProperty('--grad', t.gradient); }
      if (t.tint) { root.style.setProperty('--tint', t.tint); }
      if (remember) { store.set(Theme.KEY, mode); }
      Theme.syncButtons();
    },

    toggle: function () {
      Theme.apply(Theme.current() === 'dark' ? 'light' : 'dark', true);
    },

    syncButtons: function () {
      var dark = Theme.current() === 'dark';
      var nodes = document.querySelectorAll('[data-theme-toggle]');
      Array.prototype.forEach.call(nodes, function (btn) {
        btn.innerHTML = (dark ? icons.sun : icons.moon) + '<span>' + (dark ? 'Light' : 'Dark') + '</span>';
        btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
        btn.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' theme');
      });
    },

    init: function () {
      var choice = Theme.saved();
      if (!choice) {
        var def = storeConfig.defaultTheme || 'auto';
        choice = def === 'auto' ? (Theme.systemPrefersDark() ? 'dark' : 'light') : def;
      }
      Theme.apply(choice, false);

      /* follow the device setting until the visitor picks a side themselves */
      try {
        if (window.matchMedia) {
          var mq = window.matchMedia('(prefers-color-scheme: dark)');
          var onChange = function (e) {
            if (!Theme.saved() && (storeConfig.defaultTheme || 'auto') === 'auto') {
              Theme.apply(e.matches ? 'dark' : 'light', false);
            }
          };
          if (mq.addEventListener) { mq.addEventListener('change', onChange); }
          else if (mq.addListener) { mq.addListener(onChange); }
        }
      } catch (e) { /* matchMedia unavailable — ignore */ }
    }
  };

  /* ----------------------------------------------------------------- cart */

  var Cart = {
    lines: [],

    load: function () {
      Cart.lines = readJSON(STORAGE.cart, [])
        .filter(function (l) { return l && Catalog.byId(l.id); })
        .map(function (l) { return { id: l.id, qty: Cart.clamp(l.id, parseInt(l.qty, 10) || 1) }; });
    },

    save: function () { writeJSON(STORAGE.cart, Cart.lines); },

    clamp: function (id, qty) {
      var p = Catalog.byId(id);
      var max = p ? Math.max(1, Number(p.stock) || 1) : 99;
      if (isNaN(qty) || qty < 1) { return 1; }
      return Math.min(qty, Math.min(max, 99));
    },

    find: function (id) {
      for (var i = 0; i < Cart.lines.length; i++) { if (Cart.lines[i].id === id) { return Cart.lines[i]; } }
      return null;
    },

    add: function (id, qty) {
      var p = Catalog.byId(id);
      if (!p) { return false; }
      if (!Catalog.inStock(p)) { UI.toast('That item is out of stock — ask us on WhatsApp for arrival dates'); return false; }
      var line = Cart.find(id);
      var want = (line ? line.qty : 0) + (qty || 1);
      if (line) { line.qty = Cart.clamp(id, want); } else { Cart.lines.push({ id: id, qty: Cart.clamp(id, want) }); }
      Cart.save();
      UI.renderCart();
      UI.bump();
      UI.toast(p.name + ' added to cart');
      return true;
    },

    setQty: function (id, qty) {
      var line = Cart.find(id);
      if (!line) { return; }
      if (qty < 1) { Cart.remove(id); return; }
      var clamped = Cart.clamp(id, qty);
      if (clamped < qty) { UI.toast('Only ' + clamped + ' in stock right now'); }
      line.qty = clamped;
      Cart.save();
      UI.renderCart();
    },

    remove: function (id) {
      var p = Catalog.byId(id);
      Cart.lines = Cart.lines.filter(function (l) { return l.id !== id; });
      Cart.save();
      UI.renderCart();
      if (p) { UI.toast(p.name + ' removed'); }
    },

    clear: function () { Cart.lines = []; Cart.save(); UI.renderCart(); },

    count: function () {
      return Cart.lines.reduce(function (n, l) { return n + l.qty; }, 0);
    },

    subtotal: function () {
      return Cart.lines.reduce(function (sum, l) {
        var p = Catalog.byId(l.id);
        return p ? sum + Catalog.price(p) * l.qty : sum;
      }, 0);
    },

    savings: function () {
      return Cart.lines.reduce(function (sum, l) {
        var p = Catalog.byId(l.id);
        if (!p || p.salePrice == null || p.salePrice >= p.price) { return sum; }
        return sum + (p.price - p.salePrice) * l.qty;
      }, 0);
    },

    delivery: function () {
      var sub = Cart.subtotal();
      if (sub <= 0) { return 0; }
      return sub >= storeConfig.freeDeliveryOver ? 0 : storeConfig.deliveryFee;
    },

    total: function () { return Cart.subtotal() + Cart.delivery(); },

    /* VAT already included in displayed prices — shown for the invoice line */
    vatPortion: function () {
      var rate = storeConfig.vatRate || 0;
      if (!storeConfig.vatIncludedInPrices || !rate) { return 0; }
      return Cart.total() - (Cart.total() / (1 + rate));
    },

    detailed: function () {
      return Cart.lines.map(function (l) {
        var p = Catalog.byId(l.id);
        return { product: p, qty: l.qty, lineTotal: Catalog.price(p) * l.qty };
      }).filter(function (x) { return !!x.product; });
    }
  };

  /* ------------------------------------------------------------- WhatsApp */

  var WhatsApp = {
    base: function () { return 'https://wa.me/' + String(storeConfig.whatsapp).replace(/\D/g, ''); },

    link: function (text) { return WhatsApp.base() + '?text=' + encodeURIComponent(text); },

    /* "Order on WhatsApp" from a product page or card */
    product: function (p, qty) {
      var lines = [
        'Hello ' + storeConfig.businessName + ', I am interested in ordering:',
        '',
        'Product: ' + p.name,
        'SKU: ' + p.sku,
        'Quantity: ' + (qty || 1),
        'Price: ' + storeConfig.currency + ' ' + Catalog.price(p).toLocaleString('en-US'),
        '',
        'Is this in stock?'
      ];
      return WhatsApp.link(lines.join('\n'));
    },

    /* Whole cart, with or without customer details */
    order: function (details) {
      var ref = 'AZ-' + Date.now().toString(36).toUpperCase().slice(-6);
      var lines = [];
      lines.push('*New order — ' + storeConfig.businessName + '*');
      lines.push('Ref: ' + ref);
      lines.push('');
      lines.push('*Items*');
      Cart.detailed().forEach(function (item, i) {
        lines.push((i + 1) + '. ' + item.product.name);
        lines.push('   SKU: ' + item.product.sku);
        lines.push('   ' + item.qty + ' × ' + money(Catalog.price(item.product)) + ' = ' + money(item.lineTotal));
      });
      lines.push('');
      lines.push('Subtotal: ' + money(Cart.subtotal()));
      if (Cart.savings() > 0) { lines.push('You save: ' + money(Cart.savings())); }
      lines.push('Delivery: ' + (Cart.delivery() === 0 ? 'Free' : money(Cart.delivery())));
      lines.push('*Total: ' + money(Cart.total()) + '* (incl. 5% VAT)');

      if (details) {
        lines.push('');
        lines.push('*Delivery details*');
        lines.push('Name: ' + details.name);
        lines.push('Phone: ' + details.phone);
        if (details.email) { lines.push('Email: ' + details.email); }
        lines.push('Address: ' + details.address);
        lines.push('Emirate / City: ' + details.city);
        lines.push('Payment: ' + details.payment);
        if (details.notes) { lines.push('Notes: ' + details.notes); }
      }
      lines.push('');
      lines.push('Please confirm stock and delivery time. Thank you.');
      return { url: WhatsApp.link(lines.join('\n')), ref: ref };
    },

    enquiry: function (subject) {
      return WhatsApp.link('Hello ' + storeConfig.businessName + ', I would like to ask about ' + (subject || 'a product') + '.');
    }
  };

  /* --------------------------------------------------------- product card */

  function productCard(p) {
    var onSale = Catalog.discountPct(p) > 0;
    var out = !Catalog.inStock(p);
    var href = 'product.html?p=' + encodeURIComponent(p.slug);

    var flags = '';
    if (onSale) { flags += '<span class="chip chip-sale">-' + Catalog.discountPct(p) + '%</span>'; }
    if (p.newProduct) { flags += '<span class="chip chip-new">New</span>'; }

    var stockChip = out
      ? '<span class="chip chip-out">Out of stock</span>'
      : (p.stock <= 5
        ? '<span class="chip chip-low">Only ' + p.stock + ' left</span>'
        : '<span class="chip chip-stock">In stock</span>');

    var priceBlock = '<div class="price"><span class="now">' + money(Catalog.price(p)) + '</span>' +
      (onSale ? '<span class="was">' + money(p.price) + '</span>' : '') + '</div>';

    var saved = Wishlist.has(p.id);

    return '' +
      '<article class="pcard" data-id="' + esc(p.id) + '">' +
        '<a class="pcard-media" href="' + href + '" aria-label="' + esc(p.name) + '">' +
          imgTag(p.images && p.images[0], p.name) +
        '</a>' +
        '<div class="pcard-flags">' + flags + '</div>' +
        '<button class="pcard-wish" type="button" data-wish="' + esc(p.id) + '" aria-pressed="' + (saved ? 'true' : 'false') +
          '" aria-label="Save ' + esc(p.name) + ' to wishlist">' + (saved ? icons.heartFill : icons.heart) + '</button>' +
        '<div class="pcard-body">' +
          '<span class="pcard-brand">' + esc(p.brand) + '</span>' +
          '<h3><a href="' + href + '">' + esc(p.name) + '</a></h3>' +
          '<div class="pcard-meta">' + stockChip + '<span class="chip">' + esc(Catalog.categoryName(p.category)) + '</span></div>' +
        '</div>' +
        '<div class="pcard-foot">' +
          priceBlock +
          '<div class="pcard-actions">' +
            '<button class="btn btn-primary btn-sm" type="button" data-add="' + esc(p.id) + '"' + (out ? ' disabled' : '') + '>' +
              (out ? 'Out of stock' : 'Add to cart') + '</button>' +
            '<a class="btn btn-ghost btn-sm" href="' + href + '">Details</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ------------------------------------------------------------------- UI */

  var UI = {
    el: {},

    /* set the light or dark theme (see the Theme module above) */
    applyTheme: function () { Theme.init(); },

    /* page <title>, meta description, canonical, favicon, OG tags */
    applyMeta: function (opts) {
      opts = opts || {};
      var title = opts.title
        ? opts.title + ' | ' + storeConfig.businessName
        : storeConfig.businessName + ' — Computer Hardware & Accessories in Dubai';
      document.title = title;

      function meta(attr, key, content) {
        if (!content) { return; }
        var node = document.head.querySelector('meta[' + attr + '="' + key + '"]');
        if (!node) {
          node = document.createElement('meta');
          node.setAttribute(attr, key);
          document.head.appendChild(node);
        }
        node.setAttribute('content', content);
      }
      var desc = opts.description || storeConfig.defaultMetaDescription;
      meta('name', 'description', desc);
      meta('property', 'og:title', title);
      meta('property', 'og:description', desc);
      meta('property', 'og:type', opts.type || 'website');
      meta('property', 'og:site_name', storeConfig.businessName);
      meta('property', 'og:image', opts.image || storeConfig.logo);
      meta('name', 'twitter:card', 'summary_large_image');

      var canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      var path = window.location.pathname.split('/').pop() || 'index.html';
      canonical.setAttribute('href', (storeConfig.siteUrl || '').replace(/\/$/, '') + '/' + path + (opts.canonicalQuery || ''));

      var icon = document.head.querySelector('link[rel="icon"]');
      if (!icon) {
        icon = document.createElement('link');
        icon.setAttribute('rel', 'icon');
        document.head.appendChild(icon);
      }
      icon.setAttribute('href', storeConfig.favicon || storeConfig.logo);
    },

    /* structured data (JSON-LD) */
    jsonLd: function (obj) {
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    },

    /* ---------------------------------------------------- header + footer */

    renderHeader: function (active) {
      var host = document.getElementById('site-header');
      if (!host) { return; }
      var a = storeConfig.address;

      var groups = {};
      categories.forEach(function (c) {
        (groups[c.group] = groups[c.group] || []).push(c);
      });

      var megaCols = Object.keys(groups).map(function (g) {
        return '<div><h3>' + esc(g) + '</h3><ul>' +
          groups[g].map(function (c) {
            return '<li><a href="shop.html?category=' + encodeURIComponent(c.slug) + '">' + esc(c.name) +
              ' <span style="color:var(--ink-3);font-size:11.5px">(' + Catalog.countIn(c.slug) + ')</span></a></li>';
          }).join('') +
          '</ul></div>';
      }).join('');

      var mobileCats = categories.map(function (c) {
        return '<a class="mn-sub" href="shop.html?category=' + encodeURIComponent(c.slug) + '">' + esc(c.name) + '</a>';
      }).join('');

      host.innerHTML = '' +
        '<div class="topbar"><div class="wrap">' +
          '<div class="topbar-left"><b>' + esc(storeConfig.deliveryTime) + '</b> · Free delivery over ' + money(storeConfig.freeDeliveryOver) + '</div>' +
          '<div class="topbar-right">' +
            '<a class="hide-sm" href="tel:' + esc(storeConfig.phoneDial) + '">' + esc(storeConfig.phone) + '</a>' +
            '<a class="hide-sm" href="shop.html?saved=1">Saved items</a>' +
            '<a href="contact.html">Store &amp; support</a>' +
            (storeConfig.showThemeToggle === false ? '' :
              '<button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false"></button>') +
          '</div>' +
        '</div></div>' +

        '<header class="header">' +
          '<div class="wrap header-main">' +
            '<a class="brand" href="index.html">' +
              '<img src="' + esc(storeConfig.logo) + '" alt="' + esc(storeConfig.businessName) + ' logo" width="52" height="52">' +
              '<span class="brand-text">' +
                '<span class="brand-name">' + esc(storeConfig.businessName) + '</span>' +
                '<span class="brand-tag">' + esc(storeConfig.tagline) + '</span>' +
              '</span>' +
            '</a>' +

            '<div class="search">' + icons.search +
              '<label class="sr-only" for="site-search">Search products</label>' +
              '<input id="site-search" type="search" autocomplete="off" placeholder="Search by product, brand or SKU…" role="combobox" aria-expanded="false" aria-controls="search-suggest">' +
              '<div class="suggest" id="search-suggest" role="listbox"></div>' +
            '</div>' +

            '<div class="header-actions">' +
              '<a class="iconbtn" href="shop.html?saved=1" aria-label="Saved items">' + icons.heart +
                '<span class="count" id="wish-count" hidden>0</span></a>' +
              '<button class="iconbtn" type="button" id="cart-open" aria-haspopup="dialog" aria-controls="cart-drawer">' +
                icons.cart + '<span class="label">Cart</span>' +
                '<span class="count" id="cart-count" hidden>0</span></button>' +
              '<button class="iconbtn burger" type="button" id="burger" aria-label="Open menu" aria-expanded="false">' + icons.menu + '</button>' +
            '</div>' +
          '</div>' +

          '<nav class="navbar" aria-label="Main"><div class="wrap">' +
            '<div class="has-mega" id="mega-wrap">' +
              '<button class="nav-link" type="button" id="mega-btn" aria-expanded="false">Categories ' + icons.chevron + '</button>' +
              '<div class="mega" id="mega-panel">' + megaCols +
                '<div class="mega-promo">' +
                  '<h4>Need help choosing?</h4>' +
                  '<p>Send us your budget and use case. We will put a parts list together for you.</p>' +
                  '<a class="btn btn-gold btn-sm" href="' + WhatsApp.enquiry('a build recommendation') + '" target="_blank" rel="noopener">Ask on WhatsApp</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<a class="nav-link" href="shop.html"' + (active === 'shop' ? ' aria-current="page"' : '') + '>Shop all</a>' +
            '<a class="nav-link" href="shop.html?deals=1"' + (active === 'deals' ? ' aria-current="page"' : '') + '>Deals</a>' +
            '<a class="nav-link" href="shop.html?new=1">New arrivals</a>' +
            '<a class="nav-link" href="about.html"' + (active === 'about' ? ' aria-current="page"' : '') + '>About</a>' +
            '<a class="nav-link" href="contact.html"' + (active === 'contact' ? ' aria-current="page"' : '') + '>Contact</a>' +
            '<div class="nav-cta">' +
              '<a href="tel:' + esc(storeConfig.phoneDial) + '" class="phone">' + esc(storeConfig.phone) + '</a>' +
              '<a class="btn btn-whatsapp btn-sm" href="' + WhatsApp.enquiry('a product') + '" target="_blank" rel="noopener">' + icons.whatsapp + ' WhatsApp</a>' +
            '</div>' +
          '</div></nav>' +
        '</header>' +

        '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">' +
          '<div class="mobile-nav-head">' +
            '<span class="brand-name" style="font-size:17px">' + esc(storeConfig.businessName) + '</span>' +
            '<button class="icon-x" type="button" id="mobile-close" aria-label="Close menu">' + icons.close + '</button>' +
          '</div>' +
          '<div class="mobile-nav-body">' +
            '<a href="index.html">Home</a>' +
            '<a href="shop.html">Shop all</a>' +
            '<a href="shop.html?deals=1">Deals</a>' +
            '<a href="shop.html?new=1">New arrivals</a>' +
            '<a href="shop.html?saved=1">Saved items</a>' +
            '<div class="mn-group">CATEGORIES</div>' + mobileCats +
            '<div class="mn-group">COMPANY</div>' +
            '<a href="about.html">About us</a>' +
            '<a href="contact.html">Contact &amp; store</a>' +
            '<a href="tel:' + esc(storeConfig.phoneDial) + '">' + esc(storeConfig.phone) + '</a>' +
            (storeConfig.showThemeToggle === false ? '' :
              '<button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false"></button>') +
          '</div>' +
        '</nav>';

      UI.wireHeader();
    },

    renderFooter: function () {
      var host = document.getElementById('site-footer');
      if (!host) { return; }
      var a = storeConfig.address;

      var shopLinks = categories.filter(function (c) { return c.featured; }).map(function (c) {
        return '<li><a href="shop.html?category=' + encodeURIComponent(c.slug) + '">' + esc(c.name) + '</a></li>';
      }).join('');

      var socialLinks = Object.keys(storeConfig.social || {}).filter(function (k) {
        return storeConfig.social[k] && icons[k];
      }).map(function (k) {
        return '<a href="' + esc(storeConfig.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + icons[k] + '</a>';
      }).join('');

      var badges = (storeConfig.paymentBadges || []).map(function (b) {
        return '<span class="pay-badge">' + esc(b) + '</span>';
      }).join('');

      host.innerHTML = '' +
        '<footer class="footer"><div class="wrap">' +
          '<div class="footer-grid">' +
            '<div class="footer-about">' +
              '<img src="' + esc(storeConfig.logo) + '" alt="' + esc(storeConfig.businessName) + ' logo" width="64" height="64">' +
              '<p>' + esc(storeConfig.shortDescription) + '</p>' +
              '<div class="socials">' + socialLinks + '</div>' +
            '</div>' +
            '<div><h3>SHOP</h3><ul>' + shopLinks + '<li><a href="shop.html">All products</a></li></ul></div>' +
            '<div><h3>COMPANY</h3><ul>' +
              '<li><a href="about.html">About us</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
              '<li><a href="shop.html?deals=1">Deals</a></li>' +
              '<li><a href="contact.html#form">Business enquiries</a></li>' +
              '<li><a href="contact.html#hours">Opening hours</a></li>' +
            '</ul></div>' +
            '<div><h3>GET IN TOUCH</h3><ul class="footer-contact">' +
              '<li>' + icons.pin + '<span>' + esc(a.line1) + '<br>' + esc(a.line2) + '<br>' + esc(a.city) + ', ' + esc(a.country) + '</span></li>' +
              '<li>' + icons.phone + '<a href="tel:' + esc(storeConfig.phoneDial) + '">' + esc(storeConfig.phone) + '</a></li>' +
              '<li>' + icons.mail + '<a href="mailto:' + esc(storeConfig.email) + '">' + esc(storeConfig.email) + '</a></li>' +
              '<li>' + icons.clock + '<span>' + esc(storeConfig.hours[0].day) + '<br>' + esc(storeConfig.hours[0].time) + '</span></li>' +
            '</ul></div>' +
          '</div>' +
          '<div class="payments">' +
            '<div class="pay-list">' + badges + '</div>' +
            '<p class="copyright">© ' + new Date().getFullYear() + ' ' + esc(storeConfig.legalName) + '. All rights reserved.</p>' +
          '</div>' +
        '</div></footer>' +

        '<a class="whatsapp-fab" href="' + WhatsApp.enquiry('a product') + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + icons.whatsapp + '</a>';
    },

    renderDrawer: function () {
      if (document.getElementById('cart-drawer')) { return; }
      var node = document.createElement('div');
      node.innerHTML = '' +
        '<div class="scrim" id="scrim" hidden></div>' +
        '<aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">' +
          '<div class="drawer-head">' +
            '<h2 id="cart-title">Your cart</h2>' +
            '<button class="icon-x" type="button" id="cart-close" aria-label="Close cart">' + icons.close + '</button>' +
          '</div>' +
          '<div class="drawer-body" id="cart-body"></div>' +
          '<div class="drawer-foot">' +
            '<div class="totals" id="cart-totals"></div>' +
            '<a class="btn btn-primary btn-block" id="cart-checkout" href="checkout.html">Proceed to checkout</a>' +
            '<a class="btn btn-whatsapp btn-block" id="cart-whatsapp" style="margin-top:10px" href="#" target="_blank" rel="noopener">' + icons.whatsapp + ' Order on WhatsApp</a>' +
            '<button class="btn btn-ghost btn-block" style="margin-top:10px" type="button" id="cart-continue">Continue shopping</button>' +
          '</div>' +
        '</aside>' +
        '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
      document.body.appendChild(node);
      UI.wireDrawer();
    },

    /* ------------------------------------------------------------ wiring */

    wireHeader: function () {
      var mega = document.getElementById('mega-wrap');
      var megaBtn = document.getElementById('mega-btn');
      if (mega && megaBtn) {
        var closeMega = function () { mega.classList.remove('open'); megaBtn.setAttribute('aria-expanded', 'false'); };
        megaBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var open = mega.classList.toggle('open');
          megaBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        mega.addEventListener('mouseleave', closeMega);
        document.addEventListener('click', function (e) { if (!mega.contains(e.target)) { closeMega(); } });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMega(); } });
      }

      var burger = document.getElementById('burger');
      var mobile = document.getElementById('mobile-nav');
      var mobileClose = document.getElementById('mobile-close');
      if (burger && mobile) {
        burger.addEventListener('click', function () {
          mobile.classList.add('open');
          burger.setAttribute('aria-expanded', 'true');
          UI.showScrim(true);
          if (mobileClose) { mobileClose.focus(); }
        });
        var hide = function () {
          mobile.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          if (!document.getElementById('cart-drawer').classList.contains('open')) { UI.showScrim(false); }
        };
        if (mobileClose) { mobileClose.addEventListener('click', hide); }
        mobile.addEventListener('click', function (e) { if (e.target.tagName === 'A') { hide(); } });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { hide(); } });
        UI._closeMobile = hide;
      }

      var cartOpen = document.getElementById('cart-open');
      if (cartOpen) { cartOpen.addEventListener('click', UI.openCart); }

      Theme.syncButtons();
      Array.prototype.forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (btn) {
        btn.addEventListener('click', function (e) { e.stopPropagation(); Theme.toggle(); });
      });

      UI.wireSearch();
      UI.syncCounts();
    },

    wireSearch: function () {
      var input = document.getElementById('site-search');
      var panel = document.getElementById('search-suggest');
      if (!input || !panel) { return; }

      var timer = null;

      function close() { panel.classList.remove('open'); input.setAttribute('aria-expanded', 'false'); }

      function render() {
        var q = input.value.trim();
        if (q.length < 2) { close(); return; }
        var results = Catalog.search(q).slice(0, 6);
        if (!results.length) {
          panel.innerHTML = '<div class="s-empty">No products match “' + esc(q) + '”. Try a brand, category or SKU — or ' +
            '<a href="' + WhatsApp.enquiry(q) + '" target="_blank" rel="noopener" style="color:var(--gold-deep);font-weight:600">ask us on WhatsApp</a>.</div>';
        } else {
          panel.innerHTML = results.map(function (p) {
            return '<a href="product.html?p=' + encodeURIComponent(p.slug) + '" role="option">' +
              imgTag(p.images && p.images[0], p.name) +
              '<span><span class="s-name">' + esc(p.name) + '</span><br>' +
              '<span class="s-meta">' + esc(p.brand) + ' · ' + esc(p.sku) + '</span></span>' +
              '<span class="s-price">' + money(Catalog.price(p)) + '</span></a>';
          }).join('') +
          '<a href="shop.html?q=' + encodeURIComponent(q) + '" style="justify-content:center;font-weight:600;color:var(--gold-deep)">' +
            'See all results for “' + esc(q) + '”</a>';
        }
        panel.classList.add('open');
        input.setAttribute('aria-expanded', 'true');
      }

      input.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(render, 130);
      });
      input.addEventListener('focus', function () { if (input.value.trim().length >= 2) { render(); } });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var q = input.value.trim();
          if (q) { window.location.href = 'shop.html?q=' + encodeURIComponent(q); }
        }
        if (e.key === 'Escape') { close(); }
      });
      document.addEventListener('click', function (e) {
        if (!panel.contains(e.target) && e.target !== input) { close(); }
      });
    },

    wireDrawer: function () {
      var drawer = document.getElementById('cart-drawer');
      var scrim = document.getElementById('scrim');
      document.getElementById('cart-close').addEventListener('click', UI.closeCart);
      document.getElementById('cart-continue').addEventListener('click', UI.closeCart);

      scrim.addEventListener('click', function () {
        UI.closeCart();
        if (UI._closeMobile) { UI._closeMobile(); }
        var filters = document.getElementById('filters');
        if (filters) { filters.classList.remove('open'); }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) { UI.closeCart(); }
      });

      document.getElementById('cart-body').addEventListener('click', function (e) {
        var inc = e.target.closest('[data-inc]');
        var dec = e.target.closest('[data-dec]');
        var rem = e.target.closest('[data-remove]');
        if (inc) { var l1 = Cart.find(inc.getAttribute('data-inc')); Cart.setQty(inc.getAttribute('data-inc'), (l1 ? l1.qty : 0) + 1); }
        else if (dec) { var l2 = Cart.find(dec.getAttribute('data-dec')); Cart.setQty(dec.getAttribute('data-dec'), (l2 ? l2.qty : 0) - 1); }
        else if (rem) { Cart.remove(rem.getAttribute('data-remove')); }
      });
    },

    showScrim: function (on) {
      var scrim = document.getElementById('scrim');
      if (!scrim) { return; }
      if (on) {
        scrim.hidden = false;
        window.requestAnimationFrame(function () { scrim.classList.add('open'); });
        document.body.style.overflow = 'hidden';
      } else {
        scrim.classList.remove('open');
        document.body.style.overflow = '';
        window.setTimeout(function () { if (!scrim.classList.contains('open')) { scrim.hidden = true; } }, 300);
      }
    },

    openCart: function () {
      var drawer = document.getElementById('cart-drawer');
      UI._lastFocus = document.activeElement;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      UI.showScrim(true);
      document.getElementById('cart-close').focus();
    },

    closeCart: function () {
      var drawer = document.getElementById('cart-drawer');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      UI.showScrim(false);
      if (UI._lastFocus && UI._lastFocus.focus) { UI._lastFocus.focus(); }
    },

    renderCart: function () {
      var body = document.getElementById('cart-body');
      var totals = document.getElementById('cart-totals');
      if (!body || !totals) { return; }

      var items = Cart.detailed();

      if (!items.length) {
        body.innerHTML = '<div class="cart-empty"><strong>Your cart is empty</strong>' +
          '<span>Browse the catalogue and add what you need — we will confirm stock before dispatch.</span>' +
          '<p style="margin-top:18px"><a class="btn btn-outline btn-sm" href="shop.html">Start shopping</a></p></div>';
      } else {
        body.innerHTML = items.map(function (it) {
          var p = it.product;
          return '<div class="cline">' +
            '<div class="cline-media">' + imgTag(p.images && p.images[0], p.name) + '</div>' +
            '<div>' +
              '<div class="cline-top">' +
                '<h3><a href="product.html?p=' + encodeURIComponent(p.slug) + '">' + esc(p.name) + '</a></h3>' +
                '<button class="cline-remove" type="button" data-remove="' + esc(p.id) + '" aria-label="Remove ' + esc(p.name) + '">' + icons.close + '</button>' +
              '</div>' +
              '<span class="sku">' + esc(p.sku) + ' · ' + money(Catalog.price(p)) + ' each</span>' +
              '<div class="cline-foot">' +
                '<div class="qty-sm">' +
                  '<button type="button" data-dec="' + esc(p.id) + '" aria-label="Decrease quantity">−</button>' +
                  '<span>' + it.qty + '</span>' +
                  '<button type="button" data-inc="' + esc(p.id) + '" aria-label="Increase quantity">+</button>' +
                '</div>' +
                '<span class="cline-price">' + money(it.lineTotal) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      }

      var savings = Cart.savings();
      totals.innerHTML =
        '<div class="trow"><span>Subtotal</span><span>' + money(Cart.subtotal()) + '</span></div>' +
        (savings > 0 ? '<div class="trow" style="color:var(--success)"><span>Discount saved</span><span>−' + money(savings) + '</span></div>' : '') +
        '<div class="trow"><span>Delivery</span><span>' + (Cart.delivery() === 0 ? (Cart.subtotal() > 0 ? 'Free' : money(0)) : money(Cart.delivery())) + '</span></div>' +
        '<div class="trow grand"><span>Total</span><span>' + money(Cart.total()) + '</span></div>' +
        '<div class="trow" style="font-size:12px"><span>Includes VAT</span><span>' + money(Cart.vatPortion()) + '</span></div>';

      var checkout = document.getElementById('cart-checkout');
      var wa = document.getElementById('cart-whatsapp');
      var empty = items.length === 0;
      if (checkout) {
        checkout.classList.toggle('hide', empty);
      }
      if (wa) {
        wa.classList.toggle('hide', empty);
        if (!empty) { wa.setAttribute('href', WhatsApp.order(null).url); }
      }

      UI.syncCounts();
      if (typeof Pages !== 'undefined' && Pages.onCartChange) { Pages.onCartChange(); }
    },

    syncCounts: function () {
      var c = document.getElementById('cart-count');
      if (c) {
        var n = Cart.count();
        c.textContent = n;
        c.hidden = n === 0;
      }
      var w = document.getElementById('wish-count');
      if (w) {
        var m = Wishlist.ids().length;
        w.textContent = m;
        w.hidden = m === 0;
      }
    },

    bump: function () {
      var c = document.getElementById('cart-count');
      if (!c) { return; }
      c.classList.remove('bump');
      void c.offsetWidth;
      c.classList.add('bump');
    },

    toast: function (msg) {
      var t = document.getElementById('toast');
      if (!t) { return; }
      t.textContent = msg;
      t.classList.add('show');
      window.clearTimeout(UI._toastTimer);
      UI._toastTimer = window.setTimeout(function () { t.classList.remove('show'); }, 2400);
    },

    /* global delegated clicks: add-to-cart and wishlist buttons anywhere */
    wireGlobalActions: function () {
      document.addEventListener('click', function (e) {
        var add = e.target.closest('[data-add]');
        if (add && !add.disabled) {
          var id = add.getAttribute('data-add');
          var qtyInput = add.getAttribute('data-qty-source');
          var qty = 1;
          if (qtyInput) {
            var node = document.getElementById(qtyInput);
            qty = node ? (parseInt(node.textContent, 10) || 1) : 1;
          }
          if (Cart.add(id, qty)) {
            var original = add.innerHTML;
            add.innerHTML = icons.check + ' Added';
            window.setTimeout(function () { add.innerHTML = original; }, 1200);
          }
          return;
        }
        var wish = e.target.closest('[data-wish]');
        if (wish) {
          var wid = wish.getAttribute('data-wish');
          var on = Wishlist.toggle(wid);
          wish.setAttribute('aria-pressed', on ? 'true' : 'false');
          wish.innerHTML = on ? icons.heartFill : icons.heart;
          UI.toast(on ? 'Saved to your list' : 'Removed from your list');
          if (typeof Pages !== 'undefined' && Pages.onWishChange) { Pages.onWishChange(); }
        }
      });
    }
  };

  /* --------------------------------------------------------------- boot */

  function init(opts) {
    opts = opts || {};
    UI.applyTheme();
    UI.applyMeta(opts.meta);
    Cart.load();
    UI.renderHeader(opts.active);
    UI.renderFooter();
    UI.renderDrawer();
    UI.renderCart();
    UI.wireGlobalActions();

    /* keep two open tabs in sync */
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE.cart) { Cart.load(); UI.renderCart(); }
      if (e.key === STORAGE.wishlist) { UI.syncCounts(); }
      if (e.key === Theme.KEY && (e.newValue === 'light' || e.newValue === 'dark')) { Theme.apply(e.newValue, false); }
    });

    /* organisation schema on every page */
    UI.jsonLd({
      '@context': 'https://schema.org',
      '@type': 'ElectronicsStore',
      name: storeConfig.businessName,
      legalName: storeConfig.legalName,
      description: storeConfig.shortDescription,
      telephone: storeConfig.phoneDial,
      email: storeConfig.email,
      url: storeConfig.siteUrl,
      image: storeConfig.siteUrl + '/' + storeConfig.logo,
      address: {
        '@type': 'PostalAddress',
        streetAddress: storeConfig.address.line1 + ', ' + storeConfig.address.line2,
        addressLocality: storeConfig.address.city,
        addressCountry: 'AE'
      },
      priceRange: 'AED',
      paymentAccepted: (storeConfig.paymentBadges || []).join(', ')
    });
  }

  return {
    init: init,
    esc: esc,
    param: param,
    money: money,
    imgTag: imgTag,
    icons: icons,
    Catalog: Catalog,
    Cart: Cart,
    Wishlist: Wishlist,
    Recent: Recent,
    WhatsApp: WhatsApp,
    UI: UI,
    Theme: Theme,
    productCard: productCard,
    FALLBACK_IMG: FALLBACK_IMG
  };
})();
