# Aziz Uthman Electronics — store website

A complete, working e-commerce front end for a computer hardware business in Dubai.
No build step, no framework, no server. Open `index.html` and it runs.

---

## 1. What is in the box

```
index.html            Home
shop.html             Catalogue: filters, sorting, search, pagination, categories,
                      deals, new arrivals and saved items all run from this one page
product.html          Product detail (gallery, specs, buy box, related, recently viewed)
checkout.html         Checkout form, payment selection, order summary
contact.html          Contact details, hours, map, working contact form
about.html            About page (edit the text directly in this file)
404.html              Not-found page
robots.txt            Search engine rules
sitemap.xml           URL list for Google Search Console

assets/
  css/styles.css      All styling, in numbered sections
  js/config.js        ► YOUR BUSINESS DETAILS — edit this first
  js/products.js      ► YOUR PRODUCTS — edit this second
  js/app.js           Engine: cart, wishlist, search, header/footer, WhatsApp
  js/pages.js         Page logic: home, shop, product, checkout, contact
  images/logo.png     ► YOUR LOGO (already installed)
  images/favicon.png  Browser tab icon
```

---

## 2. Running it

**On your computer:** double-click `index.html`. Everything works except the Google Map
preview, which needs an internet connection.

**With a local web server** (recommended, matches how it behaves online):

```bash
cd aziz-uthman-electronics
python3 -m http.server 8080
# then open http://localhost:8080
```

There is nothing to install and no `npm install` step.

---

## 3. Deploying (free)

**Netlify — easiest**
1. Go to app.netlify.com → "Add new site" → "Deploy manually".
2. Drag the whole folder onto the page. Done — you get a live URL immediately.
3. "Domain settings" → "Add custom domain" to point `azizcomputers.com` at it.

**GitHub Pages**
1. Create a repository and upload every file in this folder (keep the folder structure).
2. Settings → Pages → Source: `main` branch, `/root`.
3. Your site appears at `https://yourname.github.io/repo-name/`.

**Vercel**
1. Import the repository at vercel.com. Framework preset: "Other". No build command.

After deploying, change `siteUrl` in `config.js` to your real domain, and regenerate
`sitemap.xml` by find-and-replacing the old domain inside it.

---

## 4. Where to change each thing

| What you want to change | File | What to look for |
|---|---|---|
| Business name, legal name, tagline | `assets/js/config.js` | `businessName`, `legalName`, `tagline` |
| Logo | replace `assets/images/logo.png` | or change the `logo:` path |
| Phone number | `assets/js/config.js` | `phone` (displayed) and `phoneDial` (tel: link) |
| WhatsApp number | `assets/js/config.js` | `whatsapp` — digits only, e.g. `971529135474` |
| Email | `assets/js/config.js` | `email` |
| Address | `assets/js/config.js` | `address` block |
| Google Map | `assets/js/config.js` | `googleMapsEmbed` and `googleMapsUrl` |
| Opening hours | `assets/js/config.js` | `hours` array |
| Social media links | `assets/js/config.js` | `social` — leave `''` to hide an icon |
| Delivery fee / free threshold | `assets/js/config.js` | `deliveryFee`, `freeDeliveryOver` |
| VAT rate | `assets/js/config.js` | `vatRate` |
| Payment methods | `assets/js/config.js` | `paymentMethods`, `paymentBadges` |
| Accent colours, both themes | `assets/js/config.js` | `theme.light` / `theme.dark` |
| Which theme new visitors see | `assets/js/config.js` | `defaultTheme` |
| Hide the theme switch | `assets/js/config.js` | `showThemeToggle: false` |
| Homepage banners | `assets/js/config.js` | `banners` |
| "Why choose us" strip | `assets/js/config.js` | `usps` |
| Categories | `assets/js/config.js` | `categories` array |
| Brands | `assets/js/config.js` | `brands` array |
| Products, prices, stock, photos | `assets/js/products.js` | the `products` array |
| About page text | `about.html` | edit the paragraphs directly |
| Meta description for SEO | `assets/js/config.js` | `defaultMetaDescription` |

**You do not need to touch `app.js` or `pages.js` for any of the above.**

---

## 5. Adding a product

Open `assets/js/products.js` and copy an existing block. Change the values, keeping the
commas and quote marks exactly as they are:

```js
{
  id: 'gpu-003',                     // must be unique
  name: 'Your Product Name',
  slug: 'your-product-name',         // must be unique, lowercase, dashes only
  brand: 'Vertex',                   // must exist in the brands list in config.js
  category: 'graphics-cards',        // must match a category slug in config.js
  price: 1999,                       // normal price in AED, VAT included
  salePrice: 1799,                   // discounted price, or null for no discount
  images: ['assets/images/products/my-photo.jpg'],
  shortDescription: 'One line shown on the product page.',
  description: 'Longer paragraph for the Description tab.',
  specifications: { 'Memory': '12GB', 'Warranty': '3 years' },
  stock: 5,                          // 0 shows "Out of stock" and blocks adding to cart
  sku: 'VTX-GPU-XXXX',
  featured: true,                    // shows on the homepage
  newProduct: false,                 // adds the "New" badge
  tags: ['gpu', 'gaming']            // extra search keywords
},
```

**Product photos:** create `assets/images/products/` and put your JPGs there, then
reference them as above. Square images (1000 × 1000) look best. If an image is missing
or fails to load, a neutral placeholder is shown instead of a broken icon.

**Discounts:** set `salePrice`. The percentage badge, the crossed-out old price and the
"you save" line in the cart are all calculated automatically.

**Stock:** the number you enter caps the quantity a customer can order. Setting it to 5
or less shows "Only N left".

