/* ==========================================================================
   PRODUCT CATALOGUE
   --------------------------------------------------------------------------
   This is your product database. Add, edit or delete entries freely —
   every page (home, shop, category, product detail, search, cart) reads
   from this one array.

   REQUIRED fields : id, name, slug, brand, category, price, images, sku, stock
   OPTIONAL fields : salePrice, subcategory, shortDescription, description,
                     specifications, featured, newProduct, tags

   NOTES
   - "category" must match a slug in the categories list in config.js
   - "slug" becomes the product URL: product.html?p=your-slug
   - "price" is the normal price, "salePrice" is the discounted price.
     Leave salePrice as null when the item is not on offer.
   - Prices are in AED and include 5% VAT.
   - Put your own photos in assets/images/products/ and reference them like
     "assets/images/products/my-photo.jpg". The sample URLs below are
     temporary stock photos — replace them with your real product images.
   ========================================================================== */

const products = [
  {
    id: 'gpu-001',
    name: 'Vertex RX-9070 XT 16GB Graphics Card',
    slug: 'vertex-rx-9070-xt-16gb',
    brand: 'Vertex',
    category: 'graphics-cards',
    subcategory: 'Gaming GPU',
    price: 3299,
    salePrice: 2999,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Triple-fan 16GB card built for 1440p and entry 4K gaming.',
    description:
      'A high-airflow triple-fan card aimed at 1440p high-refresh gaming and entry-level 4K. The vapour chamber and dual BIOS switch keep sustained clocks stable in warm rooms, which matters in UAE summer conditions. Ships with the retail box, accessories and manufacturer warranty.',
    specifications: {
      'Memory': '16GB GDDR6',
      'Memory Bus': '256-bit',
      'Boost Clock': '2.52 GHz',
      'Interface': 'PCIe 4.0 x16',
      'Outputs': '3 × DisplayPort 2.1, 1 × HDMI 2.1',
      'Power Connectors': '2 × 8-pin',
      'Recommended PSU': '750W',
      'Length': '322 mm',
      'Warranty': '3 years'
    },
    stock: 6,
    sku: 'VTX-GPU-9070XT',
    featured: true,
    newProduct: true,
    tags: ['gaming', 'gpu', '1440p', 'ray tracing']
  },
  {
    id: 'gpu-002',
    name: 'ApexCore GT-5060 8GB Dual-Fan Graphics Card',
    slug: 'apexcore-gt-5060-8gb',
    brand: 'ApexCore',
    category: 'graphics-cards',
    subcategory: 'Mainstream GPU',
    price: 1450,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Compact 8GB card for 1080p gaming and creator work.',
    description:
      'A short 2.2-slot card that fits most mid-tower and micro-ATX builds. Strong at 1080p high settings, quiet under load, and undemanding on power — a straightforward upgrade for an older office or home PC.',
    specifications: {
      'Memory': '8GB GDDR6',
      'Memory Bus': '128-bit',
      'Boost Clock': '2.41 GHz',
      'Interface': 'PCIe 4.0 x8',
      'Outputs': '3 × DisplayPort 1.4, 1 × HDMI 2.1',
      'Power Connectors': '1 × 8-pin',
      'Recommended PSU': '550W',
      'Length': '242 mm',
      'Warranty': '3 years'
    },
    stock: 14,
    sku: 'APX-GPU-5060',
    featured: false,
    newProduct: false,
    tags: ['gpu', '1080p', 'compact']
  },
  {
    id: 'cpu-001',
    name: 'NovaTek N9 7950X 16-Core Processor',
    slug: 'novatek-n9-7950x',
    brand: 'NovaTek',
    category: 'processors',
    subcategory: 'Desktop CPU',
    price: 2190,
    salePrice: 1949,
    images: [
      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '16 cores, 32 threads — rendering, compiling and streaming.',
    description:
      'A workstation-class desktop processor for heavy multi-threaded work: 3D rendering, video export, compiling and virtual machines. Pairs well with a 240 mm AIO or a large tower cooler.',
    specifications: {
      'Cores / Threads': '16 / 32',
      'Base Clock': '4.2 GHz',
      'Boost Clock': '5.7 GHz',
      'Cache': '80 MB total',
      'Socket': 'SK-5',
      'TDP': '170W',
      'Integrated Graphics': 'Yes, 2-core',
      'Cooler Included': 'No',
      'Warranty': '3 years'
    },
    stock: 9,
    sku: 'NVT-CPU-7950X',
    featured: true,
    newProduct: false,
    tags: ['cpu', 'workstation', 'content creation']
  },
  {
    id: 'cpu-002',
    name: 'NovaTek N5 7600 6-Core Processor',
    slug: 'novatek-n5-7600',
    brand: 'NovaTek',
    category: 'processors',
    subcategory: 'Desktop CPU',
    price: 849,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Six cores with a bundled cooler — the sensible gaming pick.',
    description:
      'The value choice for a new gaming build. Six fast cores handle current titles comfortably, and the bundled cooler keeps the total build cost down.',
    specifications: {
      'Cores / Threads': '6 / 12',
      'Base Clock': '3.8 GHz',
      'Boost Clock': '5.1 GHz',
      'Cache': '38 MB total',
      'Socket': 'SK-5',
      'TDP': '105W',
      'Integrated Graphics': 'Yes, 2-core',
      'Cooler Included': 'Yes',
      'Warranty': '3 years'
    },
    stock: 21,
    sku: 'NVT-CPU-7600',
    featured: false,
    newProduct: false,
    tags: ['cpu', 'gaming', 'value']
  },
  {
    id: 'lap-001',
    name: 'Stratos Blade 15 Gaming Laptop — 16GB / 1TB',
    slug: 'stratos-blade-15-gaming-laptop',
    brand: 'Stratos',
    category: 'laptops',
    subcategory: 'Gaming Laptop',
    price: 5499,
    salePrice: 4999,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '15.6" 165Hz display, 8-core CPU and a 8GB discrete GPU.',
    description:
      'A thin gaming and creator laptop with a 165Hz panel, per-key backlighting and two M.2 slots for later expansion. Comes with a 230W adapter and a 12-month regional warranty.',
    specifications: {
      'Display': '15.6" QHD 165Hz, 100% sRGB',
      'Processor': '8-core mobile CPU',
      'Graphics': '8GB discrete GPU',
      'Memory': '16GB DDR5 (2 slots, expandable to 64GB)',
      'Storage': '1TB NVMe SSD (second M.2 slot free)',
      'Ports': '2 × USB-C, 2 × USB-A, HDMI 2.1, RJ-45',
      'Battery': '90Wh',
      'Weight': '2.1 kg',
      'Warranty': '1 year'
    },
    stock: 4,
    sku: 'STR-LAP-B15',
    featured: true,
    newProduct: true,
    tags: ['laptop', 'gaming', '165hz']
  },
  {
    id: 'lap-002',
    name: 'Lumen Air 14 Business Ultrabook — 16GB / 512GB',
    slug: 'lumen-air-14-ultrabook',
    brand: 'Lumen',
    category: 'laptops',
    subcategory: 'Business Laptop',
    price: 3299,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '1.2 kg aluminium ultrabook with all-day battery.',
    description:
      'Built for office and travel use: a matte 14" screen, fingerprint reader, and a battery that lasts a full working day. Available for corporate orders with tax invoice.',
    specifications: {
      'Display': '14" WUXGA matte, 400 nits',
      'Processor': '10-core efficiency CPU',
      'Graphics': 'Integrated',
      'Memory': '16GB LPDDR5 (soldered)',
      'Storage': '512GB NVMe SSD',
      'Ports': '2 × USB-C Thunderbolt, 1 × USB-A, HDMI',
      'Battery': '65Wh, up to 14 hours',
      'Weight': '1.2 kg',
      'Warranty': '2 years'
    },
    stock: 11,
    sku: 'LUM-LAP-A14',
    featured: false,
    newProduct: false,
    tags: ['laptop', 'business', 'lightweight']
  },
  {
    id: 'pc-001',
    name: 'Aziz Custom Build — Tier 3 Gaming Desktop',
    slug: 'aziz-custom-tier-3-gaming-desktop',
    brand: 'Ironclad',
    category: 'desktops',
    subcategory: 'Gaming PC',
    price: 7899,
    salePrice: 7299,
    images: [
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Assembled and tested in our Bur Dubai workshop.',
    description:
      'Our in-house 1440p gaming build. Every unit is assembled, cable-managed, BIOS-updated and stress-tested for four hours before it leaves the shop. Specification can be adjusted — message us on WhatsApp and we will quote your configuration.',
    specifications: {
      'Processor': '8-core desktop CPU',
      'Graphics': '16GB discrete GPU',
      'Memory': '32GB DDR5 6000MT/s',
      'Storage': '2TB NVMe Gen4 SSD',
      'Cooling': '240 mm liquid cooler',
      'Power Supply': '850W 80+ Gold',
      'Case': 'Mesh mid-tower, 4 fans',
      'Operating System': 'Not included',
      'Warranty': '1 year build + component warranty'
    },
    stock: 3,
    sku: 'AZZ-PC-T3',
    featured: true,
    newProduct: false,
    tags: ['gaming pc', 'custom build', 'desktop']
  },
  {
    id: 'mb-001',
    name: 'Kestrel B850-PRO WiFi Motherboard',
    slug: 'kestrel-b850-pro-wifi',
    brand: 'Kestrel',
    category: 'motherboards',
    subcategory: 'ATX Motherboard',
    price: 799,
    salePrice: 719,
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'ATX board with Wi-Fi 7, three M.2 slots and 12+2 VRM.',
    description:
      'A well-cooled mid-range ATX board with enough VRM headroom for 16-core chips, three heatsinked M.2 slots and front USB-C header.',
    specifications: {
      'Socket': 'SK-5',
      'Chipset': 'B850',
      'Form Factor': 'ATX',
      'Memory Support': '4 × DDR5, up to 192GB, 7600MT/s OC',
      'Expansion': '1 × PCIe 5.0 x16, 2 × PCIe 4.0 x1',
      'Storage': '3 × M.2 NVMe, 4 × SATA 6Gb/s',
      'Networking': '2.5G LAN + Wi-Fi 7',
      'Rear USB': '8 ports incl. USB-C 20Gb/s',
      'Warranty': '3 years'
    },
    stock: 8,
    sku: 'KST-MB-B850',
    featured: false,
    newProduct: false,
    tags: ['motherboard', 'atx', 'wifi 7']
  },
  {
    id: 'ram-001',
    name: 'Obelisk Vanta 32GB DDR5-6000 CL30 (2 × 16GB)',
    slug: 'obelisk-vanta-32gb-ddr5-6000',
    brand: 'Obelisk',
    category: 'memory',
    subcategory: 'Desktop RAM',
    price: 479,
    salePrice: 419,
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Low-latency DDR5 kit with an aluminium heat spreader.',
    description:
      'A 6000MT/s CL30 kit that hits its rated speed with one BIOS profile toggle. Low-profile enough to clear most tower coolers.',
    specifications: {
      'Capacity': '32GB (2 × 16GB)',
      'Type': 'DDR5 UDIMM',
      'Speed': '6000 MT/s',
      'Latency': 'CL30-36-36-76',
      'Voltage': '1.35V',
      'Profile': 'XMP 3.0 / EXPO',
      'Height': '34 mm',
      'Warranty': 'Lifetime'
    },
    stock: 25,
    sku: 'OBL-RAM-32K6',
    featured: true,
    newProduct: false,
    tags: ['ram', 'ddr5', 'memory']
  },
  {
    id: 'ssd-001',
    name: 'Obelisk Rapid 2TB NVMe Gen4 SSD',
    slug: 'obelisk-rapid-2tb-nvme-gen4',
    brand: 'Obelisk',
    category: 'storage',
    subcategory: 'Internal SSD',
    price: 539,
    salePrice: 469,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '7,400 MB/s reads with a 1,200 TBW endurance rating.',
    description:
      'A Gen4 drive with DRAM cache — the right pick for a boot drive, video scratch disk or a console expansion. Graphene label keeps it under thermal limits without a bulky heatsink.',
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4, NVMe 2.0',
      'Form Factor': 'M.2 2280',
      'Sequential Read': 'Up to 7,400 MB/s',
      'Sequential Write': 'Up to 6,900 MB/s',
      'Endurance': '1,200 TBW',
      'Cache': '2GB DDR4 DRAM',
      'Warranty': '5 years'
    },
    stock: 18,
    sku: 'OBL-SSD-2TG4',
    featured: true,
    newProduct: false,
    tags: ['ssd', 'nvme', 'storage', 'gen4']
  },
  {
    id: 'psu-001',
    name: 'Ironclad Fortis 850W 80+ Gold Modular PSU',
    slug: 'ironclad-fortis-850w-gold',
    brand: 'Ironclad',
    category: 'power-supplies',
    subcategory: 'ATX PSU',
    price: 629,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Fully modular, ATX 3.1, with a native 12V-2x6 cable.',
    description:
      'An ATX 3.1 unit with the native 12V-2x6 GPU cable, so no adapters are needed for current graphics cards. Fan stays off under light load.',
    specifications: {
      'Wattage': '850W',
      'Efficiency': '80 PLUS Gold',
      'Standard': 'ATX 3.1 / PCIe 5.1',
      'Modular': 'Fully modular',
      'Fan': '135 mm FDB, zero-RPM mode',
      'Protections': 'OVP, OCP, OPP, SCP, OTP',
      'Depth': '150 mm',
      'Warranty': '10 years'
    },
    stock: 12,
    sku: 'IRC-PSU-850G',
    featured: false,
    newProduct: false,
    tags: ['psu', 'power supply', 'modular']
  },
  {
    id: 'case-001',
    name: 'Ironclad Atlas Mesh Mid-Tower Case',
    slug: 'ironclad-atlas-mesh-mid-tower',
    brand: 'Ironclad',
    category: 'cases',
    subcategory: 'Mid Tower',
    price: 389,
    salePrice: 339,
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'High-airflow mesh front with four fans pre-installed.',
    description:
      'A practical airflow case with a full mesh front panel, tempered glass side and a removable top bracket that makes radiator installation far easier.',
    specifications: {
      'Form Factor': 'Mid Tower (ATX, mATX, ITX)',
      'Fans Included': '4 × 120 mm ARGB',
      'Radiator Support': '360 mm front, 280 mm top',
      'GPU Clearance': '400 mm',
      'CPU Cooler Height': '175 mm',
      'Drive Bays': '2 × 3.5", 3 × 2.5"',
      'Front I/O': 'USB-C, 2 × USB-A, audio',
      'Warranty': '2 years'
    },
    stock: 15,
    sku: 'IRC-CSE-ATLAS',
    featured: false,
    newProduct: false,
    tags: ['case', 'airflow', 'mid tower']
  },
  {
    id: 'mon-001',
    name: 'Lumen Vista 27" QHD 180Hz IPS Monitor',
    slug: 'lumen-vista-27-qhd-180hz',
    brand: 'Lumen',
    category: 'monitors',
    subcategory: 'Gaming Monitor',
    price: 1149,
    salePrice: 999,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '1440p at 180Hz with 1 ms response and adaptive sync.',
    description:
      'A fast IPS panel that works equally well for gaming and colour work, on a height-adjustable stand with pivot. Comes with DisplayPort and HDMI cables in the box.',
    specifications: {
      'Screen Size': '27 inch',
      'Resolution': '2560 × 1440 (QHD)',
      'Refresh Rate': '180 Hz',
      'Panel': 'Fast IPS',
      'Response Time': '1 ms GtG',
      'Colour': '120% sRGB, 10-bit',
      'Inputs': '2 × HDMI 2.0, 1 × DisplayPort 1.4, USB hub',
      'Stand': 'Height, tilt, swivel, pivot',
      'Warranty': '3 years'
    },
    stock: 7,
    sku: 'LUM-MON-V27',
    featured: true,
    newProduct: true,
    tags: ['monitor', '1440p', '180hz', 'ips']
  },
  {
    id: 'mon-002',
    name: 'Lumen Vista 24" FHD 100Hz Office Monitor',
    slug: 'lumen-vista-24-fhd-office',
    brand: 'Lumen',
    category: 'monitors',
    subcategory: 'Office Monitor',
    price: 469,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Slim-bezel 24" panel with VESA mounting and eye-care modes.',
    description:
      'A straightforward office display for desks and reception counters. Bulk pricing available for orders over ten units.',
    specifications: {
      'Screen Size': '23.8 inch',
      'Resolution': '1920 × 1080 (FHD)',
      'Refresh Rate': '100 Hz',
      'Panel': 'IPS',
      'Response Time': '5 ms',
      'Inputs': 'HDMI, DisplayPort, VGA',
      'VESA': '100 × 100 mm',
      'Warranty': '3 years'
    },
    stock: 32,
    sku: 'LUM-MON-V24',
    featured: false,
    newProduct: false,
    tags: ['monitor', 'office', '1080p']
  },
  {
    id: 'kb-001',
    name: 'ApexCore Strike 75% Hot-Swap Mechanical Keyboard',
    slug: 'apexcore-strike-75-mechanical-keyboard',
    brand: 'ApexCore',
    category: 'keyboards',
    subcategory: 'Mechanical Keyboard',
    price: 399,
    salePrice: 349,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Gasket-mounted 75% board, tri-mode wireless, hot-swap sockets.',
    description:
      'A gasket-mounted board with sound-damping foam, south-facing RGB and a rotary knob. Connects by USB-C, 2.4GHz dongle or Bluetooth to three devices.',
    specifications: {
      'Layout': '75% (82 keys)',
      'Switches': 'Linear, hot-swappable 5-pin',
      'Connectivity': 'USB-C, 2.4GHz, Bluetooth 5.2',
      'Keycaps': 'PBT double-shot',
      'Battery': '4000 mAh',
      'Mount': 'Gasket',
      'Extras': 'Rotary knob, south-facing RGB',
      'Warranty': '1 year'
    },
    stock: 20,
    sku: 'APX-KB-S75',
    featured: true,
    newProduct: true,
    tags: ['keyboard', 'mechanical', 'wireless', 'hot-swap']
  },
  {
    id: 'ms-001',
    name: 'ApexCore Glide Pro Wireless Gaming Mouse',
    slug: 'apexcore-glide-pro-wireless-mouse',
    brand: 'ApexCore',
    category: 'mice',
    subcategory: 'Gaming Mouse',
    price: 289,
    salePrice: 249,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '58 g shell, 26K sensor, 8K polling with the dongle.',
    description:
      'A lightweight symmetrical mouse with optical switches and PTFE feet. Charges over USB-C and holds roughly 90 hours on a full charge.',
    specifications: {
      'Weight': '58 g',
      'Sensor': '26,000 DPI optical',
      'Polling Rate': 'Up to 8,000 Hz',
      'Switches': 'Optical, 100M clicks',
      'Buttons': '6 programmable',
      'Battery': 'Up to 90 hours',
      'Connectivity': '2.4GHz, Bluetooth, USB-C',
      'Warranty': '1 year'
    },
    stock: 24,
    sku: 'APX-MS-GPRO',
    featured: false,
    newProduct: false,
    tags: ['mouse', 'wireless', 'lightweight', 'gaming']
  },
  {
    id: 'hs-001',
    name: 'Stratos Echo 7.1 Wireless Gaming Headset',
    slug: 'stratos-echo-71-wireless-headset',
    brand: 'Stratos',
    category: 'headsets',
    subcategory: 'Gaming Headset',
    price: 459,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '50 mm drivers, detachable boom mic, 40-hour battery.',
    description:
      'Memory-foam earcups and a suspension headband that stays comfortable over long sessions. Works wirelessly with PC and console, or wired over 3.5 mm.',
    specifications: {
      'Drivers': '50 mm neodymium',
      'Surround': 'Virtual 7.1 on PC',
      'Microphone': 'Detachable, noise-cancelling',
      'Battery': 'Up to 40 hours',
      'Connectivity': '2.4GHz USB-C dongle, Bluetooth, 3.5 mm',
      'Weight': '318 g',
      'Warranty': '1 year'
    },
    stock: 0,
    sku: 'STR-HS-E71',
    featured: false,
    newProduct: false,
    tags: ['headset', 'wireless', 'audio']
  },
  {
    id: 'net-001',
    name: 'Kestrel Mesh AX5400 Wi-Fi 6 Router (2-Pack)',
    slug: 'kestrel-mesh-ax5400-2-pack',
    brand: 'Kestrel',
    category: 'networking',
    subcategory: 'Mesh Wi-Fi',
    price: 899,
    salePrice: 799,
    images: [
      'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Covers a 3-bedroom villa with one seamless network.',
    description:
      'A two-node mesh kit that replaces the router supplied by your provider. Wired backhaul supported, and setup takes about ten minutes from the phone app.',
    specifications: {
      'Standard': 'Wi-Fi 6 (802.11ax)',
      'Speed': 'AX5400 dual-band',
      'Coverage': 'Up to 3,000 sq ft per node',
      'Ports': '1 × 2.5G WAN, 3 × 1G LAN per node',
      'Devices': '150+ concurrent',
      'Features': 'Guest network, parental controls, WPA3',
      'Warranty': '2 years'
    },
    stock: 10,
    sku: 'KST-NET-AX54',
    featured: false,
    newProduct: true,
    tags: ['router', 'wifi 6', 'mesh', 'networking']
  },
  {
    id: 'acc-001',
    name: 'Vertex 100W USB-C Docking Station, 11-in-1',
    slug: 'vertex-100w-usb-c-dock-11-in-1',
    brand: 'Vertex',
    category: 'accessories',
    subcategory: 'Docking Station',
    price: 349,
    salePrice: 299,
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: 'Dual 4K output, gigabit ethernet and 100W pass-through.',
    description:
      'Turns a single USB-C port into a full desk setup: two displays, wired network, card readers and charging for the laptop through the same cable.',
    specifications: {
      'Ports': '2 × HDMI 4K60, 1 × DisplayPort, 3 × USB-A, 1 × USB-C data',
      'Power Delivery': '100W pass-through',
      'Network': 'Gigabit Ethernet',
      'Card Readers': 'SD and microSD UHS-I',
      'Audio': '3.5 mm combo jack',
      'Housing': 'Aluminium',
      'Warranty': '2 years'
    },
    stock: 16,
    sku: 'VTX-ACC-DK11',
    featured: true,
    newProduct: false,
    tags: ['dock', 'usb-c', 'accessories', 'laptop']
  },
  {
    id: 'cool-001',
    name: 'Ironclad Frost 240 ARGB Liquid CPU Cooler',
    slug: 'ironclad-frost-240-argb-cooler',
    brand: 'Ironclad',
    category: 'cooling',
    subcategory: 'AIO Cooler',
    price: 429,
    salePrice: 379,
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=70',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=70'
    ],
    shortDescription: '240 mm radiator, 2 ARGB fans, brackets for all sockets.',
    description:
      'A quiet 240 mm all-in-one with a rotatable cap so the logo stays upright in any orientation. Includes mounting hardware for current AMD and Intel sockets.',
    specifications: {
      'Radiator': '240 mm aluminium',
      'Fans': '2 × 120 mm ARGB PWM',
      'Noise': 'Up to 28 dBA',
      'Pump Speed': '2,800 RPM',
      'Socket Support': 'SK-5, AM5, AM4, LGA1700, LGA1851',
      'Tube Length': '400 mm',
      'Warranty': '5 years'
    },
    stock: 13,
    sku: 'IRC-CLR-F240',
    featured: false,
    newProduct: false,
    tags: ['cooling', 'aio', 'liquid cooler']
  }
  {
  id: 'hp-001',                     // must be unique
  name: 'Hp EliteBook Ultra G1q8 AI Laptop',
  slug: 'Hp EliteBook Ultra',         // must be unique, lowercase, dashes only
  brand: 'HP',                   // must exist in the brands list in config.js
  category: 'laptops',        // must match a category slug in config.js
  price: 5469,                       // normal price in AED, VAT included
  salePrice: 4669,                   // discounted price, or null for no discount
  images: ['assets/images/products/HP_EliteBook_Ultra_G1q_AI_PC_14.webp'],
  shortDescription: 'HP EliteBook Ultra G1q 14 inch Touch Notebook Next Gen AI PC',
  description: 'Hp EliteBook Ultra G1q8 AI Laptop, Snapdragon X Plus X1P-42-100 Processor, 16 GB RAM, 512 GB SSD, 14" 2.2K Display, Windows 11 Pro, English Backlit Keyboard, 1 Year Warranty | 9M4E6AT',
  specifications: { 'Memory': '16GB , 512GB ', 'Warranty': '1 years' },
  stock: 5,                          // 0 shows "Out of stock" and blocks adding to cart
  sku: 'Hp Elitebook 9M4E6AT',
  featured: true,                    // shows on the homepage
  newProduct: true,                 // adds the "New" badge
  tags: ['laptop', 'elitebook']            // extra search keywords
},
];
