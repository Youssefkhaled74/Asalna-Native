const CART_KEY = 'asalna_cart';
const CUSTOMER_REF_KEY = 'asalna_customer_ref';
const LANG_KEY = 'asalna_lang';
const LOCAL_ORDERS_KEY = 'asalna_local_orders';
const LOCAL_ADMIN_KEY = 'asalna_local_admin';

const FILE_MODE = window.location.protocol === 'file:';
const IN_ADMIN = window.location.pathname.includes('/admin/');

const fallbackProducts = [
  {
    id: 1,
    slug: 'sidr-honey',
    name: 'Sidr Honey',
    nameAr: 'Ø¹Ø³Ù„ Ø³Ø¯Ø±',
    description: 'A rare Egyptian sidr harvest with deep body, resin warmth, and a luxurious finish built for slow tasting.',
    descriptionAr: 'Ø¹Ø³Ù„ Ø³Ø¯Ø± ÙØ§Ø®Ø± Ø¨Ø·Ø§Ø¨Ø¹ Ø¹Ù…ÙŠÙ‚ ÙˆØ¯ÙØ¡ Ø±Ø§ØªÙ†Ø¬ÙŠ ÙˆÙ†Ù‡Ø§ÙŠØ© ØºÙ†ÙŠØ© Ù„Ù„ØªØ°ÙˆÙ‚ Ø§Ù„Ù‡Ø§Ø¯Ø¦.',
    shortDescription: 'Dense, rare, gift-worthy sidr honey with a deep amber body.',
    shortDescriptionAr: 'Ø¹Ø³Ù„ Ø³Ø¯Ø± ÙƒØ«ÙŠÙ ÙˆÙ†Ø§Ø¯Ø± ÙˆÙ…Ù†Ø§Ø³Ø¨ Ù„Ù„Ù‡Ø¯Ø§ÙŠØ§ Ø¨Ù‚ÙˆØ§Ù… Ø¹Ù†Ø¨Ø±ÙŠ ØºÙ†ÙŠ.',
    price: 420,
    oldPrice: 480,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'Ø¹Ø³Ù„ ÙØ§Ø®Ø±',
    image: 'assets/images/sidr-honey.svg',
    imageAlt: 'Sidr honey jar',
    stock: 26,
    badge: 'Limited',
    rating: 4.9,
    origin: 'Siwa desert bloom',
    floralNotes: 'Resin, toasted blossom, warm wood',
    benefits: ['Raw energy', 'Dense spoon texture', 'Premium gifting appeal'],
    featured: true,
    bestSeller: true,
    rawLabel: true,
    organicLabel: true,
    limitedLabel: true
  },
  {
    id: 2,
    slug: 'clover-honey',
    name: 'Clover Honey',
    nameAr: 'Ø¹Ø³Ù„ Ø§Ù„Ø¨Ø±Ø³ÙŠÙ…',
    description: 'Silky clover honey with an airy floral aroma and clean sweetness made for breakfasts, pastries, and tea rituals.',
    descriptionAr: 'Ø¹Ø³Ù„ Ø¨Ø±Ø³ÙŠÙ… Ù†Ø§Ø¹Ù… Ø¨Ø±Ø§Ø¦Ø­Ø© Ø²Ù‡Ø±ÙŠØ© Ø®ÙÙŠÙØ© ÙˆØ­Ù„Ø§ÙˆØ© Ù†Ø¸ÙŠÙØ© Ù„Ù„ÙØ·ÙˆØ± ÙˆØ§Ù„Ù…Ø¹Ø¬Ù†Ø§Øª ÙˆØ§Ù„Ø´Ø§ÙŠ.',
    shortDescription: 'Lighter floral honey with a polished everyday finish.',
    shortDescriptionAr: 'Ø¹Ø³Ù„ Ø²Ù‡Ø±ÙŠ Ø£Ø®Ù Ø¨Ø·Ø§Ø¨Ø¹ ÙŠÙˆÙ…ÙŠ Ø£Ù†ÙŠÙ‚.',
    price: 220,
    oldPrice: 260,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'Ø¹Ø³Ù„ ÙØ§Ø®Ø±',
    image: 'assets/images/raw-honey.svg',
    imageAlt: 'Clover honey jar',
    stock: 40,
    badge: 'Raw',
    rating: 4.7,
    origin: 'Nile Delta clover fields',
    floralNotes: 'White blossom, soft hay, vanilla',
    benefits: ['Daily sweetness', 'Breakfast pairing', 'Silky texture'],
    featured: true,
    bestSeller: false,
    rawLabel: true,
    organicLabel: true,
    limitedLabel: false
  },
  {
    id: 3,
    slug: 'black-seed-honey',
    name: 'Black Seed Honey',
    nameAr: 'Ø¹Ø³Ù„ Ø§Ù„Ø­Ø¨Ø© Ø§Ù„Ø³ÙˆØ¯Ø§Ø¡',
    description: 'A darker wellness-led blend where pure honey meets black seed character for a bold spoon.',
    descriptionAr: 'Ø®Ù„Ø·Ø© Ø£Ø¹Ù…Ù‚ Ø¨Ø·Ø§Ø¨Ø¹ ØµØ­ÙŠ ØªØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø¹Ø³Ù„ Ø§Ù„Ù†Ù‚ÙŠ ÙˆØ§Ù„Ø­Ø¨Ø© Ø§Ù„Ø³ÙˆØ¯Ø§Ø¡ Ù„Ù†ÙƒÙ‡Ø© Ø¬Ø±ÙŠØ¦Ø©.',
    shortDescription: 'Powerful blend with a deeper aromatic edge.',
    shortDescriptionAr: 'Ø®Ù„Ø·Ø© Ù‚ÙˆÙŠØ© Ø¨Ø·Ø§Ø¨Ø¹ Ø¹Ø·Ø±ÙŠ Ø£Ø¹Ù…Ù‚.',
    price: 310,
    oldPrice: null,
    categoryId: 2,
    category: 'Honey Blends',
    categoryAr: 'Ø®Ù„Ø·Ø§Øª Ø§Ù„Ø¹Ø³Ù„',
    image: 'assets/images/black-seed-honey.svg',
    imageAlt: 'Black seed honey jar',
    stock: 28,
    badge: 'Organic',
    rating: 4.8,
    origin: 'Upper Egypt black seed farms',
    floralNotes: 'Warm spice, dry herbs, roasted depth',
    benefits: ['Balanced warmth', 'Wellness profile', 'Distinctive flavor'],
    featured: true,
    bestSeller: true,
    rawLabel: false,
    organicLabel: true,
    limitedLabel: false
  },
  {
    id: 4,
    slug: 'mountain-honey',
    name: 'Mountain Honey',
    nameAr: 'Ø¹Ø³Ù„ Ø¬Ø¨Ù„ÙŠ',
    description: 'Harvested from elevated wildflower zones for a layered mineral profile and darker sweetness.',
    descriptionAr: 'Ù…Ø­ØµÙˆÙ„ Ù…Ù† Ø§Ù„Ø²Ù‡ÙˆØ± Ø§Ù„Ø¬Ø¨Ù„ÙŠØ© Ø¨Ø·Ø¨Ù‚Ø§Øª Ù…Ø¹Ø¯Ù†ÙŠØ© Ø£ÙˆØ¶Ø­ ÙˆØ­Ù„Ø§ÙˆØ© Ø£ØºÙ…Ù‚.',
    shortDescription: 'Earthy, mineral-rich mountain harvest.',
    shortDescriptionAr: 'Ù…Ø­ØµÙˆÙ„ Ø¬Ø¨Ù„ÙŠ ØºÙ†ÙŠ Ø¨Ø§Ù„Ù…Ø¹Ø§Ø¯Ù† ÙˆØ·Ø§Ø¨Ø¹ Ø£Ø±Ø¶ÙŠ.',
    price: 295,
    oldPrice: 340,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'Ø¹Ø³Ù„ ÙØ§Ø®Ø±',
    image: 'assets/images/mountain-honey.svg',
    imageAlt: 'Mountain honey jar',
    stock: 22,
    badge: 'Best Seller',
    rating: 4.9,
    origin: 'South Sinai heights',
    floralNotes: 'Wild thyme, stone fruit, cedar',
    benefits: ['Mineral depth', 'Cold extracted', 'Long finish'],
    featured: true,
    bestSeller: true,
    rawLabel: true,
    organicLabel: false,
    limitedLabel: false
  },
  {
    id: 5,
    slug: 'citrus-blossom-honey',
    name: 'Citrus Blossom Honey',
    nameAr: 'Ø¹Ø³Ù„ Ø²Ù‡Ø± Ø§Ù„Ø­Ù…Ø¶ÙŠØ§Øª',
    description: 'Bright citrus blossom honey with a lifted aroma and a refined finish that feels crisp rather than sugary.',
    descriptionAr: 'Ø¹Ø³Ù„ Ø²Ù‡Ø± Ø­Ù…Ø¶ÙŠØ§Øª Ø¨Ø±Ø§Ø¦Ø­Ø© Ù…Ù†Ø¹Ø´Ø© ÙˆÙ†Ù‡Ø§ÙŠØ© Ø±Ø§Ù‚ÙŠØ© ÙˆØ®ÙÙŠÙØ©.',
    shortDescription: 'Fresh blossom honey with a bright aromatic lift.',
    shortDescriptionAr: 'Ø¹Ø³Ù„ Ø²Ù‡ÙˆØ± Ù…Ù†Ø¹Ø´ Ø¨Ø·Ø§Ø¨Ø¹ Ø¹Ø·Ø±ÙŠ Ù…Ø´Ø±Ù‚.',
    price: 245,
    oldPrice: null,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'Ø¹Ø³Ù„ ÙØ§Ø®Ø±',
    image: 'assets/images/citrus-honey.svg',
    imageAlt: 'Citrus blossom honey jar',
    stock: 35,
    badge: 'Fresh Drop',
    rating: 4.8,
    origin: 'Sharqia citrus groves',
    floralNotes: 'Orange flower, zest, white tea',
    benefits: ['Fresh aroma', 'Soft sweetness', 'Versatile pairing'],
    featured: false,
    bestSeller: false,
    rawLabel: true,
    organicLabel: true,
    limitedLabel: false
  },
  {
    id: 6,
    slug: 'royal-honey-mix',
    name: 'Royal Honey Mix',
    nameAr: 'Ø±ÙˆÙŠØ§Ù„ Ù‡Ø§Ù†ÙŠ Ù…ÙŠÙƒØ³',
    description: 'A ceremonial spoon blending premium honey with royal-style fortifying ingredients.',
    descriptionAr: 'Ø®Ù„Ø·Ø© ÙØ§Ø®Ø±Ø© ØªÙ…Ø²Ø¬ Ø§Ù„Ø¹Ø³Ù„ Ø§Ù„Ù…Ù…ØªØ§Ø² Ø¨Ù…ÙƒÙˆÙ†Ø§Øª Ù…Ù„ÙƒÙŠØ© Ø¨Ø·Ø§Ø¨Ø¹ Ø§Ø­ØªÙØ§Ù„ÙŠ.',
    shortDescription: 'Dense blend designed for focused daily rituals.',
    shortDescriptionAr: 'Ø®Ù„Ø·Ø© ÙƒØ«ÙŠÙØ© Ù„Ø±ÙˆØªÙŠÙ† ÙŠÙˆÙ…ÙŠ ÙØ§Ø®Ø±.',
    price: 520,
    oldPrice: 590,
    categoryId: 2,
    category: 'Honey Blends',
    categoryAr: 'Ø®Ù„Ø·Ø§Øª Ø§Ù„Ø¹Ø³Ù„',
    image: 'assets/images/hero-honey.svg',
    imageAlt: 'Royal honey mix',
    stock: 18,
    badge: 'Premium',
    rating: 4.9,
    origin: 'Curated Egyptian blend',
    floralNotes: 'Dark blossom, pollen, date molasses',
    benefits: ['Luxury blend', 'Dense texture', 'Gift ready'],
    featured: false,
    bestSeller: true,
    rawLabel: false,
    organicLabel: true,
    limitedLabel: true
  },
  {
    id: 7,
    slug: 'honeycomb-box',
    name: 'Honeycomb Edition',
    nameAr: 'Ø´Ù…Ø¹ Ø§Ù„Ø¹Ø³Ù„',
    description: 'Cut honeycomb presented like an edible jewel with natural drip and bold texture.',
    descriptionAr: 'Ø´Ù…Ø¹ Ø¹Ø³Ù„ Ù…Ù‚Ø·ÙˆØ¹ Ø¨ØªÙ‚Ø¯ÙŠÙ… ÙØ§Ø®Ø± ÙˆÙ…Ù„Ù…Ø³ Ø·Ø¨ÙŠØ¹ÙŠ ÙˆØ§Ø¶Ø­.',
    shortDescription: 'Raw honeycomb for premium serving and hosting.',
    shortDescriptionAr: 'Ø´Ù…Ø¹ Ø¹Ø³Ù„ Ø®Ø§Ù… Ù„Ù„ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„ÙØ§Ø®Ø± ÙˆØ§Ù„Ø§Ø³ØªØ¶Ø§ÙØ©.',
    price: 390,
    oldPrice: null,
    categoryId: 3,
    category: 'Gift Editions',
    categoryAr: 'Ù‡Ø¯Ø§ÙŠØ§ Ø£ØµÙ„Ù†Ø§',
    image: 'assets/images/hero-honey.svg',
    imageAlt: 'Honeycomb box',
    stock: 14,
    badge: 'Raw',
    rating: 4.8,
    origin: 'Canal-side apiaries',
    floralNotes: 'Wax cell, bright nectar, warm pollen',
    benefits: ['Raw comb texture', 'Hosting centerpiece', 'Premium plating'],
    featured: false,
    bestSeller: false,
    rawLabel: true,
    organicLabel: true,
    limitedLabel: true
  },
  {
    id: 8,
    slug: 'asalna-gift-box',
    name: 'Asalna Gift Box',
    nameAr: 'Ø¨ÙˆÙƒØ³ Ø£ØµÙ„Ù†Ø§',
    description: 'A curated gift edition with signature jars arranged in an artful premium box.',
    descriptionAr: 'Ø¨ÙˆÙƒØ³ Ù‡Ø¯Ø§ÙŠØ§ Ù…Ø®ØªØ§Ø± Ø¨Ø¹Ù†Ø§ÙŠØ© ÙŠØ¶Ù… Ø¨Ø±Ø·Ù…Ø§Ù†Ø§Øª Ø£ØµÙ„Ù†Ø§ ÙÙŠ ØªÙ‚Ø¯ÙŠÙ… ÙÙ†ÙŠ ÙØ§Ø®Ø±.',
    shortDescription: 'Curated honey gift set with premium presentation.',
    shortDescriptionAr: 'Ø¨ÙˆÙƒØ³ Ù‡Ø¯Ø§ÙŠØ§ Ø¹Ø³Ù„ Ø¨ØªÙ‚Ø¯ÙŠÙ… ÙØ§Ø®Ø±.',
    price: 890,
    oldPrice: 980,
    categoryId: 3,
    category: 'Gift Editions',
    categoryAr: 'Ù‡Ø¯Ø§ÙŠØ§ Ø£ØµÙ„Ù†Ø§',
    image: 'assets/images/facebook-cover.png',
    imageAlt: 'Asalna premium gift box',
    stock: 10,
    badge: 'Limited',
    rating: 5,
    origin: 'Curated across Egypt',
    floralNotes: 'Mixed floral library',
    benefits: ['Premium gifting', 'Curated selection', 'Memorable unboxing'],
    featured: true,
    bestSeller: true,
    rawLabel: false,
    organicLabel: false,
    limitedLabel: true
  }
];

