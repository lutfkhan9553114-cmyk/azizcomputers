/* ==========================================================================
   PAGE CONTROLLERS
   --------------------------------------------------------------------------
   One object per page. Each HTML file calls the matching init at the bottom
   of the document, e.g.  Pages.shop();
   ========================================================================== */

var Pages = (function () {
  'use strict';

  var A = App;
  var esc = A.esc, money = A.money, C = A.Catalog, Cart = A.Cart, UI = A.UI, icons = A.icons;

  function $(sel) { return document.querySelector(sel); }
  function set(sel, html) { var n = $(sel); if (n) { n.innerHTML = html; } }

  /* =======================================================================
     HOME
     ===================================================================== */
  function home() {
    A.init({
      active: 'home',
      meta: {
        title: 'Computer Hardware, Laptops & PC Components in Dubai',
        description: storeConfig.defaultMetaDescription
      }
    });

    /* hero featured product */
    var hero = C.all().filter(function (p) { return p.featured && C.discountPct(p) > 0; })[0] || C.all()[0];
    set('#hero-card',
      '<a class="hero-card-media" href="product.html?p=' + encodeURIComponent(hero.slug) + '">' +
        A.imgTag(hero.images[0], hero.name) + '</a>' +
      '<div class="hero-card-body">' +
        '<span class="k">FEATURED THIS WEEK</span>' +
        '<h2><a href="product.html?p=' + encodeURIComponent(hero.slug) + '">' + esc(hero.name) + '</a></h2>' +
        '<p>' + esc(hero.shortDescription || '') + '</p>' +
        '<div class="hero-card-price"><span class="now">' + money(C.price(hero)) + '</span>' +
          (C.discountPct(hero) ? '<span class="was">' + money(hero.price) + '</span>' : '') + '</div>' +
        '<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">' +
          '<button class="btn btn-gold btn-sm" type="button" data-add="' + esc(hero.id) + '">Add to cart</button>' +
          '<a class="btn btn-sm" style="border-color:#3A3F47;color:#EDEDE8" href="product.html?p=' + encodeURIComponent(hero.slug) + '">View details</a>' +
        '</div>' +
      '</div>');

    /* usp strip */
    set('#usp-strip', storeConfig.usps.map(function (u) {
      return '<div class="usp-item">' + (icons[u.icon] || icons.check) +
        '<div><h3>' + esc(u.title) + '</h3><p>' + esc(u.text) + '</p></div></div>';
    }).join(''));

     /* category tiles */
    set('#category-grid', categories.map(function (c) {
      return '<a class="cat-tile" href="shop.html?category=' + encodeURIComponent(c.slug) +
        '" aria-label="' + esc(c.name) + ', ' + C.countIn(c.slug) + ' items">' +
        A.imgTag(c.image, c.name) +
        '<span class="cat-tile-label"><h3>' + esc(c.name) + '</h3>' +
        '<span>' + C.countIn(c.slug) + ' items</span></span></a>';
    }).join(''));

    /* featured products */
    var featured = C.all().filter(function (p) { return p.featured; }).slice(0, 8);
    set('#featured-grid', featured.map(A.productCard).join(''));

    /* deals */
    var deals = C.all().filter(function (p) { return C.discountPct(p) > 0; })
      .sort(function (a, b) { return C.discountPct(b) - C.discountPct(a); }).slice(0, 4);
    set('#deals-grid', deals.map(A.productCard).join(''));

    /* new arrivals */
    var fresh = C.all().filter(function (p) { return p.newProduct; }).slice(0, 4);
    if (fresh.length < 4) { fresh = fresh.concat(C.all().slice(0, 4 - fresh.length)); }
    set('#new-grid', fresh.map(A.productCard).join(''));

    /* promo banners */
    set('#banner-grid', storeConfig.banners.map(function (b) {
      return '<div class="banner">' + A.imgTag(b.image, '') +
        '<div class="banner-body"><span class="k">' + esc(b.kicker) + '</span>' +
        '<h3>' + esc(b.title) + '</h3><p>' + esc(b.text) + '</p>' +
        '<a class="btn btn-gold btn-sm" href="' + esc(b.href) + '">' + esc(b.cta) + '</a></div></div>';
    }).join(''));

   /* brands */
set('#brand-strip', BRANDS.map(function (b) {
  var brandName = typeof b === 'object' ? b.name : b;
  var brandLogo = typeof b === 'object' ? b.logo : null;

  if (brandLogo) {
    return '<a class="brand-pill" href="shop.html?brand=' + encodeURIComponent(brandName) + '">' +
      '<img src="' + esc(brandLogo) + '" alt="' + esc(brandName) + '">' +
    '</a>';
  }

  return '<a class="brand-pill" href="shop.html?brand=' + encodeURIComponent(brandName) + '">' + esc(brandName) + '</a>';
}).join(''));

    /* store info block */
    var a = storeConfig.address;
    set('#store-info',
      '<div class="rule-gold"></div>' +
      '<h2 style="font-family:var(--display);font-size:30px;font-weight:500">Visit the shop in Bur Dubai</h2>' +
      '<p style="color:var(--ink-3);margin-top:10px;max-width:46ch">Come and see the stock before you buy, collect an online order, or bring a machine in for an upgrade.</p>' +
      '<ul class="store-list">' +
        '<li>' + icons.pin + '<span><b>ADDRESS</b>' + esc(a.line1) + ', ' + esc(a.line2) + '<br>' + esc(a.city) + ', ' + esc(a.country) + '</span></li>' +
        '<li>' + icons.clock + '<span><b>OPENING HOURS</b>' + storeConfig.hours.map(function (h) { return esc(h.day) + ' — ' + esc(h.time); }).join('<br>') + '</span></li>' +
        '<li>' + icons.phone + '<span><b>PHONE</b><a href="tel:' + esc(storeConfig.phoneDial) + '">' + esc(storeConfig.phone) + '</a></span></li>' +
        '<li>' + icons.mail + '<span><b>EMAIL</b><a href="mailto:' + esc(storeConfig.email) + '">' + esc(storeConfig.email) + '</a></span></li>' +
      '</ul>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:24px">' +
        '<a class="btn btn-whatsapp btn-sm" href="' + A.WhatsApp.enquiry('a product') + '" target="_blank" rel="noopener">' + icons.whatsapp + ' Message us</a>' +
        '<a class="btn btn-outline btn-sm" href="' + esc(storeConfig.googleMapsUrl) + '" target="_blank" rel="noopener">Open in Google Maps</a>' +
      '</div>');

    set('#store-map', '<iframe title="Store location map" src="' + esc(storeConfig.googleMapsEmbed) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>');
  }

  /* =======================================================================
     SHOP  (also powers category pages, deals, new arrivals, wishlist, search)
     ===================================================================== */
  var shopState = {
    categories: [], brands: [], inStockOnly: false,
    min: null, max: null, sort: 'featured', q: '', page: 1,
    perPage: 12, deals: false, newOnly: false, saved: false
  };

  function shop() {
    A.init({ active: 'shop', meta: { title: 'Shop' } });

    /* read the URL so links and refreshes keep their state */
    var cat = A.param('category');
    if (cat) { shopState.categories = [cat]; }
    var br = A.param('brand');
    if (br) { shopState.brands = [br]; }
    shopState.q = A.param('q') || '';
    shopState.deals = A.param('deals') === '1';
    shopState.newOnly = A.param('new') === '1';
    shopState.saved = A.param('saved') === '1';
    if (A.param('sort')) { shopState.sort = A.param('sort'); }

    var heading = 'All products';
    var sub = 'Every item we stock, ready to ship across the UAE.';
    if (shopState.saved) { heading = 'Saved items'; sub = 'Products you bookmarked on this device.'; }
    else if (shopState.deals) { heading = 'Deals'; sub = 'Everything currently discounted.'; }
    else if (shopState.newOnly) { heading = 'New arrivals'; sub = 'Latest stock on the shelves.'; }
    else if (cat) { heading = C.categoryName(cat); sub = 'Browse our ' + C.categoryName(cat).toLowerCase() + ' range.'; }
    else if (shopState.q) { heading = 'Results for “' + shopState.q + '”'; sub = ''; }

    set('#shop-title', esc(heading));
    set('#shop-sub', esc(sub));
    UI.applyMeta({ title: heading, description: sub || storeConfig.defaultMetaDescription });

    set('#shop-crumbs',
      '<a href="index.html">Home</a><span>/</span>' +
      '<a href="shop.html">Shop</a>' +
      (cat ? '<span>/</span><span aria-current="page">' + esc(C.categoryName(cat)) + '</span>' : ''));

    buildFilters();
    wireShop();
    renderShop();
  }

  function buildFilters() {
    var host = $('#filter-body');
    if (!host) { return; }

    var catList = categories.map(function (c) {
      var n = C.countIn(c.slug);
      return '<label class="filter-opt"><input type="checkbox" data-filter="category" value="' + esc(c.slug) + '"' +
        (shopState.categories.indexOf(c.slug) !== -1 ? ' checked' : '') + '>' +
        '<span>' + esc(c.name) + '</span><span class="n">' + n + '</span></label>';
    }).join('');

    var brandList = brands.map(function (b) {
      var n = C.all().filter(function (p) { return p.brand === b; }).length;
      return '<label class="filter-opt"><input type="checkbox" data-filter="brand" value="' + esc(b) + '"' +
        (shopState.brands.indexOf(b) !== -1 ? ' checked' : '') + '>' +
        '<span>' + esc(b) + '</span><span class="n">' + n + '</span></label>';
    }).join('');

    host.innerHTML =
      '<div class="filter-group"><h3>CATEGORY</h3><div class="filter-list">' + catList + '</div></div>' +
      '<div class="filter-group"><h3>BRAND</h3><div class="filter-list">' + brandList + '</div></div>' +
      '<div class="filter-group"><h3>PRICE (' + esc(storeConfig.currency) + ')</h3>' +
        '<div class="price-inputs">' +
          '<input type="number" id="price-min" placeholder="Min" min="0" inputmode="numeric" value="' +
            (shopState.min != null ? shopState.min : '') + '">' +
          '<span>–</span>' +
          '<input type="number" id="price-max" placeholder="Max" min="0" inputmode="numeric" value="' +
            (shopState.max != null ? shopState.max : '') + '">' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" type="button" id="price-apply" style="margin-top:10px;width:100%">Apply price</button>' +
      '</div>' +
      '<div class="filter-group"><h3>AVAILABILITY</h3>' +
        '<label class="filter-opt"><input type="checkbox" id="stock-only"' +
          (shopState.inStockOnly ? ' checked' : '') + '><span>In stock only</span></label>' +
        '<label class="filter-opt" style="margin-top:8px"><input type="checkbox" id="deals-only"' +
          (shopState.deals ? ' checked' : '') + '><span>On offer only</span></label>' +
      '</div>';
  }

  function wireShop() {
    var host = $('#filter-body');

    host.addEventListener('change', function (e) {
      var input = e.target;
      if (input.getAttribute('data-filter') === 'category') {
        toggleIn(shopState.categories, input.value, input.checked);
      } else if (input.getAttribute('data-filter') === 'brand') {
        toggleIn(shopState.brands, input.value, input.checked);
      } else if (input.id === 'stock-only') {
        shopState.inStockOnly = input.checked;
      } else if (input.id === 'deals-only') {
        shopState.deals = input.checked;
      }
      shopState.page = 1;
      renderShop();
    });

    host.addEventListener('click', function (e) {
      if (!e.target.closest('#price-apply')) { return; }
      var min = parseInt($('#price-min').value, 10);
      var max = parseInt($('#price-max').value, 10);
      shopState.min = isNaN(min) ? null : min;
      shopState.max = isNaN(max) ? null : max;
      shopState.page = 1;
      renderShop();
      if (window.innerWidth <= 1024) { closeFilters(); }
    });

    $('#sort-select').value = shopState.sort;
    $('#sort-select').addEventListener('change', function (e) {
      shopState.sort = e.target.value;
      shopState.page = 1;
      renderShop();
    });

    $('#clear-filters').addEventListener('click', clearAll);

    var toggle = $('#filter-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        $('#filters').classList.add('open');
        UI.showScrim(true);
      });
    }
    var fclose = $('#filter-close');
    if (fclose) { fclose.addEventListener('click', closeFilters); }
  }

  function closeFilters() {
    $('#filters').classList.remove('open');
    UI.showScrim(false);
  }

  function toggleIn(arr, value, on) {
    var i = arr.indexOf(value);
    if (on && i === -1) { arr.push(value); }
    if (!on && i !== -1) { arr.splice(i, 1); }
  }

  function clearAll() {
    shopState.categories = [];
    shopState.brands = [];
    shopState.inStockOnly = false;
    shopState.deals = false;
    shopState.newOnly = false;
    shopState.saved = false;
    shopState.min = null;
    shopState.max = null;
    shopState.q = '';
    shopState.page = 1;
    buildFilters();
    renderShop();
  }

  function filtered() {
    var list = shopState.q ? C.search(shopState.q) : C.all();

    if (shopState.saved) {
      var saved = A.Wishlist.ids();
      list = list.filter(function (p) { return saved.indexOf(p.id) !== -1; });
    }
    if (shopState.newOnly) { list = list.filter(function (p) { return p.newProduct; }); }
    if (shopState.deals) { list = list.filter(function (p) { return C.discountPct(p) > 0; }); }
    if (shopState.categories.length) {
      list = list.filter(function (p) { return shopState.categories.indexOf(p.category) !== -1; });
    }
    if (shopState.brands.length) {
      list = list.filter(function (p) { return shopState.brands.indexOf(p.brand) !== -1; });
    }
    if (shopState.inStockOnly) { list = list.filter(C.inStock); }
    if (shopState.min != null) { list = list.filter(function (p) { return C.price(p) >= shopState.min; }); }
    if (shopState.max != null) { list = list.filter(function (p) { return C.price(p) <= shopState.max; }); }

    var s = shopState.sort;
    list.sort(function (a, b) {
      if (s === 'price-asc') { return C.price(a) - C.price(b); }
      if (s === 'price-desc') { return C.price(b) - C.price(a); }
      if (s === 'name') { return a.name.localeCompare(b.name); }
      if (s === 'newest') { return (b.newProduct ? 1 : 0) - (a.newProduct ? 1 : 0); }
      if (s === 'discount') { return C.discountPct(b) - C.discountPct(a); }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
    return list;
  }

  function renderShop() {
    var list = filtered();
    var pages = Math.max(1, Math.ceil(list.length / shopState.perPage));
    if (shopState.page > pages) { shopState.page = pages; }
    var start = (shopState.page - 1) * shopState.perPage;
    var pageItems = list.slice(start, start + shopState.perPage);

    set('#result-count', list.length === 1 ? '1 product' :
      list.length + ' products' + (list.length > shopState.perPage ?
        ' · showing ' + (start + 1) + '–' + Math.min(start + shopState.perPage, list.length) : ''));

    /* active filter chips */
    var chips = [];
    shopState.categories.forEach(function (c) { chips.push({ t: C.categoryName(c), k: 'category', v: c }); });
    shopState.brands.forEach(function (b) { chips.push({ t: b, k: 'brand', v: b }); });
    if (shopState.inStockOnly) { chips.push({ t: 'In stock', k: 'stock' }); }
    if (shopState.deals) { chips.push({ t: 'On offer', k: 'deals' }); }
    if (shopState.newOnly) { chips.push({ t: 'New arrivals', k: 'new' }); }
    if (shopState.saved) { chips.push({ t: 'Saved items', k: 'saved' }); }
    if (shopState.q) { chips.push({ t: 'Search: ' + shopState.q, k: 'q' }); }
    if (shopState.min != null || shopState.max != null) {
      chips.push({ t: (shopState.min != null ? money(shopState.min) : 'Any') + ' – ' + (shopState.max != null ? money(shopState.max) : 'Any'), k: 'price' });
    }
    set('#active-filters', chips.length
      ? chips.map(function (c) {
        return '<button class="chip" type="button" data-clear="' + esc(c.k) + '" data-val="' + esc(c.v || '') + '">' +
          esc(c.t) + ' ' + icons.close + '</button>';
      }).join('') + '<button class="chip" type="button" data-clear="all">Clear all</button>'
      : '');

    var af = $('#active-filters');
    if (af && !af._wired) {
      af._wired = true;
      af.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-clear]');
        if (!btn) { return; }
        var k = btn.getAttribute('data-clear');
        var v = btn.getAttribute('data-val');
        if (k === 'all') { clearAll(); return; }
        if (k === 'category') { toggleIn(shopState.categories, v, false); }
        if (k === 'brand') { toggleIn(shopState.brands, v, false); }
        if (k === 'stock') { shopState.inStockOnly = false; }
        if (k === 'deals') { shopState.deals = false; }
        if (k === 'new') { shopState.newOnly = false; }
        if (k === 'saved') { shopState.saved = false; }
        if (k === 'q') { shopState.q = ''; }
        if (k === 'price') { shopState.min = null; shopState.max = null; }
        shopState.page = 1;
        buildFilters();
        renderShop();
      });
    }

    /* grid */
    if (!pageItems.length) {
      var emptyMsg = shopState.saved
        ? '<h3>No saved items yet</h3><p>Tap the heart on any product to keep it here for later.</p>'
        : '<h3>No products match these filters</h3><p>Try removing a filter, or ask us — we can often order items that are not listed.</p>';
      set('#shop-grid', '<div class="empty">' + emptyMsg +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-outline btn-sm" type="button" id="empty-clear">Clear filters</button>' +
        '<a class="btn btn-whatsapp btn-sm" href="' + A.WhatsApp.enquiry(shopState.q || 'a product') + '" target="_blank" rel="noopener">' + icons.whatsapp + ' Ask on WhatsApp</a>' +
        '</div></div>');
      var ec = $('#empty-clear');
      if (ec) { ec.addEventListener('click', clearAll); }
    } else {
      set('#shop-grid', pageItems.map(A.productCard).join(''));
    }

    /* pagination */
    if (pages <= 1) {
      set('#pagination', '');
    } else {
      var html = '<button type="button" data-page="' + (shopState.page - 1) + '"' +
        (shopState.page === 1 ? ' disabled' : '') + ' aria-label="Previous page">‹</button>';
      for (var i = 1; i <= pages; i++) {
        html += '<button type="button" data-page="' + i + '"' +
          (i === shopState.page ? ' aria-current="true"' : '') + '>' + i + '</button>';
      }
      html += '<button type="button" data-page="' + (shopState.page + 1) + '"' +
        (shopState.page === pages ? ' disabled' : '') + ' aria-label="Next page">›</button>';
      set('#pagination', html);

      var pg = $('#pagination');
      if (!pg._wired) {
        pg._wired = true;
        pg.addEventListener('click', function (e) {
          var b = e.target.closest('[data-page]');
          if (!b || b.disabled) { return; }
          shopState.page = parseInt(b.getAttribute('data-page'), 10);
          renderShop();
          window.scrollTo({ top: $('#shop-grid').offsetTop - 120, behavior: 'smooth' });
        });
      }
    }
  }

  /* =======================================================================
     PRODUCT DETAIL
     ===================================================================== */
  var pdpState = { product: null, qty: 1, image: 0 };

  function product() {
    A.init({ active: 'shop' });

    var slug = A.param('p');
    var p = slug ? C.bySlug(slug) : null;

    if (!p) {
      set('#pdp-root',
        '<div class="empty" style="margin:60px 0"><h3>Product not found</h3>' +
        '<p>That link may be out of date, or the item has been discontinued.</p>' +
        '<a class="btn btn-outline btn-sm" href="shop.html">Browse all products</a></div>');
      set('#pdp-crumbs', '<a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a>');
      UI.applyMeta({ title: 'Product not found' });
      return;
    }

    pdpState.product = p;
    pdpState.qty = 1;
    pdpState.image = 0;
    A.Recent.push(p.id);

    UI.applyMeta({
      title: p.name,
      description: p.shortDescription || p.description,
      image: p.images[0],
      type: 'product',
      canonicalQuery: '?p=' + encodeURIComponent(p.slug)
    });

    UI.jsonLd({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: p.name,
      image: p.images,
      description: p.shortDescription || p.description,
      sku: p.sku,
      brand: { '@type': 'Brand', name: p.brand },
      offers: {
        '@type': 'Offer',
        url: storeConfig.siteUrl + '/product.html?p=' + p.slug,
        priceCurrency: storeConfig.currency,
        price: C.price(p),
        availability: C.inStock(p) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: storeConfig.businessName }
      }
    });

    set('#pdp-crumbs',
      '<a href="index.html">Home</a><span>/</span>' +
      '<a href="shop.html">Shop</a><span>/</span>' +
      '<a href="shop.html?category=' + encodeURIComponent(p.category) + '">' + esc(C.categoryName(p.category)) + '</a>' +
      '<span>/</span><span aria-current="page">' + esc(p.name) + '</span>');

    renderPdp();
  }

  function renderPdp() {
    var p = pdpState.product;
    var onSale = C.discountPct(p) > 0;
    var out = !C.inStock(p);
    var saved = A.Wishlist.has(p.id);

    var stockChip = out
      ? '<span class="chip chip-out">Out of stock</span>'
      : (p.stock <= 5 ? '<span class="chip chip-low">Only ' + p.stock + ' left in stock</span>'
        : '<span class="chip chip-stock">In stock — ready to ship</span>');

    var specRows = Object.keys(p.specifications || {}).map(function (k) {
      return '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(p.specifications[k]) + '</td></tr>';
    }).join('');

    set('#pdp-root',
      '<div class="pdp">' +
        '<div>' +
          '<div class="gallery-main" id="gallery-main">' + A.imgTag(p.images[pdpState.image], p.name) + '</div>' +
          '<div class="gallery-thumbs" id="gallery-thumbs">' +
            p.images.map(function (src, i) {
              return '<button type="button" data-img="' + i + '" aria-current="' + (i === pdpState.image ? 'true' : 'false') +
                '" aria-label="View image ' + (i + 1) + '">' + A.imgTag(src, '') + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div>' +
          '<p class="pdp-brand">' + esc(p.brand) + '</p>' +
          '<h1>' + esc(p.name) + '</h1>' +
          '<div class="pdp-meta">' + stockChip +
            '<span class="sku">SKU: ' + esc(p.sku) + '</span>' +
            '<span class="chip">' + esc(C.categoryName(p.category)) + '</span>' +
            (p.newProduct ? '<span class="chip chip-new">New</span>' : '') +
          '</div>' +
          '<div class="pdp-price"><span class="now">' + money(C.price(p)) + '</span>' +
            (onSale ? '<span class="was">' + money(p.price) + '</span><span class="off">Save ' + C.discountPct(p) + '%</span>' : '') +
          '</div>' +
          '<p class="pdp-vat">Price includes 5% VAT · ' + esc(storeConfig.deliveryTime) + '</p>' +
          '<p class="pdp-short">' + esc(p.shortDescription || '') + '</p>' +

          '<div class="buybox">' +
            '<div class="buy-row">' +
              '<div class="qty">' +
                '<button type="button" id="qty-dec" aria-label="Decrease quantity">−</button>' +
                '<span id="qty-value">' + pdpState.qty + '</span>' +
                '<button type="button" id="qty-inc" aria-label="Increase quantity">+</button>' +
              '</div>' +
              '<button class="btn btn-primary" type="button" data-add="' + esc(p.id) + '" data-qty-source="qty-value"' +
                (out ? ' disabled' : '') + '>' + (out ? 'Out of stock' : 'Add to cart') + '</button>' +
            '</div>' +
            '<div class="buy-actions">' +
              '<button class="btn btn-gold" type="button" id="buy-now"' + (out ? ' disabled' : '') + '>Buy now</button>' +
              '<a class="btn btn-whatsapp" id="pdp-whatsapp" href="' + A.WhatsApp.product(p, pdpState.qty) + '" target="_blank" rel="noopener">' +
                icons.whatsapp + ' Order on WhatsApp</a>' +
            '</div>' +
            '<button class="btn btn-ghost btn-block" type="button" data-wish="' + esc(p.id) + '" aria-pressed="' + (saved ? 'true' : 'false') + '">' +
              (saved ? icons.heartFill : icons.heart) + ' ' + (saved ? 'Saved' : 'Save for later') + '</button>' +
            '<ul class="assurance">' +
              '<li>' + icons.check + '<span>Genuine product with manufacturer warranty</span></li>' +
              '<li>' + icons.check + '<span>Cash on delivery available across the UAE</span></li>' +
              '<li>' + icons.check + '<span>' + esc(storeConfig.returnWindowDays) + '-day replacement on dead-on-arrival items</span></li>' +
              '<li>' + icons.check + '<span>Free delivery on orders over ' + money(storeConfig.freeDeliveryOver) + '</span></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="tabs" role="tablist">' +
        '<button role="tab" type="button" data-tab="desc" aria-selected="true">Description</button>' +
        '<button role="tab" type="button" data-tab="specs" aria-selected="false">Specifications</button>' +
        '<button role="tab" type="button" data-tab="delivery" aria-selected="false">Delivery &amp; warranty</button>' +
      '</div>' +
      '<div class="tabpanel" id="tab-desc"><p>' + esc(p.description || p.shortDescription || '') + '</p>' +
        ((p.tags || []).length ? '<div class="pcard-meta">' + p.tags.map(function (t) {
          return '<a class="chip" href="shop.html?q=' + encodeURIComponent(t) + '">' + esc(t) + '</a>';
        }).join('') + '</div>' : '') + '</div>' +
      '<div class="tabpanel" id="tab-specs" hidden><table class="spec-table"><tbody>' + specRows + '</tbody></table></div>' +
      '<div class="tabpanel" id="tab-delivery" hidden>' +
        '<p>' + esc(storeConfig.deliveryTime) + '. Delivery is ' + money(storeConfig.deliveryFee) +
        ' and free on orders over ' + money(storeConfig.freeDeliveryOver) + '. ' +
        'You can also collect from our shop in ' + esc(storeConfig.address.city) + ' during opening hours.</p>' +
        '<p>Every item carries the manufacturer warranty stated in the specifications. Faulty-on-arrival items are replaced within ' +
        esc(storeConfig.returnWindowDays) + ' days. Keep the box and accessories for any warranty claim.</p>' +
        '<p>For warranty help, message us on WhatsApp at ' + esc(storeConfig.phone) + ' with your order reference.</p>' +
      '</div>' +

      '<section class="section section--tight" style="padding-bottom:0">' +
        '<div class="section-head"><div><div class="rule-gold"></div><h2>Related products</h2></div>' +
        '<a class="link-more" href="shop.html?category=' + encodeURIComponent(p.category) + '">All ' + esc(C.categoryName(p.category)) + '</a></div>' +
        '<div class="grid-products cols-4" id="related-grid">' + C.related(p, 4).map(A.productCard).join('') + '</div>' +
      '</section>' +

      recentlyViewedBlock(p.id));

    wirePdp();
  }

  function recentlyViewedBlock(excludeId) {
    var ids = A.Recent.list().filter(function (id) { return id !== excludeId; }).slice(0, 4);
    if (!ids.length) { return ''; }
    return '<section class="section section--tight">' +
      '<div class="section-head"><div><div class="rule-gold"></div><h2>Recently viewed</h2></div></div>' +
      '<div class="grid-products cols-4">' + ids.map(function (id) { return A.productCard(C.byId(id)); }).join('') + '</div>' +
      '</section>';
  }

  function wirePdp() {
    var p = pdpState.product;

    $('#gallery-thumbs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-img]');
      if (!b) { return; }
      pdpState.image = parseInt(b.getAttribute('data-img'), 10);
      set('#gallery-main', A.imgTag(p.images[pdpState.image], p.name));
      Array.prototype.forEach.call($('#gallery-thumbs').children, function (node, i) {
        node.setAttribute('aria-current', i === pdpState.image ? 'true' : 'false');
      });
    });

    function setQty(n) {
      var max = Math.max(1, Math.min(Number(p.stock) || 1, 99));
      pdpState.qty = Math.min(Math.max(1, n), max);
      $('#qty-value').textContent = pdpState.qty;
      $('#pdp-whatsapp').setAttribute('href', A.WhatsApp.product(p, pdpState.qty));
      if (n > max) { UI.toast('Only ' + max + ' available — message us for more'); }
    }
    $('#qty-inc').addEventListener('click', function () { setQty(pdpState.qty + 1); });
    $('#qty-dec').addEventListener('click', function () { setQty(pdpState.qty - 1); });

    var buyNow = $('#buy-now');
    if (buyNow) {
      buyNow.addEventListener('click', function () {
        if (Cart.add(p.id, pdpState.qty)) { window.location.href = 'checkout.html'; }
      });
    }

    var tabs = document.querySelectorAll('[data-tab]');
    Array.prototype.forEach.call(tabs, function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (b) {
          var on = b === btn;
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          document.getElementById('tab-' + b.getAttribute('data-tab')).hidden = !on;
        });
      });
    });
  }

  /* =======================================================================
     CHECKOUT
     ===================================================================== */
  function checkout() {
    A.init({ active: 'checkout', meta: { title: 'Checkout', description: 'Complete your order — cash on delivery or WhatsApp confirmation.' } });
    renderCheckoutSummary();
    renderPaymentOptions();
    wireCheckout();
  }

  function renderCheckoutSummary() {
    var items = Cart.detailed();
    var host = $('#order-summary');
    if (!host) { return; }

    if (!items.length) {
      host.innerHTML = '<h2>Order summary</h2><p class="panel-sub">Your cart is empty.</p>' +
        '<a class="btn btn-outline btn-block" href="shop.html">Browse products</a>';
      var form = $('#checkout-form');
      if (form) { form.classList.add('hide'); }
      var notice = $('#empty-notice');
      if (notice) { notice.classList.remove('hide'); }
      return;
    }

    host.innerHTML = '<h2>Order summary</h2><p class="panel-sub">' + items.length + ' product' + (items.length > 1 ? 's' : '') + ' · prices include VAT</p>' +
      '<div class="summary-lines">' + items.map(function (it) {
        return '<div class="sline">' + A.imgTag(it.product.images[0], it.product.name) +
          '<span><span class="sn">' + esc(it.product.name) + '</span><br>' +
          '<span class="sq">' + it.qty + ' × ' + money(C.price(it.product)) + '</span></span>' +
          '<span style="font-weight:700">' + money(it.lineTotal) + '</span></div>';
      }).join('') + '</div>' +
      '<div class="totals">' +
        '<div class="trow"><span>Subtotal</span><span>' + money(Cart.subtotal()) + '</span></div>' +
        (Cart.savings() > 0 ? '<div class="trow" style="color:var(--success)"><span>Discount</span><span>−' + money(Cart.savings()) + '</span></div>' : '') +
        '<div class="trow"><span>Delivery</span><span>' + (Cart.delivery() === 0 ? 'Free' : money(Cart.delivery())) + '</span></div>' +
        '<div class="trow grand"><span>Total</span><span>' + money(Cart.total()) + '</span></div>' +
        '<div class="trow" style="font-size:12px"><span>Of which VAT (5%)</span><span>' + money(Cart.vatPortion()) + '</span></div>' +
      '</div>' +
      '<a class="btn btn-ghost btn-block btn-sm" href="shop.html">Continue shopping</a>';
  }

  function renderPaymentOptions() {
    var host = $('#payment-options');
    if (!host) { return; }
    host.innerHTML = storeConfig.paymentMethods.map(function (m, i) {
      var disabled = !m.enabled;
      return '<label class="pay-option' + (disabled ? ' is-disabled' : '') + '" data-pay="' + esc(m.id) + '">' +
        '<input type="radio" name="payment" value="' + esc(m.label) + '"' +
        (disabled ? ' disabled' : '') + (i === 0 ? ' checked' : '') + '>' +
        '<span><b>' + esc(m.label) + '</b><span>' + esc(m.note) + '</span></span></label>';
    }).join('');

    host.addEventListener('change', function () {
      Array.prototype.forEach.call(host.querySelectorAll('.pay-option'), function (opt) {
        var input = opt.querySelector('input');
        opt.classList.toggle('is-selected', input.checked);
      });
    });
    var first = host.querySelector('input:checked');
    if (first) { first.closest('.pay-option').classList.add('is-selected'); }
  }

  function wireCheckout() {
    var form = $('#checkout-form');
    if (!form) { return; }

    ['f-name', 'f-phone', 'f-email', 'f-address', 'f-city'].forEach(function (id) {
      var field = document.getElementById(id);
      if (field) { field.addEventListener('input', function () { field.classList.remove('invalid'); }); }
    });

    $('#place-order').addEventListener('click', function () {
      if (!Cart.detailed().length) { UI.toast('Your cart is empty'); return; }

      var ok = true;
      function check(fieldId, valid) {
        var f = document.getElementById(fieldId);
        if (valid) { f.classList.remove('invalid'); } else { f.classList.add('invalid'); ok = false; }
      }
      var name = $('#i-name').value.trim();
      var phone = $('#i-phone').value.trim();
      var email = $('#i-email').value.trim();
      var address = $('#i-address').value.trim();
      var city = $('#i-city').value.trim();
      var notes = $('#i-notes').value.trim();

      check('f-name', name.length >= 2);
      check('f-phone', phone.replace(/\D/g, '').length >= 9);
      check('f-email', email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
      check('f-address', address.length >= 8);
      check('f-city', city.length >= 2);

      if (!ok) {
        UI.toast('Please check the highlighted fields');
        var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea, .field.invalid select');
        if (firstBad) { firstBad.focus(); }
        return;
      }

      var paymentInput = form.querySelector('input[name="payment"]:checked');
      var payment = paymentInput ? paymentInput.value : storeConfig.paymentMethods[0].label;

      var order = A.WhatsApp.order({
        name: name, phone: phone, email: email,
        address: address.replace(/\s*\n\s*/g, ', '),
        city: city, payment: payment, notes: notes
      });

      window.open(order.url, '_blank', 'noopener');

      /* show the confirmation state and clear the cart */
      set('#checkout-root',
        '<div class="panel" style="text-align:center;max-width:620px;margin:40px auto">' +
          '<div style="color:var(--success);margin-bottom:12px">' + icons.check + '</div>' +
          '<h2 style="font-family:var(--display);font-size:26px;font-weight:500">Order sent for confirmation</h2>' +
          '<p class="panel-sub" style="margin-top:10px">Reference <strong>' + esc(order.ref) + '</strong>. ' +
          'We have opened WhatsApp with your order details — press send there and we will confirm stock, ' +
          'final delivery time and payment.</p>' +
          '<div class="note" style="text-align:left;margin:18px 0">If WhatsApp did not open, your browser may have blocked the pop-up. ' +
          '<a href="' + order.url + '" target="_blank" rel="noopener" style="font-weight:700;color:var(--gold-deep)">Open the message manually</a>.</div>' +
          '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px">' +
            '<a class="btn btn-primary btn-sm" href="shop.html">Continue shopping</a>' +
            '<a class="btn btn-outline btn-sm" href="tel:' + esc(storeConfig.phoneDial) + '">Call the shop</a>' +
          '</div>' +
        '</div>');

      Cart.clear();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =======================================================================
     CONTACT
     ===================================================================== */
  function contact() {
    A.init({
      active: 'contact',
      meta: { title: 'Contact & Store Location', description: 'Call, WhatsApp or visit ' + storeConfig.businessName + ' in Dubai. Opening hours, address and directions.' }
    });

    var a = storeConfig.address;

    set('#contact-cards',
      '<div class="contact-card"><h3>PHONE</h3><a href="tel:' + esc(storeConfig.phoneDial) + '">' + esc(storeConfig.phone) + '</a></div>' +
      '<div class="contact-card"><h3>WHATSAPP</h3><a href="' + A.WhatsApp.enquiry('a product') + '" target="_blank" rel="noopener">' + esc(storeConfig.phone) + '</a></div>' +
      '<div class="contact-card"><h3>EMAIL</h3><a href="mailto:' + esc(storeConfig.email) + '">' + esc(storeConfig.email) + '</a></div>' +
      '<div class="contact-card"><h3>ADDRESS</h3><p style="font-weight:500;font-size:14px">' +
        esc(a.line1) + '<br>' + esc(a.line2) + '<br>' + esc(a.city) + ', ' + esc(a.country) + '</p></div>');

    set('#hours-table', storeConfig.hours.map(function (h) {
      return '<tr><td>' + esc(h.day) + '</td><td>' + esc(h.time) + '</td></tr>';
    }).join(''));

    set('#contact-map', '<iframe title="Store location map" src="' + esc(storeConfig.googleMapsEmbed) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>');

    var socialLinks = Object.keys(storeConfig.social || {}).filter(function (k) {
      return storeConfig.social[k] && icons[k];
    }).map(function (k) {
      return '<a href="' + esc(storeConfig.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '" ' +
        'style="width:40px;height:40px;display:grid;place-items:center;border:1px solid var(--line);border-radius:3px">' + icons[k] + '</a>';
    }).join('');
    set('#contact-social', socialLinks);

    /* contact form — sends through WhatsApp or email, no backend required */
    var btn = $('#contact-send');
    if (!btn) { return; }

    ['cf-name', 'cf-phone', 'cf-message'].forEach(function (id) {
      var f = document.getElementById(id);
      if (f) { f.addEventListener('input', function () { f.classList.remove('invalid'); }); }
    });

    btn.addEventListener('click', function () {
      var ok = true;
      function check(fid, valid) {
        var f = document.getElementById(fid);
        if (valid) { f.classList.remove('invalid'); } else { f.classList.add('invalid'); ok = false; }
      }
      var name = $('#ci-name').value.trim();
      var phone = $('#ci-phone').value.trim();
      var subject = $('#ci-subject').value;
      var message = $('#ci-message').value.trim();

      check('cf-name', name.length >= 2);
      check('cf-phone', phone.replace(/\D/g, '').length >= 9);
      check('cf-message', message.length >= 10);
      if (!ok) { UI.toast('Please complete the highlighted fields'); return; }

      var text = [
        'Hello ' + storeConfig.businessName + ',',
        '',
        'Subject: ' + subject,
        'Name: ' + name,
        'Phone: ' + phone,
        '',
        message
      ].join('\n');

      var channel = form_channel();
      if (channel === 'email') {
        window.location.href = 'mailto:' + storeConfig.email +
          '?subject=' + encodeURIComponent(subject + ' — ' + name) +
          '&body=' + encodeURIComponent(text);
      } else {
        window.open(A.WhatsApp.link(text), '_blank', 'noopener');
      }
      UI.toast('Opening your ' + (channel === 'email' ? 'email app' : 'WhatsApp') + '…');
    });

    function form_channel() {
      var checked = document.querySelector('input[name="channel"]:checked');
      return checked ? checked.value : 'whatsapp';
    }
  }

  /* =======================================================================
     ABOUT (static content page — just needs chrome + meta)
     ===================================================================== */
  function about() {
    A.init({
      active: 'about',
      meta: { title: 'About Us', description: 'Who we are: ' + storeConfig.legalName + ', computer hardware suppliers in Dubai.' }
    });
    set('#about-contact',
      '<a class="btn btn-whatsapp btn-sm" href="' + A.WhatsApp.enquiry('your services') + '" target="_blank" rel="noopener">' +
        icons.whatsapp + ' Message us</a>' +
      '<a class="btn btn-outline btn-sm" href="contact.html">Visit the store</a>');
  }

  /* =======================================================================
     404
     ===================================================================== */
  function notFound() {
    A.init({ meta: { title: 'Page not found' } });
  }

  /* called by App when the cart changes, so open pages stay in sync */
  function onCartChange() {
    if (document.getElementById('order-summary')) { renderCheckoutSummary(); }
  }
  function onWishChange() {
    if (shopState.saved && document.getElementById('shop-grid')) { renderShop(); }
  }

  return {
    home: home,
    shop: shop,
    product: product,
    checkout: checkout,
    contact: contact,
    about: about,
    notFound: notFound,
    onCartChange: onCartChange,
    onWishChange: onWishChange
  };
})();
