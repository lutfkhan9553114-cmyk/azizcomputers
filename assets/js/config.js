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
  tagline: 'COMPUTERS & REQUISITES · DUBAI',
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
    { day: 'Saturday – Thursday', time: '9:30 AM – 9:30 PM' },
    { day: 'Friday', time: '2:00 PM – 9:30 PM' },
    { day: 'Public holidays', time: 'Call to confirm' }
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
    { id: 'cod',      label: 'Cash on Delivery', note: 'Pay the driver in cash when your order arrives.', online: false, enabled: true },
    { id: 'card_pos', label: 'Card on Delivery', note: 'Card machine available on delivery in Dubai and Sharjah.', online: false, enabled: true },
    { id: 'transfer', label: 'Bank Transfer',    note: 'We send account details on WhatsApp after you place the order.', online: false, enabled: true },
    { id: 'store',    label: 'Pay at the Shop',  note: 'Reserve online and pay when you collect from Bur Dubai.', online: false, enabled: true },
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
  ]
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
const brands = [
  'HP', 'Lenovo', 'Acer', 'Dell', 'Asus', 'MSI', 'NIVIDIA',
   'Microsoft', 'Apple', 'Samsung',
];
