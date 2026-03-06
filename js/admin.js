(function () {
  const root = document.getElementById('adminRoot');
  if (!root) return;

  const orders = window.Asalna.getOrders();
  const products = window.Asalna.getProducts();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  root.innerHTML = `
    <section class="grid md:grid-cols-4 gap-4 mb-6">
      <article class="asalna-glass rounded-3xl p-4 reveal"><p class="section-kicker">Total Orders</p><h2 class="text-4xl font-display mt-2">${orders.length}</h2></article>
      <article class="asalna-glass rounded-3xl p-4 reveal"><p class="section-kicker">Pending</p><h2 class="text-4xl font-display mt-2">${orders.filter((o) => o.status === 'pending').length}</h2></article>
      <article class="asalna-glass rounded-3xl p-4 reveal"><p class="section-kicker">Revenue</p><h2 class="text-4xl font-display mt-2">${window.Asalna.money(revenue)}</h2></article>
      <article class="asalna-glass rounded-3xl p-4 reveal"><p class="section-kicker">Products</p><h2 class="text-4xl font-display mt-2">${products.length}</h2></article>
    </section>

    <section class="asalna-glass rounded-3xl p-4 overflow-x-auto reveal">
      <h3 class="text-4xl font-display mb-4">Recent Orders</h3>
      <table class="asalna-table">
        <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          ${orders.map((order) => `<tr><td>${order.id}</td><td>${new Date(order.date).toLocaleDateString()}</td><td>${order.customer.name}</td><td>${window.Asalna.money(order.total)}</td><td><span class="status-${order.status}">${order.status}</span></td></tr>`).join('')}
        </tbody>
      </table>
    </section>
  `;

  window.Asalna.applyReveal();
})();
