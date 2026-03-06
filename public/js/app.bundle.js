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
let productsCache = [];

const copy = {
  en: {
    brandTag: 'Honey with presence', navHome: 'Home', navShop: 'Shop', navAbout: 'About', navContact: 'Contact', navOrders: 'Orders', navAdmin: 'Admin', shopNow: 'Shop the harvest', heroKicker: 'Luxury honey house from Egypt', heroTitle: 'Asalna pours Egyptian warmth into a premium modern ritual.', heroText: 'Built like an editorial fragrance brand rather than a commodity shop, Asalna turns every jar into a sensory object with origin, texture, and emotional weight.', heroStat1: 'Distinct harvests', heroStat2: 'Craft batches', heroStat3: 'Gift-ready presence', featured: 'Featured products', categories: 'Category highlights', bestSellers: 'Best sellers', whyTitle: 'Crafted to feel as rich as it tastes.', whyText: 'Every detail, from the glow of the palette to the layered product cards, is designed to hold premium attention and convert with confidence.', trust: 'Trust indicators', story: 'Origin and craftsmanship', testimonials: 'Client notes', gallery: 'Visual journal', newsletter: 'Join the Asalna list', footerText: 'A premium Egyptian honey house shaped by sunlight, flora, and craft.', add: 'Add to cart', details: 'Details', quickView: 'Quick view', search: 'Search products', category: 'Category', sort: 'Sort', all: 'All', featuredSort: 'Featured', latestSort: 'Latest', priceLow: 'Price low-high', priceHigh: 'Price high-low', ratingSort: 'Top rated', minPrice: 'Min price', maxPrice: 'Max price', emptyCart: 'Your cart is empty.', checkout: 'Checkout', cart: 'Cart', subtotal: 'Subtotal', shipping: 'Shipping', discount: 'Discount', total: 'Total', coupon: 'Coupon', apply: 'Apply', proceed: 'Proceed to checkout', orderSuccess: 'Order placed successfully.', related: 'Related products', floralNotes: 'Floral notes', origin: 'Origin', benefits: 'Benefits', quantity: 'Quantity', placeOrder: 'Place order', deliveryMethod: 'Delivery method', paymentMethod: 'Payment method', orderSummary: 'Order summary', ordersTitle: 'Your Asalna orders', trackHint: 'Every placed order is saved in SQLite and follows its status here.', adminTitle: 'Admin dashboard', login: 'Admin login', logout: 'Logout', save: 'Save', delete: 'Delete', edit: 'Edit'
  },
  ar: {
    brandTag: 'عسل له حضور', navHome: 'الرئيسية', navShop: 'المتجر', navAbout: 'عن أصلنا', navContact: 'تواصل', navOrders: 'طلباتي', navAdmin: 'الإدارة', shopNow: 'تسوق المحصول', heroKicker: 'بيت عسل فاخر من مصر', heroTitle: 'أصلنا يحول دفء مصر إلى طقس فاخر يومي.', heroText: 'بدل شكل متجر تقليدي، أصلنا يتعامل مع كل برطمان كأنه قطعة حسية لها مصدر وشخصية وقيمة بصرية عالية.', heroStat1: 'محاصيل مميزة', heroStat2: 'دفعات حرفية', heroStat3: 'جاهز للهدايا', featured: 'منتجات مميزة', categories: 'فئات أصلنا', bestSellers: 'الأكثر طلبًا', whyTitle: 'مصمم ليبدو غنيًا بقدر طعمه.', whyText: 'كل تفصيلة، من دفء الألوان إلى طبقات الكروت، هدفها تثبيت صورة البراند ورفع الثقة والتحويل.', trust: 'عناصر الثقة', story: 'المصدر والحرفة', testimonials: 'آراء العملاء', gallery: 'يوميات بصرية', newsletter: 'انضم لقائمة أصلنا', footerText: 'بيت عسل مصري فاخر يتشكل من الشمس والزهور والحرفة.', add: 'أضف للسلة', details: 'التفاصيل', quickView: 'عرض سريع', search: 'ابحث عن منتج', category: 'الفئة', sort: 'الترتيب', all: 'الكل', featuredSort: 'مميز', latestSort: 'الأحدث', priceLow: 'السعر من الأقل', priceHigh: 'السعر من الأعلى', ratingSort: 'الأعلى تقييمًا', minPrice: 'أقل سعر', maxPrice: 'أعلى سعر', emptyCart: 'السلة فارغة.', checkout: 'إتمام الطلب', cart: 'السلة', subtotal: 'الإجمالي الفرعي', shipping: 'الشحن', discount: 'الخصم', total: 'الإجمالي', coupon: 'كوبون', apply: 'تطبيق', proceed: 'المتابعة للدفع', orderSuccess: 'تم إنشاء الطلب بنجاح.', related: 'منتجات مشابهة', floralNotes: 'النوتات الزهرية', origin: 'المصدر', benefits: 'الفوائد', quantity: 'الكمية', placeOrder: 'تأكيد الطلب', deliveryMethod: 'طريقة التوصيل', paymentMethod: 'طريقة الدفع', orderSummary: 'ملخص الطلب', ordersTitle: 'طلباتك من أصلنا', trackHint: 'كل طلب يتم حفظه في SQLite ويظهر هنا بحالته الحالية.', adminTitle: 'لوحة الإدارة', login: 'دخول الإدارة', logout: 'تسجيل الخروج', save: 'حفظ', delete: 'حذف', edit: 'تعديل'
  }
};