const state = {
  basePath: IN_ADMIN ? '..' : '.',
  cart: loadCart(),
  lang: localStorage.getItem(LANG_KEY) || 'en'
};

function normalizeProduct(product) {
  return {
    ...product,
    image: FILE_MODE && !String(product.image).startsWith('http') ? imagePath(product.image) : product.image
  };
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function localProducts() {
  return readJson('asalna_local_products', fallbackProducts).map(normalizeProduct);
}

function saveLocalProducts(products) {
  writeJson('asalna_local_products', products);
}

function localOrders() {
  return readJson(LOCAL_ORDERS_KEY, []);
}

function saveLocalOrders(orders) {
  writeJson(LOCAL_ORDERS_KEY, orders);
}

function localAdmin() {
  return readJson(LOCAL_ADMIN_KEY, null);
}

function saveLocalAdmin(admin) {
  if (!admin) localStorage.removeItem(LOCAL_ADMIN_KEY);
  else writeJson(LOCAL_ADMIN_KEY, admin);
}

function createOrderNumber() {
  return `AS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function imagePath(src) {
  const clean = String(src || '').replace(/^\/+/, '');
  return IN_ADMIN ? `../${clean}` : `./${clean}`;
}

function fallbackResponse(data) {
  return Promise.resolve(data);
}

async function localApi(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const payload = options.body ? JSON.parse(options.body) : {};

  if (path === '/api/products' && method === 'GET') {
    return fallbackResponse({ products: localProducts() });
  }

  if (/^\/api\/products\/\d+$/.test(path) && method === 'GET') {
    const id = Number(path.split('/').pop());
    const products = localProducts();
    const product = products.find((item) => item.id === id);
    if (!product) throw new Error('Product not found');
    const relatedProducts = products.filter((item) => item.categoryId === product.categoryId && item.id !== id).slice(0, 4);
    return fallbackResponse({ product, relatedProducts });
  }

  if (path === '/api/orders' && method === 'POST') {
    const products = localProducts();
    const orders = localOrders();
    const items = (payload.items || []).map((entry) => {
      const product = products.find((item) => item.id === Number(entry.productId));
      const quantity = Math.max(1, Number(entry.quantity || 1));
      if (!product) throw new Error('Product not found');
      return {
        product_id: product.id,
        product_name: product.name,
        product_image: product.image,
        quantity,
        unit_price: product.price,
        line_total: product.price * quantity
      };
    });
    const subtotal = items.reduce((sum, item) => sum + item.line_total, 0);
    const shipping = subtotal >= 700 ? 0 : 65;
    const discount = payload.couponCode && String(payload.couponCode).trim().toUpperCase() === 'ASALNA10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping - discount;
    const customerRef = payload.customerRef || `customer_${Math.random().toString(36).slice(2, 12)}`;
    const order = {
      id: Date.now(),
      order_number: createOrderNumber(),
      customer_ref: customerRef,
      customer_name: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      notes: payload.notes || '',
      delivery_method: payload.deliveryMethod,
      payment_method: payload.paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      status: 'pending',
      created_at: new Date().toISOString(),
      items
    };
    orders.unshift(order);
    saveLocalOrders(orders);
    return fallbackResponse({
      success: true,
      customerRef,
      orderNumber: order.order_number,
      orderId: order.id,
      redirect: `./orders.html?ref=${encodeURIComponent(customerRef)}`
    });
  }

  if (path.startsWith('/api/orders?') && method === 'GET') {
    const url = new URL(path, 'https://asalna.local');
    const ref = url.searchParams.get('ref');
    const orders = localOrders().filter((order) => order.customer_ref === ref);
    return fallbackResponse({ orders, customerRef: ref });
  }

  if (path === '/api/admin/login' && method === 'POST') {
    if (payload.username !== 'admin' || payload.password !== 'asalnaadmin') throw new Error('Invalid credentials');
    const user = { username: 'admin', displayName: 'Asalna Admin' };
    saveLocalAdmin(user);
    return fallbackResponse({ success: true, user });
  }

  if (path === '/api/admin/logout' && method === 'POST') {
    saveLocalAdmin(null);
    return fallbackResponse({ success: true });
  }

  if (path === '/api/admin/me' && method === 'GET') {
    const user = localAdmin();
    if (!user) throw new Error('Unauthorized');
    return fallbackResponse({ user });
  }

  if (path === '/api/admin/summary' && method === 'GET') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const orders = localOrders();
    const products = localProducts();
    return fallbackResponse({
      totalOrders: orders.length,
      pendingOrders: orders.filter((order) => order.status === 'pending').length,
      revenue: orders.filter((order) => order.status !== 'cancelled').reduce((sum, order) => sum + order.total, 0),
      productsCount: products.length,
      recentOrders: orders.slice(0, 5)
    });
  }

  if (path === '/api/admin/orders' && method === 'GET') {
    if (!localAdmin()) throw new Error('Unauthorized');
    return fallbackResponse({ orders: localOrders() });
  }

  if (/^\/api\/admin\/orders\/\d+$/.test(path) && method === 'GET') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const id = Number(path.split('/').pop());
    const order = localOrders().find((item) => item.id === id);
    if (!order) throw new Error('Order not found');
    return fallbackResponse({ order });
  }

  if (/^\/api\/admin\/orders\/\d+\/status$/.test(path) && method === 'PATCH') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const id = Number(path.split('/')[4]);
    const orders = localOrders().map((order) => order.id === id ? { ...order, status: payload.status } : order);
    saveLocalOrders(orders);
    return fallbackResponse({ success: true });
  }

  if (path === '/api/admin/products' && method === 'GET') {
    if (!localAdmin()) throw new Error('Unauthorized');
    return fallbackResponse({ products: localProducts() });
  }

  if (path === '/api/admin/products' && method === 'POST') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const products = localProducts();
    const newProduct = normalizeProduct({
      ...payload,
      id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1,
      category: payload.category || 'Signature Honey',
      categoryAr: payload.categoryAr || 'Ø¹Ø³Ù„ ÙØ§Ø®Ø±'
    });
    products.push(newProduct);
    saveLocalProducts(products);
    return fallbackResponse({ success: true, id: newProduct.id });
  }

  if (/^\/api\/admin\/products\/\d+$/.test(path) && method === 'PUT') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const id = Number(path.split('/').pop());
    const products = localProducts().map((product) => product.id === id ? normalizeProduct({ ...product, ...payload, id }) : product);
    saveLocalProducts(products);
    return fallbackResponse({ success: true });
  }

  if (/^\/api\/admin\/products\/\d+$/.test(path) && method === 'DELETE') {
    if (!localAdmin()) throw new Error('Unauthorized');
    const id = Number(path.split('/').pop());
    saveLocalProducts(localProducts().filter((product) => product.id !== id));
    return fallbackResponse({ success: true });
  }

  throw new Error('Unsupported local mode action');
}

async function api(path, options = {}) {
  if (FILE_MODE) {
    return localApi(path, options);
  }

  try {
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      credentials: 'include',
      ...options
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  } catch (error) {
    return localApi(path, options);
  }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  state.cart = cart;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function addToCart(product, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find((item) => item.productId === product.id);
  const safeProduct = normalizeProduct(product);
  if (existing) existing.quantity += quantity;
  else cart.push({ productId: safeProduct.id, quantity, product: safeProduct });
  saveCart(cart);
}

function updateCartItem(productId, quantity) {
  const cart = loadCart().map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
  saveCart(cart);
}

function removeCartItem(productId) {
  saveCart(loadCart().filter((item) => item.productId !== productId));
}

function clearCart() {
  saveCart([]);
}

function getCustomerRef() {
  return localStorage.getItem(CUSTOMER_REF_KEY) || '';
}

function setCustomerRef(ref) {
  localStorage.setItem(CUSTOMER_REF_KEY, ref);
}

function updateCartBadges() {
  const count = loadCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
  });
}

function money(value) {
  return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function statusClass(status) {
  return `status-${status}`;
}

function toast(message, tone = 'default') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const node = document.createElement('div');
  node.className = 'toast';
  node.style.border = tone === 'error' ? '1px solid rgba(177,77,54,.4)' : '1px solid rgba(255,255,255,.08)';
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2800);
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function pageUrl(file) {
  return IN_ADMIN ? `../${file}` : `./${file}`;
}

function assetUrl(file) {
  return imagePath(`assets/images/${file}`);
}


const page = document.body.dataset.page;

async function requireAdmin() {
  try {
    const data = await api('/api/admin/me');
    return data.user;
  } catch (error) {
    if (page === 'admin-dashboard') location.href = './login.html';
    return null;
  }
}

function loginMarkup() {
  return `<section class="not-found"><div class="container"><div class="form-shell" style="max-width:520px;margin:auto;padding:28px;border-radius:34px;"><div class="kicker">Admin</div><h1 class="title-lg">Asalna dashboard access</h1><form id="admin-login" class="stack"><input class="input" name="username" placeholder="Username" required><input class="input" type="password" name="password" placeholder="Password" required><button class="btn" type="submit">Login</button></form><p class="copy">Default: admin / asalnaadmin</p></div></div></section>`;
}

async function renderLogin() {
  document.querySelector('[data-page-root]').innerHTML = loginMarkup();
  document.getElementById('admin-login').addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify(payload) });
      location.href = './dashboard.html';
    } catch (error) {
      toast(error.message, 'error');
    }
  });
}

function productForm(product = {}) {
  return `<form id="product-form" class="form-grid"><div class="field"><label>Name</label><input class="input" name="name" value="${product.name || ''}" required></div><div class="field"><label>Arabic name</label><input class="input" name="nameAr" value="${product.nameAr || ''}"></div><div class="field full"><label>Description</label><textarea class="textarea" name="description" rows="4" required>${product.description || ''}</textarea></div><div class="field full"><label>Short description</label><input class="input" name="shortDescription" value="${product.shortDescription || ''}" required></div><div class="field"><label>Price</label><input class="input" name="price" type="number" value="${product.price || ''}" required></div><div class="field"><label>Old price</label><input class="input" name="oldPrice" type="number" value="${product.oldPrice || ''}"></div><div class="field"><label>Category id</label><input class="input" name="categoryId" type="number" value="${product.categoryId || 1}" required></div><div class="field"><label>Image path</label><input class="input" name="image" value="${product.image || '/assets/images/raw-honey.svg'}" required></div><div class="field"><label>Stock</label><input class="input" name="stock" type="number" value="${product.stock || 0}" required></div><div class="field"><label>Badge</label><input class="input" name="badge" value="${product.badge || ''}"></div><div class="field"><label>Rating</label><input class="input" name="rating" type="number" step="0.1" value="${product.rating || 4.8}" required></div><div class="field"><label>Origin</label><input class="input" name="origin" value="${product.origin || ''}"></div><div class="field"><label>Floral notes</label><input class="input" name="floralNotes" value="${product.floralNotes || ''}"></div><div class="field full"><label>Benefits (comma separated)</label><input class="input" name="benefits" value="${(product.benefits || []).join(', ')}"></div><div class="field"><label><input type="checkbox" name="featured" ${product.featured ? 'checked' : ''}> Featured</label></div><div class="field"><label><input type="checkbox" name="bestSeller" ${product.bestSeller ? 'checked' : ''}> Best seller</label></div><div class="field"><label><input type="checkbox" name="rawLabel" ${product.rawLabel ? 'checked' : ''}> Raw</label></div><div class="field"><label><input type="checkbox" name="organicLabel" ${product.organicLabel ? 'checked' : ''}> Organic</label></div><div class="field"><label><input type="checkbox" name="limitedLabel" ${product.limitedLabel ? 'checked' : ''}> Limited</label></div><div class="field full"><button class="btn" type="submit">Save product</button></div></form>`;
}

async function renderDashboard() {
  const user = await requireAdmin();
  if (!user) return;
  const [summary, ordersData, productsData] = await Promise.all([api('/api/admin/summary'), api('/api/admin/orders'), api('/api/admin/products')]);
  document.querySelector('[data-page-root]').innerHTML = `<section class="section"><div class="container admin-layout"><aside class="admin-nav panel"><div class="kicker">Dashboard</div><h2 class="title-md">${user.displayName}</h2><div class="stack"><button class="btn-secondary" data-open-create>New product</button><button class="btn-secondary" data-logout>Logout</button></div></aside><div class="stack"><div class="admin-grid">${[{ label: 'Total orders', value: summary.totalOrders }, { label: 'Pending', value: summary.pendingOrders }, { label: 'Revenue', value: money(summary.revenue) }, { label: 'Products', value: summary.productsCount }].map((card) => `<div class="stat-card reveal"><div class="kicker">${card.label}</div><h3>${card.value}</h3></div>`).join('')}</div><div class="table-shell panel"><table><thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th><th>Date</th><th>Action</th></tr></thead><tbody>${ordersData.orders.map((order) => `<tr><td>${order.order_number}</td><td>${order.customer_name}</td><td><span class="${'status-' + order.status}">${order.status}</span></td><td>${money(order.total)}</td><td>${new Date(order.created_at).toLocaleDateString()}</td><td><button class="btn-secondary" data-view-order="${order.id}">View</button></td></tr>`).join('')}</tbody></table></div><div class="table-shell panel"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Badge</th><th>Action</th></tr></thead><tbody>${productsData.products.map((product) => `<tr><td>${product.name}</td><td>${product.category}</td><td>${money(product.price)}</td><td>${product.stock}</td><td>${product.badge || '-'}</td><td><div class="inline-fields"><button class="btn-secondary" data-edit-product="${product.id}">Edit</button><button class="btn-secondary" data-delete-product="${product.id}">Delete</button></div></td></tr>`).join('')}</tbody></table></div></div></div></section><div class="modal" data-admin-modal><div class="modal-card"><div data-modal-content></div></div></div>`;

  const modal = document.querySelector('[data-admin-modal]');
  const content = document.querySelector('[data-modal-content]');
  const openModal = (html) => { content.innerHTML = html; modal.classList.add('open'); };
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('open'); });

  document.querySelector('[data-logout]').onclick = async () => { await api('/api/admin/logout', { method: 'POST' }); location.href = './login.html'; };
  document.querySelector('[data-open-create]').onclick = () => { openModal(`<h2 class="title-md">Create product</h2>${productForm()}`); bindProductForm(); };

  document.querySelectorAll('[data-view-order]').forEach((button) => button.onclick = async () => {
    const data = await api(`/api/admin/orders/${button.dataset.viewOrder}`);
    const order = data.order;
    openModal(`<h2 class="title-md">${order.order_number}</h2><div class="stack"><p><strong>${order.customer_name}</strong><br>${order.phone}<br>${order.address}, ${order.city}</p><select class="select" id="order-status">${['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => `<option value="${status}" ${status === order.status ? 'selected' : ''}>${status}</option>`).join('')}</select><button class="btn" id="save-status">Save status</button>${order.items.map((item) => `<div class="summary-row"><span>${item.product_name} × ${item.quantity}</span><strong>${money(item.line_total)}</strong></div>`).join('')}</div>`);
    document.getElementById('save-status').onclick = async () => { await api(`/api/admin/orders/${order.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: document.getElementById('order-status').value }) }); location.reload(); };
  });

  document.querySelectorAll('[data-edit-product]').forEach((button) => button.onclick = () => {
    const product = productsData.products.find((item) => item.id === Number(button.dataset.editProduct));
    openModal(`<h2 class="title-md">Edit product</h2>${productForm(product)}`);
    bindProductForm(product.id);
  });

  document.querySelectorAll('[data-delete-product]').forEach((button) => button.onclick = async () => {
    if (!confirm('Delete this product?')) return;
    await api(`/api/admin/products/${button.dataset.deleteProduct}`, { method: 'DELETE' });
    location.reload();
  });

  function bindProductForm(productId = null) {
    document.getElementById('product-form').onsubmit = async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload = Object.fromEntries(form.entries());
      payload.benefits = String(payload.benefits || '').split(',').map((item) => item.trim()).filter(Boolean);
      ['featured', 'bestSeller', 'rawLabel', 'organicLabel', 'limitedLabel'].forEach((key) => { payload[key] = form.get(key) === 'on'; });
      payload.slug = String(payload.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await api(productId ? `/api/admin/products/${productId}` : '/api/admin/products', { method: productId ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      location.reload();
    };
  }
}

if (page === 'admin-login') renderLogin();
if (page === 'admin-dashboard') renderDashboard();