---

## 6. Light and dark themes

The site ships with two complete themes and a switch in the top bar (and in the
mobile menu):

- **Light** — blue gradient accent on a light canvas. Buttons, badges, rules and
  highlights all run on `linear-gradient(135deg, #3B7BFF, #1B4FD8, #12327F)`.
- **Dark** — gold gradient accent on near-black, matching the gold in your logo:
  `linear-gradient(135deg, #F0D999, #D9B463, #A8812C)`.

**How it behaves.** A first-time visitor gets whatever their phone or laptop is set
to (`defaultTheme: 'auto'`). The moment they use the switch, that choice is saved and
sticks on every page and every future visit, on that device. An inline script in the
`<head>` of each page sets the theme before the page paints, so there is no white
flash on a dark-mode phone. Two open tabs stay in sync.

**Changing the colours.** Edit `theme.light` and `theme.dark` in `config.js`:

```js
theme: {
  light: {
    accent:     '#1B4FD8',   // blue
    accentDeep: '#12327F',
    gradient:   'linear-gradient(135deg, #3B7BFF 0%, #1B4FD8 55%, #12327F 100%)',
    tint:       '#F2F6FF'
  },
  dark: {
    accent:     '#D9B463',   // gold
    accentDeep: '#E8C87A',
    gradient:   'linear-gradient(135deg, #F0D999 0%, #D9B463 45%, #A8812C 100%)',
    tint:       '#1E1A10'
  }
}
```

Every accented element — buttons, the gradient line under each heading, the cart
badge, the "New" chip, the bar under the header, the mega-menu edge — reads from
those four values, so changing them restyles the whole site.

**Forcing one theme.** Set `defaultTheme: 'dark'` (or `'light'`) to pick what new
visitors see, and `showThemeToggle: false` to remove the switch. Visitors who already
chose a theme keep theirs; clearing the browser's site data resets it.

**Surfaces and text** (backgrounds, borders, greys) live in section 15 of
`assets/css/styles.css` under `:root` and `[data-theme="dark"]`. Edit them there if
you want a different black or a different off-white.

---

## 7. How ordering works

There is no payment gateway connected, by design — nothing pretends to take money.

1. Customer adds items to the cart (saved in their browser, survives a refresh).
2. At checkout they fill in name, phone, email, address, emirate and notes.
3. The form is validated, then WhatsApp opens on your number with the complete order:
   every item, SKU, quantity, line totals, delivery charge, grand total, VAT and the
   delivery details, plus a reference number like `AZ-4CD6UM`.
4. You reply to confirm stock and delivery time, then dispatch.

The same WhatsApp message builder powers the "Order on WhatsApp" button on each
product page and the button inside the cart drawer.

**Change the number in one place only:** `whatsapp` in `config.js`.

---

## 8. Search, filters and the cart — all real

Nothing on this site is a decorative button:

- Search matches product name, brand, SKU, category, subcategory and tags, with live
  suggestions in the header and a full results page.
- Filters (category, brand, price range, in-stock, on-offer) combine, show as removable
  chips, and work together with sorting and pagination.
- Quantity changes recalculate the line total, subtotal, discount, delivery and VAT.
- The cart persists in `localStorage` and syncs between two open tabs.
- The wishlist (heart icon) persists too and has its own view at `shop.html?saved=1`.
- Out-of-stock items cannot be added; quantities are capped at available stock.

---

## 9. Adding features later

The code is structured so these can be added without a rewrite:

**Online card payment (Stripe, Telr, Network International, Tabby)**
`config.js` already marks online methods with `enabled: false`. When you have a gateway,
build the order server-side and send the cart to it — never trust the total from the
browser. `Cart.detailed()` in `app.js` gives you the item list to post.

**Admin dashboard**
`products.js` is deliberately a single array with a fixed shape. When you are ready,
serve that same shape from an API (`GET /api/products`) and replace the `products`
variable with a fetch call — no other file needs to change. Categories and brands in
`config.js` work the same way.

**Clean URLs**
Products currently use `product.html?p=slug` because static hosts cannot route
`/products/slug` without configuration. On Netlify, add a `_redirects` file containing
`/products/* /product.html?p=:splat 200` to get `/products/your-slug` working.

**Customer accounts, order history, reviews, coupons, PC builder**
All need a backend. The front end is already separated into data (`config.js`,
`products.js`), engine (`app.js`) and views (`pages.js`), so each can be swapped for an
API-backed version independently.

---

## 10. SEO checklist after you go live

- [ ] Set `siteUrl` in `config.js` to your real domain
- [ ] Replace the domain inside `sitemap.xml`
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Create a Google Business Profile for the Bur Dubai shop and use the same
      name, address and phone number as in `config.js`
- [ ] Replace the sample product photos with your own — Google image search sends
      real traffic to hardware shops
- [ ] Rewrite `about.html` in your own words

Already handled for you: page titles, meta descriptions, canonical tags, Open Graph
tags, semantic HTML, alt text, `ElectronicsStore` structured data on every page and
`Product` structured data with price and stock on every product page.

---

## 11. Accessibility and performance notes

- Keyboard navigable throughout, with visible focus rings and Escape closing the cart,
  menus and filter sheet.
- `aria-*` attributes on the cart drawer, mega menu, tabs, filters and pagination.
- Reduced-motion preference is respected, and the theme follows the device setting
  until the visitor chooses otherwise.
- Total JavaScript is roughly 60 KB unminified with no dependencies; images are lazy
  loaded; fonts load from Google Fonts with system fallbacks.
- Everything is served as static files, so any CDN caches it for free.
