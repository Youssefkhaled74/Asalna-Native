(function () {
  const form = document.getElementById('checkoutForm');
  const summaryRoot = document.getElementById('checkoutSummary');
  if (!form || !summaryRoot) return;

  function renderSummary() {
    const summary = window.Asalna.cartSummary('');
    if (!summary.items.length) {
      summaryRoot.innerHTML = '<div class="asalna-glass rounded-3xl p-8 text-center">Cart is empty.</div>';
      return;
    }

    summaryRoot.innerHTML = `
      <div class="asalna-glass rounded-3xl p-5 reveal">
        <p class="section-kicker">Order Summary</p>
        <h2 class="text-4xl font-display">Before you place</h2>
        <div class="mt-4 space-y-2 text-sm">
          ${summary.items.map((item) => `<div class="flex justify-between gap-2"><span>${item.product.name} × ${item.quantity}</span><strong>${window.Asalna.money(item.lineTotal)}</strong></div>`).join('')}
          <div class="flex justify-between pt-2 border-t border-[#2e1d11]/10"><span>Subtotal</span><strong>${window.Asalna.money(summary.subtotal)}</strong></div>
          <div class="flex justify-between"><span>Shipping</span><strong>${window.Asalna.money(summary.shipping)}</strong></div>
          <div class="flex justify-between text-base font-bold"><span>Total</span><strong>${window.Asalna.money(summary.total)}</strong></div>
        </div>
      </div>
    `;

    window.Asalna.applyReveal();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const summary = window.Asalna.cartSummary('');
    if (!summary.items.length) {
      window.Asalna.toast('Cart is empty');
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      address: String(data.get('address') || '').trim(),
      city: String(data.get('city') || '').trim(),
      notes: String(data.get('notes') || '').trim(),
      coupon: String(data.get('coupon') || '').trim()
    };

    if (!payload.name || !payload.phone || !payload.address || !payload.city) {
      window.Asalna.toast('Please complete required fields');
      return;
    }

    window.Asalna.createOrder(payload);
    window.Asalna.toast('Order placed successfully');
    window.location.href = 'orders.html';
  });

  renderSummary();
})();
