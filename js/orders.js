(function () {
  const root = document.getElementById('ordersRoot');
  if (!root) return;

  const orders = window.Asalna.getOrders();
  root.innerHTML = orders.length ? orders.map((order) => `
    <article class="asalna-glass rounded-3xl p-5 reveal">
      <div class="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <p class="section-kicker">Order</p>
          <h2 class="text-4xl font-display">${order.id}</h2>
        </div>
        <span class="status-${order.status}">${order.status}</span>
      </div>
      <div class="mt-4 grid md:grid-cols-2 gap-3 text-sm">
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Customer:</strong> ${order.customer.name}</p>
        <p><strong>Phone:</strong> ${order.customer.phone}</p>
        <p><strong>City:</strong> ${order.customer.city}</p>
      </div>
      <div class="mt-4 space-y-2 text-sm">
        ${order.items.map((item) => `<div class="flex justify-between"><span>${item.product.name} × ${item.quantity}</span><strong>${window.Asalna.money(item.lineTotal)}</strong></div>`).join('')}
      </div>
      <div class="mt-4 pt-3 border-t border-[#2e1d11]/10 flex justify-between font-bold">
        <span>Total</span>
        <span>${window.Asalna.money(order.total)}</span>
      </div>
    </article>
  `).join('') : '<div class="asalna-glass rounded-3xl p-10 text-center">No orders yet.</div>';

  window.Asalna.applyReveal();
})();
