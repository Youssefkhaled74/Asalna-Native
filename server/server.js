const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');
const { initialize, run, get, all } = require('./db');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');
const sessions = new Map();
const COOKIE_NAME = 'asalna_admin_session';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, body, contentType = 'text/plain; charset=utf-8', extraHeaders = {}) {
  response.writeHead(statusCode, { 'Content-Type': contentType, ...extraHeaders });
  response.end(body);
}

function hashValue(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseCookies(request) {
  const header = request.headers.cookie || '';
  return header.split(';').reduce((acc, entry) => {
    const [rawKey, ...rest] = entry.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

function getSession(request) {
  const cookies = parseCookies(request);
  const token = cookies[COOKIE_NAME];
  return token ? sessions.get(token) : null;
}

function requireAdmin(request, response) {
  const session = getSession(request);
  if (!session) {
    sendJson(response, 401, { error: 'Unauthorized' });
    return null;
  }
  return session;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        request.destroy();
        reject(new Error('Payload too large'));
      }
    });
    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    request.on('error', reject);
  });
}

function createOrderNumber() {
  return `AS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function randomRef(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString('hex')}`;
}

function parseJsonField(value) {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch (error) {
    return [];
  }
}

function mapProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameAr: row.name_ar,
    description: row.description,
    shortDescription: row.short_description,
    price: row.price,
    oldPrice: row.old_price,
    categoryId: row.category_id,
    category: row.category_name,
    categoryAr: row.category_name_ar,
    image: row.image,
    imageAlt: row.image_alt,
    stock: row.stock,
    badge: row.badge,
    rating: row.rating,
    origin: row.origin,
    floralNotes: row.floral_notes,
    benefits: parseJsonField(row.benefits),
    featured: Boolean(row.featured),
    bestSeller: Boolean(row.best_seller),
    rawLabel: Boolean(row.raw_label),
    organicLabel: Boolean(row.organic_label),
    limitedLabel: Boolean(row.limited_label)
  };
}

async function fetchProducts(options = {}) {
  const params = [];
  const filters = [];
  let query = `
    SELECT p.*, c.name AS category_name, c.name_ar AS category_name_ar
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
  `;

  if (options.category) {
    filters.push('(c.slug = ? OR c.name = ?)');
    params.push(options.category, options.category);
  }
  if (options.search) {
    filters.push('(p.name LIKE ? OR p.name_ar LIKE ? OR p.description LIKE ? OR p.short_description LIKE ?)');
    const term = `%${options.search}%`;
    params.push(term, term, term, term);
  }
  if (options.minPrice) {
    filters.push('p.price >= ?');
    params.push(Number(options.minPrice));
  }
  if (options.maxPrice) {
    filters.push('p.price <= ?');
    params.push(Number(options.maxPrice));
  }

  if (filters.length) query += ` WHERE ${filters.join(' AND ')}`;

  const orderBy = {
    latest: 'p.created_at DESC',
    price_asc: 'p.price ASC',
    price_desc: 'p.price DESC',
    rating: 'p.rating DESC',
    featured: 'p.featured DESC, p.best_seller DESC, p.id DESC'
  };

  query += ` ORDER BY ${orderBy[options.sort] || orderBy.featured}`;
  return all(query, params);
}

async function fetchOrderByRef(customerRef) {
  const orders = await all('SELECT * FROM orders WHERE customer_ref = ? ORDER BY created_at DESC', [customerRef]);
  const hydrated = [];
  for (const order of orders) {
    const items = await all('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC', [order.id]);
    hydrated.push({ ...order, items });
  }
  return hydrated;
}