function t(key) { return copy[state.lang][key] || copy.en[key] || key; }
function langProduct(product, field) { return state.lang === 'ar' && product[`${field}Ar`] ? product[`${field}Ar`] : product[field]; }
function setDocumentLanguage() { setLanguage(state.lang); }

function navMarkup() {
  return `
    <header class="topbar">
      <div class="nav-shell">
        <a class="brand" href="${pageUrl('index.html')}">
          <img src="${assetUrl('black.png')}" alt="Asalna logo">
          <div class="brand-text"><strong>ASALNA</strong><span>${t('brandTag')}</span></div>
        </a>
        <nav class="nav-links">
          <a class="nav-link ${page === 'home' ? 'active' : ''}" href="${pageUrl('index.html')}">${t('navHome')}</a>
          <a class="nav-link ${page === 'shop' || page === 'product' ? 'active' : ''}" href="${pageUrl('shop.html')}">${t('navShop')}</a>
          <a class="nav-link ${page === 'about' ? 'active' : ''}" href="${pageUrl('about.html')}">${t('navAbout')}</a>
          <a class="nav-link ${page === 'contact' ? 'active' : ''}" href="${pageUrl('contact.html')}">${t('navContact')}</a>
          <a class="nav-link ${page === 'orders' ? 'active' : ''}" href="${pageUrl('orders.html')}">${t('navOrders')}</a>
        </nav>
        <div class="nav-actions">
          <button class="lang-toggle" data-lang-toggle>${state.lang === 'ar' ? 'EN' : 'AR'}</button>
          <a class="nav-link ${page === 'cart' ? 'active' : ''}" href="${pageUrl('cart.html')}">${t('cart')} <span class="nav-badge" data-cart-count>0</span></a>
          <a class="btn" href="${pageUrl('shop.html')}">${t('shopNow')}</a>
          <button class="nav-toggle" data-nav-toggle>☰</button>
        </div>
      </div>
      <div class="mobile-menu hidden" data-mobile-menu>
        <a class="nav-link" href="${pageUrl('index.html')}">${t('navHome')}</a>
        <a class="nav-link" href="${pageUrl('shop.html')}">${t('navShop')}</a>
        <a class="nav-link" href="${pageUrl('about.html')}">${t('navAbout')}</a>
        <a class="nav-link" href="${pageUrl('contact.html')}">${t('navContact')}</a>
        <a class="nav-link" href="${pageUrl('orders.html')}">${t('navOrders')}</a>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="section">
      <div class="container footer-shell">
        <div class="footer-grid">
          <div><div class="brand"><img src="${assetUrl('black.png')}" alt="Asalna logo"><div class="brand-text"><strong>ASALNA</strong><span>${t('brandTag')}</span></div></div><p class="footer-note">${t('footerText')}</p></div>
          <div><div class="kicker">Navigate</div><div class="footer-links"><a href="${pageUrl('shop.html')}">${t('navShop')}</a><a href="${pageUrl('about.html')}">${t('navAbout')}</a><a href="${pageUrl('orders.html')}">${t('navOrders')}</a></div></div>
          <div><div class="kicker">Contact</div><div class="footer-links"><span>hello@asalna.com</span><span>+20 100 000 0000</span><span>Cairo, Egypt</span></div></div>
          <div><div class="kicker">Brand</div><div class="footer-links"><span>Luxury honey</span><span>Editorial ecommerce</span><span>Arabic soul</span></div></div>
        </div>
        <div class="footer-bottom"><span>&copy; 2026 Asalna</span><span>admin: admin / asalnaadmin</span></div>
      </div>
    </footer>`;
}

