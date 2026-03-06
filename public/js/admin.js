import { api, money, toast } from './store.js';

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
