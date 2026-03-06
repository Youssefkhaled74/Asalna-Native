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
    nameAr: 'عسل سدر',
    description: 'A rare Egyptian sidr harvest with deep body, resin warmth, and a luxurious finish built for slow tasting.',
    descriptionAr: 'عسل سدر فاخر بطابع عميق ودفء راتنجي ونهاية غنية للتذوق الهادئ.',
    shortDescription: 'Dense, rare, gift-worthy sidr honey with a deep amber body.',
    shortDescriptionAr: 'عسل سدر كثيف ونادر ومناسب للهدايا بقوام عنبري غني.',
    price: 420,
    oldPrice: 480,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'عسل فاخر',
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
    nameAr: 'عسل البرسيم',
    description: 'Silky clover honey with an airy floral aroma and clean sweetness made for breakfasts, pastries, and tea rituals.',
    descriptionAr: 'عسل برسيم ناعم برائحة زهرية خفيفة وحلاوة نظيفة للفطور والمعجنات والشاي.',
    shortDescription: 'Lighter floral honey with a polished everyday finish.',
    shortDescriptionAr: 'عسل زهري أخف بطابع يومي أنيق.',
    price: 220,
    oldPrice: 260,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'عسل فاخر',
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
    nameAr: 'عسل الحبة السوداء',
    description: 'A darker wellness-led blend where pure honey meets black seed character for a bold spoon.',
    descriptionAr: 'خلطة أعمق بطابع صحي تجمع بين العسل النقي والحبة السوداء لنكهة جريئة.',
    shortDescription: 'Powerful blend with a deeper aromatic edge.',
    shortDescriptionAr: 'خلطة قوية بطابع عطري أعمق.',
    price: 310,
    oldPrice: null,
    categoryId: 2,
    category: 'Honey Blends',
    categoryAr: 'خلطات العسل',
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
    nameAr: 'عسل جبلي',
    description: 'Harvested from elevated wildflower zones for a layered mineral profile and darker sweetness.',
    descriptionAr: 'محصول من الزهور الجبلية بطبقات معدنية أوضح وحلاوة أغمق.',
    shortDescription: 'Earthy, mineral-rich mountain harvest.',
    shortDescriptionAr: 'محصول جبلي غني بالمعادن وطابع أرضي.',
    price: 295,
    oldPrice: 340,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'عسل فاخر',
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
    nameAr: 'عسل زهر الحمضيات',
    description: 'Bright citrus blossom honey with a lifted aroma and a refined finish that feels crisp rather than sugary.',
    descriptionAr: 'عسل زهر حمضيات برائحة منعشة ونهاية راقية وخفيفة.',
    shortDescription: 'Fresh blossom honey with a bright aromatic lift.',
    shortDescriptionAr: 'عسل زهور منعش بطابع عطري مشرق.',
    price: 245,
    oldPrice: null,
    categoryId: 1,
    category: 'Signature Honey',
    categoryAr: 'عسل فاخر',
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
    nameAr: 'رويال هاني ميكس',
    description: 'A ceremonial spoon blending premium honey with royal-style fortifying ingredients.',
    descriptionAr: 'خلطة فاخرة تمزج العسل الممتاز بمكونات ملكية بطابع احتفالي.',
    shortDescription: 'Dense blend designed for focused daily rituals.',
    shortDescriptionAr: 'خلطة كثيفة لروتين يومي فاخر.',
    price: 520,
    oldPrice: 590,
    categoryId: 2,
    category: 'Honey Blends',
    categoryAr: 'خلطات العسل',
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
    nameAr: 'شمع العسل',
    description: 'Cut honeycomb presented like an edible jewel with natural drip and bold texture.',
    descriptionAr: 'شمع عسل مقطوع بتقديم فاخر وملمس طبيعي واضح.',
    shortDescription: 'Raw honeycomb for premium serving and hosting.',
    shortDescriptionAr: 'شمع عسل خام للتقديم الفاخر والاستضافة.',
    price: 390,
    oldPrice: null,
    categoryId: 3,
    category: 'Gift Editions',
    categoryAr: 'هدايا أصلنا',
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
    nameAr: 'بوكس أصلنا',
    description: 'A curated gift edition with signature jars arranged in an artful premium box.',
    descriptionAr: 'بوكس هدايا مختار بعناية يضم برطمانات أصلنا في تقديم فني فاخر.',
    shortDescription: 'Curated honey gift set with premium presentation.',
    shortDescriptionAr: 'بوكس هدايا عسل بتقديم فاخر.',
    price: 890,
    oldPrice: 980,
    categoryId: 3,
    category: 'Gift Editions',
    categoryAr: 'هدايا أصلنا',
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

export const state = {
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
      categoryAr: payload.categoryAr || 'عسل فاخر'
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

export async function api(path, options = {}) {
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

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

export function saveCart(cart) {
  state.cart = cart;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

export function addToCart(product, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find((item) => item.productId === product.id);
  const safeProduct = normalizeProduct(product);
  if (existing) existing.quantity += quantity;
  else cart.push({ productId: safeProduct.id, quantity, product: safeProduct });
  saveCart(cart);
}

export function updateCartItem(productId, quantity) {
  const cart = loadCart().map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
  saveCart(cart);
}

export function removeCartItem(productId) {
  saveCart(loadCart().filter((item) => item.productId !== productId));
}

export function clearCart() {
  saveCart([]);
}

export function getCustomerRef() {
  return localStorage.getItem(CUSTOMER_REF_KEY) || '';
}

export function setCustomerRef(ref) {
  localStorage.setItem(CUSTOMER_REF_KEY, ref);
}

export function updateCartBadges() {
  const count = loadCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
  });
}

export function money(value) {
  return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value || 0));
}

export function statusClass(status) {
  return `status-${status}`;
}

export function toast(message, tone = 'default') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const node = document.createElement('div');
  node.className = 'toast';
  node.style.border = tone === 'error' ? '1px solid rgba(177,77,54,.4)' : '1px solid rgba(255,255,255,.08)';
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2800);
}

export function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

export function pageUrl(file) {
  return IN_ADMIN ? `../${file}` : `./${file}`;
}

export function assetUrl(file) {
  return imagePath(`assets/images/${file}`);
}