async function fetchProducts() {
  const data = await api('/api/products');
  productsCache = data.products;
  return productsCache;
}

function productCard(product) {
  return `
    <article class="product-card reveal">
      <img src="${product.image}" alt="${langProduct(product, 'name')}">
      <div class="product-content">
        <div class="product-top">
          <div><div class="kicker">${state.lang === 'ar' ? (product.categoryAr || product.category) : product.category}</div><h3>${langProduct(product, 'name')}</h3></div>
          <span class="tag">${product.badge || 'Asalna'}</span>
        </div>
        <p class="copy">${langProduct(product, 'shortDescription')}</p>
        <div class="product-meta"><span class="tag">${product.rating}★</span>${product.rawLabel ? '<span class="tag">Raw</span>' : ''}${product.organicLabel ? '<span class="tag">Organic</span>' : ''}${product.limitedLabel ? '<span class="tag">Limited</span>' : ''}</div>
        <div class="product-actions"><a class="btn-secondary" href="${pageUrl(`product.html?id=${product.id}`)}">${t('details')}</a><button class="btn" data-add="${product.id}">${t('add')}</button></div>
      </div>
    </article>`;
}

function bindCartButtons(scope = document) {
  scope.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const product = productsCache.find((item) => item.id === Number(button.dataset.add));
      if (!product) return;
      addToCart(product, 1);
      toast(state.lang === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Added to cart');
    });
  });
}

function initNav() {
  document.querySelector('[data-nav-root]').innerHTML = navMarkup();
  document.querySelector('[data-footer-root]').innerHTML = footerMarkup();
  document.querySelector('[data-lang-toggle]').addEventListener('click', () => {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('asalna_lang', state.lang);
    location.reload();
  });
  const toggle = document.querySelector('[data-nav-toggle]');
  if (toggle) toggle.addEventListener('click', () => {
    document.querySelector('[data-mobile-menu]').classList.toggle('hidden');
    document.body.classList.toggle('menu-open');
  });
  updateCartBadges();
}

function revealOnScroll() {
  const nodes = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
}