async function handleApi(request, response, url) {
  if (url.pathname === '/api/products' && request.method === 'GET') {
    const rows = await fetchProducts({
      category: url.searchParams.get('category'),
      search: url.searchParams.get('search'),
      minPrice: url.searchParams.get('minPrice'),
      maxPrice: url.searchParams.get('maxPrice'),
      sort: url.searchParams.get('sort') || 'featured'
    });
    sendJson(response, 200, { products: rows.map(mapProduct) });
    return true;
  }

  if (url.pathname.match(/^\/api\/products\/\d+$/) && request.method === 'GET') {
    const id = Number(url.pathname.split('/').pop());
    const row = await get(`
      SELECT p.*, c.name AS category_name, c.name_ar AS category_name_ar
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.id = ?
    `, [id]);
    if (!row) {
      sendJson(response, 404, { error: 'Product not found' });
      return true;
    }
    const relatedRows = await all(`
      SELECT p.*, c.name AS category_name, c.name_ar AS category_name_ar
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.category_id = ? AND p.id != ?
      ORDER BY p.best_seller DESC, p.featured DESC, p.rating DESC
      LIMIT 4
    `, [row.category_id, row.id]);
    sendJson(response, 200, { product: mapProduct(row), relatedProducts: relatedRows.map(mapProduct) });
    return true;
  }

  if (url.pathname === '/api/orders' && request.method === 'POST') {
    const payload = await readBody(request);
    const items = Array.isArray(payload.items) ? payload.items : [];
    if (!payload.customerName || !payload.phone || !payload.address || !payload.city || !payload.deliveryMethod || !payload.paymentMethod || !items.length) {
      sendJson(response, 400, { error: 'Missing required checkout fields' });
      return true;
    }

    const ids = items.map((item) => Number(item.productId)).filter(Boolean);
    const placeholders = ids.map(() => '?').join(',');
    const productRows = ids.length ? await all(`SELECT * FROM products WHERE id IN (${placeholders})`, ids) : [];
    const productMap = new Map(productRows.map((row) => [row.id, row]));

    let subtotal = 0;
    const normalizedItems = [];
    for (const item of items) {
      const product = productMap.get(Number(item.productId));
      const quantity = Math.max(1, Number(item.quantity || 1));
      if (!product || product.stock < quantity) {
        sendJson(response, 400, { error: `Product unavailable: ${item.productId}` });
        return true;
      }
      const lineTotal = Number(product.price) * quantity;
      subtotal += lineTotal;
      normalizedItems.push({ product, quantity, lineTotal });
    }

    const shipping = subtotal >= 700 ? 0 : 65;
    const discount = payload.couponCode && payload.couponCode.trim().toUpperCase() === 'ASALNA10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping - discount;
    const customerRef = payload.customerRef || randomRef('customer');
    const orderNumber = createOrderNumber();

    await run('BEGIN TRANSACTION');
    try {
      const result = await run(`
        INSERT INTO orders (order_number, customer_ref, customer_name, phone, address, city, notes, delivery_method, payment_method, subtotal, shipping, discount, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `, [orderNumber, customerRef, payload.customerName, payload.phone, payload.address, payload.city, payload.notes || '', payload.deliveryMethod, payload.paymentMethod, subtotal, shipping, discount, total]);

      for (const entry of normalizedItems) {
        await run(`
          INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, unit_price, line_total)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [result.id, entry.product.id, entry.product.name, entry.product.image, entry.quantity, entry.product.price, entry.lineTotal]);
        await run('UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [entry.quantity, entry.product.id]);
      }

      await run('COMMIT');
      sendJson(response, 201, { success: true, customerRef, orderNumber, orderId: result.id, redirect: `/orders.html?ref=${encodeURIComponent(customerRef)}` });
    } catch (error) {
      await run('ROLLBACK');
      throw error;
    }
    return true;
  }

  if (url.pathname === '/api/orders' && request.method === 'GET') {
    const ref = url.searchParams.get('ref');
    if (!ref) {
      sendJson(response, 400, { error: 'Customer reference is required' });
      return true;
    }
    const orders = await fetchOrderByRef(ref);
    sendJson(response, 200, { orders, customerRef: ref });
    return true;
  }

  if (url.pathname.match(/^\/api\/orders\/\d+$/) && request.method === 'GET') {
    const id = Number(url.pathname.split('/').pop());
    const order = await get('SELECT * FROM orders WHERE id = ?', [id]);
    if (!order) {
      sendJson(response, 404, { error: 'Order not found' });
      return true;
    }
    const items = await all('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC', [id]);
    sendJson(response, 200, { order: { ...order, items } });
    return true;
  }

  if (url.pathname === '/api/admin/login' && request.method === 'POST') {
    const payload = await readBody(request);
    if (!payload.username || !payload.password) {
      sendJson(response, 400, { error: 'Username and password are required' });
      return true;
    }
    const user = await get('SELECT * FROM admin_users WHERE username = ?', [payload.username]);
    if (!user || user.password_hash !== hashValue(payload.password)) {
      sendJson(response, 401, { error: 'Invalid credentials' });
      return true;
    }
    const token = randomRef('admin');
    sessions.set(token, { id: user.id, username: user.username, displayName: user.display_name, createdAt: Date.now() });
    sendJson(response, 200, { success: true, user: { username: user.username, displayName: user.display_name } }, {
      'Set-Cookie': `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=28800; SameSite=Lax`
    });
    return true;
  }

  if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
    const cookies = parseCookies(request);
    const token = cookies[COOKIE_NAME];
    if (token) sessions.delete(token);
    sendJson(response, 200, { success: true }, { 'Set-Cookie': `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` });
    return true;
  }

  if (url.pathname === '/api/admin/me' && request.method === 'GET') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    sendJson(response, 200, { user: session });
    return true;
  }

  if (url.pathname === '/api/admin/summary' && request.method === 'GET') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const [stats, revenue, productsCount, recentOrders] = await Promise.all([
      all(`SELECT status, COUNT(*) AS count FROM orders GROUP BY status`),
      get('SELECT COALESCE(SUM(total), 0) AS revenue FROM orders WHERE status != ?', ['cancelled']),
      get('SELECT COUNT(*) AS count FROM products'),
      all('SELECT id, order_number, customer_name, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5')
    ]);

    const statMap = stats.reduce((acc, item) => ({ ...acc, [item.status]: item.count }), {});
    sendJson(response, 200, {
      totalOrders: Object.values(statMap).reduce((sum, count) => sum + count, 0),
      pendingOrders: statMap.pending || 0,
      revenue: revenue.revenue || 0,
      productsCount: productsCount.count || 0,
      recentOrders
    });
    return true;
  }

  if (url.pathname === '/api/admin/orders' && request.method === 'GET') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const orders = await all('SELECT * FROM orders ORDER BY created_at DESC');
    sendJson(response, 200, { orders });
    return true;
  }

  if (url.pathname.match(/^\/api\/admin\/orders\/\d+$/) && request.method === 'GET') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const id = Number(url.pathname.split('/').pop());
    const order = await get('SELECT * FROM orders WHERE id = ?', [id]);
    if (!order) {
      sendJson(response, 404, { error: 'Order not found' });
      return true;
    }
    const items = await all('SELECT * FROM order_items WHERE order_id = ?', [id]);
    sendJson(response, 200, { order: { ...order, items } });
    return true;
  }

  if (url.pathname.match(/^\/api\/admin\/orders\/\d+\/status$/) && request.method === 'PATCH') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const payload = await readBody(request);
    const status = payload.status;
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      sendJson(response, 400, { error: 'Invalid status' });
      return true;
    }
    const id = Number(url.pathname.split('/')[4]);
    await run('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    sendJson(response, 200, { success: true });
    return true;
  }

  if (url.pathname === '/api/admin/products' && request.method === 'GET') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const rows = await fetchProducts({ sort: 'latest' });
    sendJson(response, 200, { products: rows.map(mapProduct) });
    return true;
  }

  if (url.pathname === '/api/admin/products' && request.method === 'POST') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const payload = await readBody(request);
    const slug = payload.slug || String(payload.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const benefits = JSON.stringify(Array.isArray(payload.benefits) ? payload.benefits : []);
    const result = await run(`
      INSERT INTO products (slug, name, name_ar, description, short_description, price, old_price, category_id, image, image_alt, stock, badge, rating, origin, floral_notes, benefits, featured, best_seller, raw_label, organic_label, limited_label)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [slug, payload.name, payload.nameAr || '', payload.description, payload.shortDescription, Number(payload.price), payload.oldPrice ? Number(payload.oldPrice) : null, Number(payload.categoryId), payload.image, payload.imageAlt || payload.name, Number(payload.stock || 0), payload.badge || '', Number(payload.rating || 4.8), payload.origin || '', payload.floralNotes || '', benefits, payload.featured ? 1 : 0, payload.bestSeller ? 1 : 0, payload.rawLabel ? 1 : 0, payload.organicLabel ? 1 : 0, payload.limitedLabel ? 1 : 0]);
    sendJson(response, 201, { success: true, id: result.id });
    return true;
  }

  if (url.pathname.match(/^\/api\/admin\/products\/\d+$/) && request.method === 'PUT') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const id = Number(url.pathname.split('/').pop());
    const payload = await readBody(request);
    const benefits = JSON.stringify(Array.isArray(payload.benefits) ? payload.benefits : []);
    await run(`
      UPDATE products
      SET slug = ?, name = ?, name_ar = ?, description = ?, short_description = ?, price = ?, old_price = ?, category_id = ?, image = ?, image_alt = ?, stock = ?, badge = ?, rating = ?, origin = ?, floral_notes = ?, benefits = ?, featured = ?, best_seller = ?, raw_label = ?, organic_label = ?, limited_label = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [payload.slug, payload.name, payload.nameAr || '', payload.description, payload.shortDescription, Number(payload.price), payload.oldPrice ? Number(payload.oldPrice) : null, Number(payload.categoryId), payload.image, payload.imageAlt || payload.name, Number(payload.stock || 0), payload.badge || '', Number(payload.rating || 4.8), payload.origin || '', payload.floralNotes || '', benefits, payload.featured ? 1 : 0, payload.bestSeller ? 1 : 0, payload.rawLabel ? 1 : 0, payload.organicLabel ? 1 : 0, payload.limitedLabel ? 1 : 0, id]);
    sendJson(response, 200, { success: true });
    return true;
  }

  if (url.pathname.match(/^\/api\/admin\/products\/\d+$/) && request.method === 'DELETE') {
    const session = requireAdmin(request, response);
    if (!session) return true;
    const id = Number(url.pathname.split('/').pop());
    await run('DELETE FROM products WHERE id = ?', [id]);
    sendJson(response, 200, { success: true });
    return true;
  }

  return false;
}

function serveStatic(request, response, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  let filePath = path.join(publicDir, pathname);

  if (!filePath.startsWith(publicDir)) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    const notFoundPath = path.join(publicDir, '404.html');
    const body = fs.readFileSync(notFoundPath, 'utf8');
    sendText(response, 404, body, 'text/html; charset=utf-8');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  if (type.startsWith('text/') || type.includes('javascript') || type.includes('json') || type.includes('svg')) {
    const body = fs.readFileSync(filePath, 'utf8');
    sendText(response, 200, body, type);
    return;
  }
  const body = fs.readFileSync(filePath);
  response.writeHead(200, { 'Content-Type': type });
  response.end(body);
}

async function start() {
  await initialize();

  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      if (await handleApi(request, response, url)) return;
      serveStatic(request, response, url);
    } catch (error) {
      console.error(error);
      sendJson(response, 500, { error: 'Internal server error' });
    }
  });

  server.listen(PORT, () => {
    console.log(`Asalna server running on http://localhost:${PORT}`);
  });
}

start();
