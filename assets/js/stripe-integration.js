/* ==========================================================================
   AZIZ COMPUTERS — CARD PAYMENT ON THE CHECKOUT PAGE (Stripe Elements)
   --------------------------------------------------------------------------
   Load this on checkout.html AFTER Stripe.js and AFTER the other site scripts:

     <script src="https://js.stripe.com/v3/"></script>
     <script src="assets/js/config.js"></script>
     <script src="assets/js/products.js"></script>
     <script src="assets/js/app.js"></script>
     <script src="assets/js/pages.js"></script>
     <script>Pages.checkout();</script>
     <script src="assets/js/stripe-integration.js"></script>

   HOW IT WORKS
   1. Customer picks "Card Online" -> the card form appears.
   2. They press the pay button -> the delivery form is checked, then the
      server is sent ONLY product ids, quantities and delivery details. The
      server works out the price (goods + delivery + 5% VAT) from products.js.
   3. Stripe confirms the card. If the bank asks for 3-D Secure the customer
      is sent there and returned to this page, which confirms the payment with
      the server and shows the receipt screen.
   ========================================================================== */

(function () {
  'use strict';

  /* Publishable keys are meant to be public. Keep it the same mode (live/test)
     as STRIPE_SECRET_KEY on Render — a live pk with a test sk fails. */
  var STRIPE_PUBLISHABLE_KEY = 'pk_test_51Tx5E8GwHv0iFMmrXCTH11X2eoI7tsPneqOeSRKL4OA4J1FQkRdp3g1m2eA1zDTQ8S3kvx6BC0DGbTELNioRmSdh00sMkcma3T';

  /* Where server.js is running. Use '' if the website itself is served by that
     same server. */
  var API_BASE = 'https://azizcomputers.onrender.com';

  var stripe = null;
  var elements = null;
  var mounted = false;
  var cardSelected = false;

  function $(id) { return document.getElementById(id); }
  function api(p) { return String(API_BASE).replace(/\/+$/, '') + p; }
  function fils(amount) { return Math.max(200, Math.round(Number(amount) * 100)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function message(text, isError) {
    var el = $('payment-message');
    if (!el) { return; }
    el.textContent = text || '';
    el.style.color = isError === false ? '' : '#b4231f';
    el.style.margin = text ? '10px 0 0' : '0';
    el.style.fontSize = '13.5px';
  }

  function toast(text) {
    if (window.App && App.UI && App.UI.toast) { App.UI.toast(text); } else { message(text, true); }
  }

  /* make sure the places the card form needs exist, in case checkout.html
     does not have them */
  function ensureContainers() {
    var btn = $('place-order');
    if (!btn) { return; }
    if (!$('stripe-payment-container')) {
      var box = document.createElement('div');
      box.id = 'stripe-payment-container';
      box.style.cssText = 'display:none;margin-top:16px';
      box.innerHTML = '<div id="payment-element"></div><div id="payment-message" role="alert"></div>';
      btn.parentNode.insertBefore(box, btn);
    } else {
      if (!$('payment-element')) {
        var pe = document.createElement('div'); pe.id = 'payment-element';
        $('stripe-payment-container').appendChild(pe);
      }
      if (!$('payment-message')) {
        var pm = document.createElement('div'); pm.id = 'payment-message'; pm.setAttribute('role', 'alert');
        $('stripe-payment-container').appendChild(pm);
      }
    }
  }

  function totalNow() {
    return (window.App && App.Cart) ? App.Cart.total() : 0;
  }

  /* the card form. Built in "deferred" mode: no payment exists on Stripe until
     the customer actually presses Pay, so nothing is created for browsers or
     carts that never complete. */
  function ensureElements() {
    if (elements) {
      elements.update({ amount: fils(totalNow()) });
      return true;
    }
    if (typeof Stripe === 'undefined') {
      message('The card form could not load. Check your connection and refresh the page.', true);
      return false;
    }
    stripe = stripe || Stripe(STRIPE_PUBLISHABLE_KEY);
    elements = stripe.elements({
      mode: 'payment',
      amount: fils(totalNow()),
      currency: 'aed',
      appearance: { theme: 'stripe' }
    });
    var paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
    mounted = true;
    return true;
  }

  function isCardOption(input) {
    if (!input) { return false; }
    var opt = input.closest ? input.closest('.pay-option') : null;
    if (opt && opt.getAttribute('data-pay')) { return opt.getAttribute('data-pay') === 'card'; }
    var text = ((input.value || '') + ' ' + (input.parentElement ? input.parentElement.textContent : '')).toLowerCase();
    return text.indexOf('card online') !== -1;
  }

  function styleButton(card) {
    var btn = $('place-order');
    if (!btn) { return; }
    btn.style.display = 'block';
    btn.disabled = false;
    if (card) {
      btn.textContent = 'Pay Securely Now';
      btn.style.backgroundColor = '#d4af37';
      btn.style.color = '#000000';
      btn.style.border = 'none';
    } else {
      btn.textContent = 'Place order on WhatsApp';
      btn.style.backgroundColor = '#25D366';
      btn.style.color = '#ffffff';
      btn.style.border = 'none';
    }
  }

  function onPaymentChoice(e) {
    var card = isCardOption(e.target);
    cardSelected = card;
    var box = $('stripe-payment-container');
    if (box) { box.style.display = card ? 'block' : 'none'; }
    styleButton(card);
    message('');
    if (card) { ensureElements(); }
  }

  /* ---- the same checks the checkout form always made ------------------- */
  function readAndCheckForm() {
    var ok = true;
    function check(fieldId, valid) {
      var f = $(fieldId);
      if (!f) { return; }
      if (valid) { f.classList.remove('invalid'); } else { f.classList.add('invalid'); ok = false; }
    }
    function val(id) { var el = $(id); return el ? el.value.trim() : ''; }

    var c = {
      name: val('i-name'), phone: val('i-phone'), email: val('i-email'),
      address: val('i-address').replace(/\s*\n\s*/g, ', '), city: val('i-city'), notes: val('i-notes')
    };
    check('f-name', c.name.length >= 2);
    check('f-phone', c.phone.replace(/\D/g, '').length >= 9);
    check('f-email', c.email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email));
    check('f-address', c.address.length >= 8);
    check('f-city', c.city.length >= 2);

    if (!ok) {
      toast('Please check the highlighted fields');
      var bad = document.querySelector('.field.invalid input, .field.invalid textarea, .field.invalid select');
      if (bad) { bad.focus(); }
      return null;
    }
    return c;
  }

  /* ---- pressing "Pay Securely Now" ------------------------------------- */
  async function pay() {
    var btn = $('place-order');
    if (!window.App || !App.Cart || !App.Cart.detailed().length) { toast('Your cart is empty'); return; }

    var customer = readAndCheckForm();
    if (!customer) { return; }
    if (!ensureElements()) { return; }

    btn.disabled = true;
    btn.textContent = 'Processing Payment...';
    message('');
    function reset(text) { btn.disabled = false; btn.textContent = 'Pay Securely Now'; if (text) { message(text, true); } }

    try {
      /* 1. let Stripe check the card details are complete */
      var sub = await elements.submit();
      if (sub && sub.error) { return reset(sub.error.message); }

      /* 2. ask the server to create the payment (it prices the cart itself) */
      var res = await fetch(api('/api/create-payment-intent'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: App.Cart.detailed().map(function (it) { return { id: it.product.id, qty: it.qty }; }),
          customer: customer
        })
      });
      var data = await res.json().catch(function () { return {}; });
      if (!res.ok || !data.clientSecret) { return reset(data.error || 'We could not start the card payment. Please try again.'); }

      /* 3. the server's total must match what the customer saw in the cart */
      if (Math.abs(Number(data.amount) - totalNow()) > 0.005) {
        return reset('Prices have just been updated. Please review your cart total and try again.');
      }

      /* 4. take the payment (3-D Secure sends the customer to their bank and back) */
      var returnUrl = window.location.origin + '/success.html?payment=success';
      var confirmParams = { return_url: returnUrl };
      if (customer.email) { confirmParams.receipt_email = customer.email; }
      var result = await stripe.confirmPayment({ elements: elements, clientSecret: data.clientSecret, confirmParams: confirmParams });
      if (result && result.error) { return reset(result.error.message); }
    } catch (err) {
      console.error('Card payment error:', err);
      reset('Could not reach the payment service. Please check your connection and try again.');
    }
  }

  /* ---- the customer comes back from Stripe / their bank ----------------- */
  function handleReturn() {
    var q = new URLSearchParams(window.location.search);
    var id = q.get('payment_intent');
    if (!id) { return false; }
    var status = q.get('redirect_status');

    var root = $('checkout-root');
    if (!root) { return true; }
    function panel(html) {
      root.innerHTML = '<div class="panel" style="text-align:center;max-width:620px;margin:40px auto">' + html + '</div>';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    var heading = 'font-family:var(--display);font-size:24px;font-weight:500';

    if (status === 'failed') {
      panel('<h2 style="' + heading + '">Your payment did not go through</h2>' +
        '<p class="panel-sub" style="margin-top:10px">Nothing was charged. You can try again or choose another payment method.</p>' +
        '<div style="margin-top:14px"><a class="btn btn-primary btn-sm" href="checkout.html">Back to checkout</a></div>');
      return true;
    }

    panel('<h2 style="' + heading + '">Confirming your payment…</h2><p class="panel-sub" style="margin-top:10px">One moment — please do not close this page.</p>');

    fetch(api('/api/verify-payment') + '?payment_intent=' + encodeURIComponent(id))
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (r) {
        if (r.ok && (r.d.paid || r.d.processing)) {
          var amount = Number(r.d.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          var done = r.d.paid;
          panel('<div style="color:var(--success);margin-bottom:12px">' + (window.App && App.icons ? App.icons.check : '') + '</div>' +
            '<h2 style="font-family:var(--display);font-size:26px;font-weight:500">' + (done ? 'Payment received — thank you' : 'Payment is being processed') + '</h2>' +
            '<p class="panel-sub" style="margin-top:10px">Order reference <strong>' + esc(r.d.ref) + '</strong> · ' + esc(r.d.currency) + ' ' + amount +
            (done ? ' paid by card.' : '.') + ' We will contact you shortly to confirm the delivery time.</p>' +
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">' +
              '<a class="btn btn-primary btn-sm" href="shop.html">Continue shopping</a>' +
              '<a class="btn btn-outline btn-sm" href="contact.html">Contact us</a></div>');
          if (window.App && App.Cart) { App.Cart.clear(); }
        } else {
          panel('<h2 style="' + heading + '">We could not confirm your payment</h2>' +
            '<p class="panel-sub" style="margin-top:10px">If money left your account, please contact us with this time and we will check it from our side.</p>' +
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px">' +
              '<a class="btn btn-primary btn-sm" href="contact.html">Contact us</a>' +
              '<a class="btn btn-outline btn-sm" href="checkout.html">Back to checkout</a></div>');
        }
      })
      .catch(function () {
        panel('<h2 style="' + heading + '">We could not confirm your payment</h2>' +
          '<p class="panel-sub" style="margin-top:10px">The payment service did not answer. If money left your account, please contact us.</p>' +
          '<div style="margin-top:14px"><a class="btn btn-primary btn-sm" href="contact.html">Contact us</a></div>');
      });
    return true;
  }

  /* ---- start ------------------------------------------------------------ */
  function init() {
    if (handleReturn()) { return; }

    ensureContainers();

    var options = $('payment-options');
    if (options) { options.addEventListener('change', onPaymentChoice); }

    /* catch the click BEFORE the site's own handler opens WhatsApp */
    var btn = $('place-order');
    if (btn) {
      btn.addEventListener('click', function (e) {
        if (!cardSelected) { return; }
        e.preventDefault();
        e.stopImmediatePropagation();
        pay();
      }, true);
    }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();