function initParallax() {
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    hero.style.setProperty('--shift', `${window.scrollY * -0.06}px`);
  });
}
async function renderHome() {
  const products = await fetchProducts();
  const featured = products.filter((item) => item.featured).slice(0, 4);
  const best = products.filter((item) => item.bestSeller).slice(0, 4);
  const categories = Array.from(new Map(products.map((item) => [item.category, item])).values()).slice(0, 4);
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="hero"><div class="container hero-grid"><div class="hero-copy hero-parallax reveal"><div class="kicker">${t('heroKicker')}</div><h1 class="title-xl">${t('heroTitle')}</h1><p class="copy">${t('heroText')}</p><div class="hero-actions"><a class="btn" href="${pageUrl('shop.html')}">${t('shopNow')}</a><a class="btn-secondary" href="${pageUrl('about.html')}">${t('navAbout')}</a></div><div class="hero-stats"><div class="hero-stat"><strong>08</strong><span>${t('heroStat1')}</span></div><div class="hero-stat"><strong>SM</strong><span>${t('heroStat2')}</span></div><div class="hero-stat"><strong>EG</strong><span>${t('heroStat3')}</span></div></div></div><div class="hero-visual reveal"><div class="hero-frame"><img src="${assetUrl('facebook-cover.png')}" alt="Asalna premium hero"><div class="float-badge"><strong class="font-display">Sidr Drop</strong><p class="muted">Siwa bloom / limited harvest / dense amber body</p></div><div class="float-note"><strong class="font-display">عسلنا</strong><p class="muted">Luxury, origin, and Egyptian warmth in one honey house.</p></div></div></div></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('featured')}</div><h2 class="title-lg">Signature jars with a stronger sense of identity.</h2></div><a class="btn-secondary" href="${pageUrl('shop.html')}">${t('navShop')}</a></div><div class="product-grid">${featured.map(productCard).join('')}</div></div></section>
    <section class="section"><div class="container home-grid-2"><div class="story-card reveal"><div class="kicker">${t('categories')}</div><h2 class="title-lg">From pure floral harvests to ceremonial gift editions.</h2><p class="copy">Each category is framed like a distinct mood: daily ritual, wellness blend, hosting piece, or luxury gifting object.</p><div class="story-grid">${categories.map((item) => `<div class="card reveal"><div class="tag">${item.category}</div><h3>${langProduct(item, 'name')}</h3><p class="copy">${langProduct(item, 'shortDescription')}</p></div>`).join('')}</div></div><div class="story-card reveal"><div class="kicker">${t('whyTitle')}</div><h2 class="title-lg">${t('story')}</h2><p class="copy">Asalna sources from Egyptian bloom zones, then presents honey with the polish of a modern premium house. Every surface on the site echoes viscosity, wax geometry, and appetite.</p><ul class="list-clean"><li>Distinct origin notes for every jar</li><li>Small-batch positioning with premium visual hierarchy</li><li>Arabic branding treated as an asset, not decoration</li><li>Working ecommerce logic from cart to SQLite order storage</li></ul></div></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('bestSellers')}</div><h2 class="title-lg">The jars customers reach for first.</h2></div></div><div class="product-grid">${best.map(productCard).join('')}</div></div></section>
    <section class="section"><div class="container feature-grid"><div class="feature reveal"><div class="feature-icon">✦</div><h3>Raw integrity</h3><p class="copy">No generic health claims. Clear origin, clear stock, clear positioning.</p></div><div class="feature reveal"><div class="feature-icon">✧</div><h3>Premium cadence</h3><p class="copy">Editorial spacing, cinematic surfaces, and product-first storytelling.</p></div><div class="feature reveal"><div class="feature-icon">◌</div><h3>SQLite orders</h3><p class="copy">Checkout is real, status-based, and admin-manageable.</p></div><div class="feature reveal"><div class="feature-icon">⬢</div><h3>Gift-level finish</h3><p class="copy">The site feels refined enough for weddings, retail, and premium direct sales.</p></div></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('testimonials')}</div><h2 class="title-lg">People remember both the taste and the presentation.</h2></div></div><div class="story-grid"><div class="card reveal"><h3>“The product feels expensive before the jar is opened.”</h3><p class="copy">Nour, Cairo</p></div><div class="card reveal"><h3>“It looks like a luxury brand, not a basic honey shop.”</h3><p class="copy">Youssef, Giza</p></div></div></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('gallery')}</div><h2 class="title-lg">A visual diary of glow, wax, texture, and table ritual.</h2></div></div><div class="gallery-grid"><img class="reveal" src="${assetUrl('facebook-cover.png')}" alt="Gallery 1"><img class="reveal" src="${assetUrl('facebook2.png')}" alt="Gallery 2"><img class="reveal" src="${assetUrl('White.png')}" alt="Gallery 3"><img class="reveal" src="${assetUrl('black.png')}" alt="Gallery 4"></div></div></section>
    <section class="section"><div class="container panel reveal" style="border-radius:34px;padding:28px;background:linear-gradient(140deg, rgba(32,20,10,.96), rgba(92,56,18,.88) 55%, rgba(113,119,59,.78));color:white;"><div class="kicker" style="color:#fff8ec">${t('newsletter')}</div><h2 class="title-lg">Private drops, gift seasons, and limited harvest alerts.</h2><p class="copy" style="color:rgba(255,248,236,.78)">Subscribe to receive early access to special editions and ceremonial collections.</p><form class="inline-fields" data-newsletter><input class="input" style="flex:1;background:rgba(255,248,236,.92)" placeholder="Email"><button class="btn">Join</button></form></div></section>`;
  bindCartButtons();
}

async function renderShop() {
  await fetchProducts();
  const categories = ['All', ...new Set(productsCache.map((item) => item.category))];
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="section"><div class="container panel reveal" style="border-radius:36px;padding:28px;"><div class="kicker">${t('navShop')}</div><h1 class="title-lg">Distinct jars, blends, comb cuts, and gift editions.</h1><p class="copy">Filter by taste profile, price, and category while keeping the brand atmosphere intact.</p></div></section>
    <section class="section"><div class="container"><div class="control-bar"><input class="input" data-search placeholder="${t('search')}"><select class="select" data-category>${categories.map((item) => `<option value="${item === 'All' ? '' : item}">${item === 'All' ? t('all') : item}</option>`).join('')}</select><select class="select" data-sort><option value="featured">${t('featuredSort')}</option><option value="latest">${t('latestSort')}</option><option value="price_asc">${t('priceLow')}</option><option value="price_desc">${t('priceHigh')}</option><option value="rating">${t('ratingSort')}</option></select><div class="inline-fields"><input class="input" type="number" min="0" data-min-price placeholder="${t('minPrice')}"><input class="input" type="number" min="0" data-max-price placeholder="${t('maxPrice')}"></div></div><div class="product-grid" data-shop-grid></div></div></section>`;
  const grid = document.querySelector('[data-shop-grid]');
  const controls = { search: document.querySelector('[data-search]'), category: document.querySelector('[data-category]'), sort: document.querySelector('[data-sort]'), min: document.querySelector('[data-min-price]'), max: document.querySelector('[data-max-price]') };
  const paint = () => {
    const search = controls.search.value.toLowerCase();
    const category = controls.category.value;
    const min = Number(controls.min.value || 0);
    const max = Number(controls.max.value || 999999);
    let filtered = productsCache.filter((product) => {
      const target = `${product.name} ${product.nameAr || ''} ${product.description}`.toLowerCase();
      return (!category || product.category === category) && target.includes(search) && product.price >= min && product.price <= max;
    });
    if (controls.sort.value === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    if (controls.sort.value === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    if (controls.sort.value === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (controls.sort.value === 'latest') filtered.sort((a, b) => b.id - a.id);
    grid.innerHTML = filtered.length ? filtered.map(productCard).join('') : `<div class="empty-state panel" style="grid-column:1/-1">No products match your filters.</div>`;
    bindCartButtons(grid);
    revealOnScroll();
  };
  Object.values(controls).forEach((control) => control.addEventListener('input', paint));
  controls.sort.addEventListener('change', paint);
  controls.category.addEventListener('change', paint);
  paint();
}

async function renderProduct() {
  const id = Number(new URLSearchParams(window.location.search).get('id')) || 1;
  const { product, relatedProducts } = await api(`/api/products/${id}`);
  productsCache = [product, ...relatedProducts];
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="section"><div class="container split-main"><div class="product-gallery reveal"><div class="product-hero-image" data-zoom-box><img src="${product.image}" alt="${langProduct(product, 'name')}" id="product-main-image"></div><div class="thumb-row">${[product.image, product.image, product.image, product.image].map((image, index) => `<button class="thumb ${index === 0 ? 'active' : ''}" data-thumb="${image}"><img src="${image}" alt="thumb"></button>`).join('')}</div><div class="panel" style="border-radius:30px;padding:22px;"><div class="kicker">${t('story')}</div><h2 class="title-md">${langProduct(product, 'name')}</h2><p class="copy">${langProduct(product, 'description')}</p></div></div><aside class="buy-panel panel reveal"><div class="tag">${product.badge || 'Asalna'}</div><h1 class="title-md">${langProduct(product, 'name')}</h1><div class="cluster"><span class="price">${money(product.price)}</span>${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ''}<span class="tag">${product.rating}★</span></div><p class="copy">${langProduct(product, 'shortDescription')}</p><div class="stack"><div><strong>${t('floralNotes')}</strong><p class="muted">${product.floralNotes}</p></div><div><strong>${t('origin')}</strong><p class="muted">${product.origin}</p></div></div><ul class="list-clean">${product.benefits.map((item) => `<li>${item}</li>`).join('')}</ul><div class="inline-fields"><div class="qty-box"><button data-qty-minus>-</button><input value="1" id="product-qty"><button data-qty-plus>+</button></div><button class="btn" id="buy-now">${t('add')}</button></div><a class="btn-secondary" href="${pageUrl('cart.html')}">${t('cart')}</a></aside></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('related')}</div><h2 class="title-lg">More jars from the same world.</h2></div></div><div class="product-grid">${relatedProducts.map(productCard).join('')}</div></div></section>`;
  bindCartButtons();
  const qtyInput = document.getElementById('product-qty');
  document.querySelector('[data-qty-minus]').onclick = () => { qtyInput.value = String(Math.max(1, Number(qtyInput.value) - 1)); };
  document.querySelector('[data-qty-plus]').onclick = () => { qtyInput.value = String(Number(qtyInput.value) + 1); };
  document.getElementById('buy-now').onclick = () => { addToCart(product, Number(qtyInput.value || 1)); toast(state.lang === 'ar' ? 'تمت إضافة المنتج' : 'Product added'); };
  document.querySelectorAll('[data-thumb]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.thumb').forEach((thumb) => thumb.classList.remove('active')); button.classList.add('active'); document.getElementById('product-main-image').src = button.dataset.thumb; }));
  const zoomBox = document.querySelector('[data-zoom-box]');
  zoomBox.addEventListener('mousemove', (event) => { const rect = zoomBox.getBoundingClientRect(); zoomBox.style.setProperty('--zoom-x', `${((event.clientX - rect.left) / rect.width) * 100}%`); zoomBox.style.setProperty('--zoom-y', `${((event.clientY - rect.top) / rect.height) * 100}%`); });
  zoomBox.addEventListener('mouseenter', () => zoomBox.classList.add('is-zoomed'));
  zoomBox.addEventListener('mouseleave', () => zoomBox.classList.remove('is-zoomed'));
}
function cartTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 700 || subtotal === 0 ? 0 : 65;
  const coupon = document.querySelector('[data-coupon]')?.value?.trim().toUpperCase() || '';
  const discount = coupon === 'ASALNA10' ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, shipping, discount, total: subtotal + shipping - discount };
}

function renderCart() {
  const cart = loadCart();
  const totals = cartTotals(cart);
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="section"><div class="container cart-layout"><div>${cart.length ? cart.map((item) => `<article class="cart-item panel"><img src="${item.product.image}" alt="${item.product.name}"><div><div class="tag">${item.product.badge || item.product.category}</div><h3>${langProduct(item.product, 'name')}</h3><p class="copy">${langProduct(item.product, 'shortDescription')}</p><div class="price">${money(item.product.price)}</div></div><div class="stack"><div class="qty-box"><button data-cart-minus="${item.productId}">-</button><input value="${item.quantity}" data-cart-input="${item.productId}"><button data-cart-plus="${item.productId}">+</button></div><button class="btn-secondary" data-remove="${item.productId}">Remove</button></div></article>`).join('') : `<div class="empty-state panel">${t('emptyCart')}</div>`}</div><aside class="summary-box panel"><div class="kicker">${t('cart')}</div><h2 class="title-md">${t('orderSummary')}</h2><div class="field"><label>${t('coupon')}</label><div class="inline-fields"><input class="input" data-coupon placeholder="ASALNA10"><button class="btn-secondary" data-refresh-totals>${t('apply')}</button></div></div><div class="summary-row"><span>${t('subtotal')}</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-row"><span>${t('shipping')}</span><strong>${money(totals.shipping)}</strong></div><div class="summary-row"><span>${t('discount')}</span><strong>${money(totals.discount)}</strong></div><div class="summary-row total"><span>${t('total')}</span><strong data-cart-total>${money(totals.total)}</strong></div><div class="stack"><a class="btn" href="${pageUrl('checkout.html')}">${t('proceed')}</a><button class="btn-secondary" data-clear-cart>Clear cart</button></div></aside></div></section>`;
  document.querySelectorAll('[data-cart-minus]').forEach((button) => button.onclick = () => { const item = cart.find((entry) => entry.productId === Number(button.dataset.cartMinus)); if (!item) return; updateCartItem(item.productId, item.quantity - 1); renderCart(); });
  document.querySelectorAll('[data-cart-plus]').forEach((button) => button.onclick = () => { const item = cart.find((entry) => entry.productId === Number(button.dataset.cartPlus)); if (!item) return; updateCartItem(item.productId, item.quantity + 1); renderCart(); });
  document.querySelectorAll('[data-remove]').forEach((button) => button.onclick = () => { removeCartItem(Number(button.dataset.remove)); renderCart(); });
  document.querySelector('[data-clear-cart]')?.addEventListener('click', () => { clearCart(); renderCart(); });
  document.querySelector('[data-refresh-totals]')?.addEventListener('click', renderCart);
  updateCartBadges();
}

function renderCheckout() {
  const cart = loadCart();
  const totals = cartTotals(cart);
  if (!cart.length) {
    document.querySelector('[data-page-root]').innerHTML = `<section class="section"><div class="container empty-state panel">${t('emptyCart')}<div style="margin-top:16px"><a class="btn" href="${pageUrl('shop.html')}">${t('navShop')}</a></div></div></section>`;
    return;
  }
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="section"><div class="container checkout-grid"><div class="checkout-shell form-shell" style="border-radius:34px;padding:24px;"><div class="kicker">Checkout</div><h1 class="title-lg">Finalize your order with a real SQLite-backed flow.</h1><form id="checkout-form" class="form-grid"><div class="field"><label>Name</label><input class="input" name="customerName" required></div><div class="field"><label>Phone</label><input class="input" name="phone" required></div><div class="field full"><label>Address</label><input class="input" name="address" required></div><div class="field"><label>City</label><input class="input" name="city" required></div><div class="field"><label>${t('deliveryMethod')}</label><select class="select" name="deliveryMethod"><option value="express">Express courier</option><option value="standard">Standard delivery</option><option value="pickup">Boutique pickup</option></select></div><div class="field"><label>${t('paymentMethod')}</label><select class="select" name="paymentMethod"><option value="cash-on-delivery">Cash on delivery</option><option value="bank-transfer">Bank transfer</option><option value="card-on-delivery">Card on delivery</option></select></div><div class="field full"><label>Notes</label><textarea class="textarea" rows="5" name="notes"></textarea></div><div class="field full"><button class="btn" type="submit">${t('placeOrder')}</button></div></form></div><aside class="summary-box panel"><div class="kicker">${t('orderSummary')}</div>${cart.map((item) => `<div class="summary-row"><span>${langProduct(item.product, 'name')} × ${item.quantity}</span><strong>${money(item.product.price * item.quantity)}</strong></div>`).join('')}<div class="summary-row"><span>${t('subtotal')}</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-row"><span>${t('shipping')}</span><strong>${money(totals.shipping)}</strong></div><div class="summary-row total"><span>${t('total')}</span><strong>${money(totals.total)}</strong></div></aside></div></section>`;
  document.getElementById('checkout-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.items = cart.map((item) => ({ productId: item.productId, quantity: item.quantity }));
    payload.customerRef = getCustomerRef();
    payload.couponCode = '';
    try {
      const result = await api('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
      setCustomerRef(result.customerRef);
      clearCart();
      toast(t('orderSuccess'));
      window.location.href = result.redirect;
    } catch (error) {
      toast(error.message, 'error');
    }
  });
}

async function renderOrders() {
  const ref = new URLSearchParams(window.location.search).get('ref') || getCustomerRef();
  if (!ref) {
    document.querySelector('[data-page-root]').innerHTML = `<section class="section"><div class="container empty-state panel">No order reference yet.</div></section>`;
    return;
  }
  const { orders } = await api(`/api/orders?ref=${encodeURIComponent(ref)}`);
  document.querySelector('[data-page-root]').innerHTML = `
    <section class="section"><div class="container"><div class="section-head reveal"><div><div class="kicker">${t('ordersTitle')}</div><h1 class="title-lg">${t('trackHint')}</h1></div></div><div class="orders-layout"><div>${orders.map((order) => `<article class="order-card panel reveal"><div class="cluster"><span class="tag">${order.order_number}</span><span class="${statusClass(order.status)}">${order.status}</span></div><div class="summary-row"><span>Date</span><strong>${new Date(order.created_at).toLocaleString()}</strong></div><div class="summary-row"><span>Delivery</span><strong>${order.delivery_method} / ${order.city}</strong></div>${order.items.map((item) => `<div class="summary-row"><span>${item.product_name} × ${item.quantity}</span><strong>${money(item.line_total)}</strong></div>`).join('')}<div class="summary-row total"><span>${t('total')}</span><strong>${money(order.total)}</strong></div></article>`).join('')}</div><aside class="summary-box panel"><div class="kicker">Customer ref</div><h2 class="title-md">${ref}</h2><p class="copy">Saved in localStorage and backed by SQLite orders.</p></aside></div></div></section>`;
}

function simpleContentPage(title, copyText, image) {
  document.querySelector('[data-page-root]').innerHTML = `<section class="section"><div class="container home-grid-2"><div class="panel reveal" style="border-radius:34px;padding:28px;"><div class="kicker">Asalna</div><h1 class="title-lg">${title}</h1><p class="copy">${copyText}</p></div><div class="panel reveal" style="border-radius:34px;padding:14px;"><img src="${image}" alt="Asalna" style="width:100%;height:100%;min-height:420px;object-fit:cover;border-radius:28px;"></div></div></section>`;
}

function bindCommon() {
  document.querySelector('[data-newsletter]')?.addEventListener('submit', (event) => { event.preventDefault(); toast(state.lang === 'ar' ? 'تم الاشتراك' : 'Subscribed'); });
}

async function init() {
  setDocumentLanguage();
  initNav();
  if (page === 'home') await renderHome();
  if (page === 'shop') await renderShop();
  if (page === 'product') await renderProduct();
  if (page === 'cart') renderCart();
  if (page === 'checkout') renderCheckout();
  if (page === 'orders') await renderOrders();
  if (page === 'about') simpleContentPage('Asalna is designed as a premium Egyptian honey house.', 'We positioned the brand around origin, appetite, glow, and ceremony. The result is a warmer, bolder, more collectible ecommerce world rather than a standard grocery layout.', assetUrl('beekeeper.svg'));
  if (page === 'contact') simpleContentPage('Retail, gifting, hospitality, and custom drops.', 'Reach the Asalna team for wholesale, curated gift programs, or tailored honey selections for events and premium brand partnerships.', assetUrl('hero-honey.svg'));
  bindCommon();
  revealOnScroll();
  initParallax();
}

init();


