/* ==========================================================================
   AZIZ UTHMAN ELECTRONICS — CENTRAL CONFIGURATION
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR BUSINESS DETAILS.
   Everything below feeds the header, footer, contact page, WhatsApp
   messages, checkout totals and SEO tags automatically.
   ========================================================================== */

const storeConfig = {

  /* ---- 1. BUSINESS IDENTITY ------------------------------------------- */
  businessName: 'Aziz Computers',
  legalName: 'Aziz Computers & Requisites Trading Co. L.L.C.',
  tagline: ' AND REQUISITES TRADING CO · DUBAI ',
  shortDescription:
    'Computer hardware, components and accessories supplied to homes, offices and trade customers across the UAE.',

  /* Replace this file to change the logo: assets/images/logo.png
     Keep it square and transparent (PNG or SVG) for best results. */
  logo: 'assets/images/logo.png',
  favicon: 'assets/images/favicon.png',

  /* ---- 2. CONTACT ------------------------------------------------------ */
  phone: '+971 52 913 5474',          // shown on the site
  phoneDial: '+971529135474',         // used by tel: links — no spaces
  whatsapp: '971529135474',           // digits only, country code first, no "+" or 0
  email: 'info@azizcomputers.com',

  address: {
    line1: 'Shop No 6 Al Mazroui Building',
    line2: 'Near Sindhi Restaurant Souk Al Kabeer Bur',
    city: 'Dubai',
    country: 'United Arab Emirates',
    poBox: 'P.O. Box 00000'
  },

  /* Paste the "Embed a map" iframe SRC from Google Maps here.
     Google Maps -> Share -> Embed a map -> copy the src="..." value only. */
  googleMapsEmbed:
    'https://www.google.com/maps?q=Computer%20Street%20Bur%20Dubai&output=embed',
  googleMapsUrl: 'https://maps.google.com/?q=Computer+Street+Bur+Dubai',

  /* ---- 3. OPENING HOURS ------------------------------------------------ */
  hours: [
    { day: 'Saturday – Thursday', time: '10:00 AM – 06:00 PM' },
    { day: 'Friday', time: '10:00 AM – 06:00 PM' },
    { day: 'Public holidays & Sunday', time: 'Closed' }
  ],

  /* ---- 4. SOCIAL LINKS (leave '' to hide the icon) --------------------- */
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    tiktok: '',
    linkedin: 'https://linkedin.com/',
    x: ''
  },

  /* ---- 5. COMMERCE SETTINGS ------------------------------------------- */
  currency: 'AED',
  currencyLocale: 'en-AE',
  vatRate: 0.05,                 // UAE VAT 5% — prices below are VAT-inclusive
  vatIncludedInPrices: true,
  deliveryFee: 25,               // AED, flat rate
  freeDeliveryOver: 500,         // AED, subtotal above which delivery is free
  minimumOrder: 0,
  deliveryTime: 'Same-day in Dubai · 1–2 days across the UAE',
  returnWindowDays: 7,

  /* Payment methods shown in the footer and on checkout.
     "online: false" means it is handled manually (COD, bank transfer, etc.)
     "online: true" needs a payment gateway — see README section 8. */
  paymentMethods: [
    { id: 'cod',      label: 'Cash on Delivery', note: 'Pay the driver in cash when your order arrives.', online: true, enabled: true },
    { id: 'card_pos', label: 'Card on Delivery', note: 'Card machine available on delivery in Dubai and Sharjah.', online: true, enabled: true },
    { id: 'transfer', label: 'Bank Transfer',    note: 'We send account details on WhatsApp after you place the order.', online: true, enabled: true },
    { id: 'store',    label: 'Pay at the Shop',  note: 'Reserve online and pay when you collect from Bur Dubai.', online: true, enabled: true },
    { id: 'card',     label: 'Card Online (Visa / Mastercard)', note: 'Coming soon — gateway not connected yet.', online: true, enabled: false },
    { id: 'tabby',    label: 'Tabby — 4 payments', note: 'Coming soon — gateway not connected yet.', online: true, enabled: false }
  ],

  /* Badges shown in the footer only (visual trust signals) */
  paymentBadges: ['Cash on Delivery', 'Visa', 'Mastercard', 'Apple Pay', 'Tabby', 'Tamara', 'Bank Transfer'],

  /* ---- 6. THEMES AND COLOURS ------------------------------------------ */
  /* The site ships with two full themes and a toggle in the top bar.
       light -> blue gradient accent on a light canvas
       dark  -> gold gradient accent on near-black (matches the logo)

     defaultTheme: 'auto' follows the visitor's device setting on their first
     visit, then remembers whatever they pick. Use 'light' or 'dark' to force
     one. Set showThemeToggle to false to hide the switch entirely. */
  defaultTheme: 'auto',
  showThemeToggle: true,

  theme: {
    light: {
      accent: '#1B4FD8',      // blue — buttons, links, highlights
      accentDeep: '#12327F',  // stronger blue for text and hovers
      gradient: 'linear-gradient(135deg, #3B7BFF 0%, #1B4FD8 55%, #12327F 100%)',
      tint: '#F2F6FF'         // faint accent background for notes and selections
    },
    dark: {
      accent: '#D9B463',      // gold — taken from the logo
      accentDeep: '#E8C87A',
      gradient: 'linear-gradient(135deg, #F0D999 0%, #D9B463 45%, #A8812C 100%)',
      tint: '#1E1A10'
    }
  },

  /* ---- 7. SITE / SEO --------------------------------------------------- */
  siteUrl: 'https://www.azizcomputers.com',   // used for canonical + OG tags
  defaultMetaDescription:
    'Buy laptops, graphics cards, processors, monitors and PC accessories in Dubai. Genuine stock, warranty, same-day delivery and cash on delivery across the UAE.',

  /* ---- 8. HOMEPAGE PROMO BANNERS -------------------------------------- */
  banners: [
    {
      kicker: 'BUILD SEASON',
      title: 'Custom gaming rigs, assembled in-store',
      text: 'Bring your parts list or let us spec it. Assembly, cable management and stress testing included.',
      cta: 'Talk to a builder',
      href: 'contact.html',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=70'
    },
    {
      kicker: 'BUSINESS & TRADE',
      title: 'Bulk pricing for offices',
      text: 'Workstations, monitors and networking supplied with tax invoice and delivery.',
      cta: 'Request a quote',
      href: 'contact.html',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=70'
    }
  ],

  /* ---- 9. WHY CHOOSE US (homepage strip) ------------------------------ */
  usps: [
    { icon: 'truck',  title: 'Same-day Dubai delivery', text: 'Order before 4 PM for delivery today.' },
    { icon: 'shield', title: 'Genuine stock, warranty', text: 'Manufacturer warranty on every item we sell.' },
    { icon: 'cash',   title: 'Cash on delivery',        text: 'Pay when it reaches your door across the UAE.' },
    { icon: 'tools',  title: 'In-house build service',  text: 'Assembly, upgrades and repairs at the shop.' }
  ],

  /* ---- 10. TOP AD CAROUSEL (beneath the main nav bar) ------------------
     8–10 full-width slides that rotate on their own. Each one is either an
     image or a short looping video — mix and match freely.
       type    'image' | 'video'
       src     image path, or a video file (.mp4 recommended)
       poster  video only — a still frame shown before it starts playing
       alt     accessible label, and the caption fallback
       kicker  small label above the title (optional)
       title   headline shown over the slide (optional)
       cta     button text shown over the slide (optional)
       href    where the slide links to
     Delete any slide you don't want, or add more — no limit beyond 10 shown. */
  heroCarouselInterval: 20000, // ms between automatic slide changes
  heroCarousel: [
    { type: 'image', kicker: 'THIS WEEK', title: 'Gaming laptops from AED 2,999', cta: 'Shop laptops',
      href: 'shop.html?category=laptops', alt: 'Gaming laptop deal',
      src: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=70' },
    { type: 'image', kicker: 'DEAL OF THE WEEK', title: 'Up to 25% off graphics cards', cta: 'See the deals',
      href: 'shop.html?deals=1', alt: 'Graphics card discount',
      src: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=70' },
    { type: 'image', kicker: 'IN-STORE SERVICE', title: 'Custom builds assembled while you wait', cta: 'Talk to a builder',
      href: 'contact.html', alt: 'Custom PC build service',
      src: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=70' },
    { type: 'image', kicker: 'JUST LANDED', title: 'New monitors now in stock', cta: 'Shop monitors',
      href: 'shop.html?category=monitors', alt: 'New monitor arrivals',
      src: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=70' },
    { type: 'image', kicker: 'TRADE & CORPORATE', title: 'Bulk pricing with tax invoice', cta: 'Request a quote',
      href: 'contact.html', alt: 'Corporate bulk order',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=70' }
    /* Example video slide — point src at your own .mp4 and uncomment:
    { type: 'video', title: 'Watch this week\'s build', cta: 'Shop now', href: 'shop.html',
      poster: 'assets/images/ads/slide-video-poster.jpg', src: 'assets/videos/slide-video.mp4' }, */
  ],

  /* ---- 11. AD BANNERS BENEATH THE HERO ---------------------------------
     2 to 4 banners, laid out as a tall banner on the left, up to two
     stacked banners in the middle, and a tall banner on the right.
     "position" controls the slot: 'left', 'mid' or 'right'.
     type/src/poster/alt/href work exactly like the carousel slides above. */
  adBannersHero: [
    { position: 'left', type: 'image', href: 'shop.html?category=laptops', alt: 'Laptop banner',
      src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=70' },
    { position: 'mid', type: 'image', href: 'shop.html?category=keyboards', alt: 'Keyboard banner',
      src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=70' },
    { position: 'mid', type: 'video', href: 'shop.html?deals=1', alt: 'Deals video banner',
      poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=70',
      src: 'assets/videos/laptop-ad.mp4' },									/*Add Video Here*/
    { position: 'right', type: 'image', href: 'shop.html?category=graphics-cards', alt: 'Graphics card banner',
      src: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=800&q=70' }
  ],

  /* ---- 11b. TEXT PANELS IN THE MARGIN BESIDE THE BANNER ROW ------------
     The banner row above is capped at 900px, so on wide screens there is
     empty space either side of it. These optional panels fill that space
     with a short written message instead of another image — good for a
     tagline, a guarantee, or a short pitch. They disappear on narrower
     screens (there isn't room), leaving just the banner row.
     Set either side (or both) to null to leave that space empty. */
  adSideText: {
    left: {
      kicker: 'WHY BUY FROM US',
      title: 'Every part, tested before it leaves the shop',
      text: 'No sealed-box gambles — we check it works, then we box it for you.',
      cta: 'Read more', href: 'about.html'
    },
    right: {
      kicker: 'NEED HELP CHOOSING',
      title: 'Tell us your budget and workload',
      text: 'Message us on WhatsApp and we will put a build together for you.',
      cta: 'Chat with us', href: '' // leave blank to open WhatsApp automatically
    }
  },

  /* ---- 12. VIDEO AD INSIDE "Picked by our counter staff" ---------------
     Takes one card's place in that grid (8 products becomes 7 + this ad).
     Set to null to turn it off and show 8 products instead. */
  featuredVideoAd: {
    title: 'This month\'s counter pick',
    text: 'Ask us about it in-store or on WhatsApp — stock moves fast.',
    cta: 'Ask on WhatsApp',
    href: '', // leave blank to open WhatsApp automatically, or set a product/shop link
    poster: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=70',
    src: 'assets/videos/featured-ad.mp4'
  },

  /* ---- 13. "On offer" / "Just landed" AD STRIPS ------------------------
     One banner plus a short line of text beneath each section.
     Set either to null to turn it off. */
  dealsAd: {
    type: 'image', href: 'shop.html?deals=1', alt: 'Deals banner',
    src: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=70',
    text: 'Prices change the moment stock changes — check back often for the best price on the day.'
  },
  newArrivalsAd: {
    type: 'image', href: 'shop.html?new=1', alt: 'New arrivals banner',
    src: 'assets/images/Hp-banner.jpg',
    text: 'New lines land every month — follow us on Instagram to see them the day they arrive.'
  }
};

/* ==========================================================================
   CATEGORIES
   Add, remove or reorder freely. "slug" must match the category slug used
   in assets/js/products.js. "icon" picks one of the inline SVGs in app.js.
   "group" controls which column it appears in inside the mega menu.
   ========================================================================== */
const categories = [
  { slug: 'laptops',        name: 'Laptops',          group: 'Systems',     icon: 'laptop',   featured: true,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=70' },
  { slug: 'desktops',       name: 'Desktop PCs',      group: 'Systems',     icon: 'desktop',  featured: true,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=500&q=70' },
  { slug: 'graphics-cards', name: 'Graphics Cards',   group: 'Components',  icon: 'gpu',      featured: true,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=70' },
  { slug: 'processors',     name: 'Processors',       group: 'Components',  icon: 'cpu',      featured: true,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=500&q=70' },
  { slug: 'motherboards',   name: 'Motherboards',     group: 'Components',  icon: 'board',    featured: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=70' },
  { slug: 'memory',         name: 'Memory (RAM)',     group: 'Components',  icon: 'ram',      featured: true,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=70' },
  { slug: 'storage',        name: 'Storage & SSDs',   group: 'Components',  icon: 'ssd',      featured: true,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=70' },
  { slug: 'power-supplies', name: 'Power Supplies',   group: 'Components',  icon: 'power',    featured: false,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=70' },
  { slug: 'cases',          name: 'PC Cases',         group: 'Components',  icon: 'case',     featured: false,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500&q=70' },
  { slug: 'cooling',        name: 'Cooling',          group: 'Components',  icon: 'fan',      featured: false,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=70' },
  { slug: 'monitors',       name: 'Monitors',         group: 'Peripherals', icon: 'monitor',  featured: true,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=70' },
  { slug: 'keyboards',      name: 'Keyboards',        group: 'Peripherals', icon: 'keyboard', featured: false,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=70' },
  { slug: 'mice',           name: 'Mice',             group: 'Peripherals', icon: 'mouse',    featured: false,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=70' },
  { slug: 'headsets',       name: 'Headsets & Audio', group: 'Peripherals', icon: 'headset',  featured: false,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=70' },
  { slug: 'networking',     name: 'Networking',       group: 'Peripherals', icon: 'wifi',     featured: false,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=500&q=70' },
  { slug: 'accessories',    name: 'Accessories',      group: 'Peripherals', icon: 'plug',     featured: true,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=500&q=70' }
];

/* ==========================================================================
   BRANDS — used by the shop filters and the homepage brand strip.
   ========================================================================== */
// Plain string array for product filtering logic — do not remove entries from
// here without also removing them from brandLogos below.
const brands = [
  'HP', 'Lenovo', 'Acer', 'Dell', 'Asus', 'MSI', 'NVIDIA',
  'Microsoft', 'Apple', 'Samsung',
];

/* Logo shown in the homepage "Brands we carry" strip, keyed by the exact
   name used in the `brands` array above. Drop your logo files into
   assets/images/brands/ and point to them here — PNG or SVG, transparent
   background, roughly the same visual weight/size across all of them so the
   row lines up. Any brand left out of this map (or given an empty string)
   falls back to its name shown as plain text, so you can add logos
   gradually. */
const brandLogos = {
  'HP': 'assets/images/brands/hp.svg',
  'Lenovo': 'assets/images/brands/lenovo.svg',
  'Acer': 'assets/images/brands/acer.svg',
  'Dell': 'assets/images/brands/dell.svg',
  'Asus': 'assets/images/brands/asus.svg',
  'MSI': 'assets/images/brands/msi.svg',
  'NVIDIA': 'assets/images/brands/nvidia.svg',
  'Microsoft': 'assets/images/brands/microsoft.svg',
  'Apple': 'assets/images/brands/apple.svg',
  'Samsung': 'assets/images/brands/samsung.svg'
};
