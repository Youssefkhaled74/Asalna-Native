(function () {
  const root = document.getElementById('cartRoot');
  if (!root) return;

  function render() {
    const summary = window.Asalna.cartSummary(document.getElementById('couponInput')?.value || '');

    root.innerHTML = `
      <div class="grid lg:grid-cols-[1fr_360px] gap-6">
        <div class="space-y-4">
          ${summary.items.length ? summary.items.map((item) => `
            <article class="asalna-glass rounded-3xl p-4 grid sm:grid-cols-[120px_1fr_auto] gap-4 reveal">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-[120px] object-cover rounded-2xl bg-gradient-to-b from-[#f7e3b8] to-[#e6c580]">
              <div>
                <span class="badge-pill">${item.product.badge}</span>
                <h3 class="text-3xl font-display mt-2">${item.product.name}</h3>
                <p class="text-sm text-[#3a2818bf] mt-1">${item.product.short}</p>
                <p class="font-bold mt-2">${window.Asalna.money(item.product.price)}</p>
              </div>
              <div class="flex flex-col items-end justify-between gap-3">
                <div class="inline-flex rounded-full border border-[#2e1d11]/20 overflow-hidden">
                  <button class="px-4 py-2" data-minus="${item.product.id}">-</button>
                  <input class="w-14 text-center bg-transparent" value="${item.quantity}" readonly>
                  <button class="px-4 py-2" data-plus="${item.product.id}">+</button>
                </div>
                <button class="btn-soft text-sm" data-remove="${item.product.id}">Remove</button>
              </div>
            </article>
          `).join('') : `<div class="asalna-glass rounded-3xl p-10 text-center">Your cart is empty.</div>`}
        </div>

        <aside class="asalna-glass rounded-3xl p-5 h-fit lg:sticky lg:top-24 reveal">
          <p class="section-kicker">Summary</p>
          <h2 class="text-4xl font-display">Your Cart</h2>
          <div class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between"><span>Subtotal</span><strong>${window.Asalna.money(summary.subtotal)}</strong></div>
            <div class="flex justify-between"><span>Shipping</span><strong>${window.Asalna.money(summary.shipping)}</strong></div>
            <div class="flex justify-between"><span>Discount</span><strong>${window.Asalna.money(summary.discount)}</strong></div>
            <div class="flex justify-between text-base font-bold pt-2 border-t border-[#2e1d11]/10"><span>Total</span><strong>${window.Asalna.money(summary.total)}</strong></div>
          </div>
          <div class="mt-4 space-y-2">
            <input id="couponInput" class="asalna-input" placeholder="Coupon code (ASALNA10)">
            <button id="applyCoupon" class="btn-soft w-full">Apply Coupon</button>
          </div>
          <div class="mt-5 grid gap-2">
            <a href="checkout.html" class="btn-gold w-full text-center">Proceed to Checkout</a>
            <button id="clearCartBtn" class="btn-soft w-full">Clear Cart</button>
          </div>
        </aside>
      </div>
    `;

    root.querySelectorAll('[data-minus]').forEach((button) => {
      button.onclick = () => {
        const id = Number(button.dataset.minus);
        const row = window.Asalna.cartItemsDetailed().find((item) => item.product.id === id);
        if (!row) return;
        window.Asalna.updateCartItem(id, row.quantity - 1);
        render();
      };
    });

    root.querySelectorAll('[data-plus]').forEach((button) => {
      button.onclick = () => {
        const id = Number(button.dataset.plus);
        const row = window.Asalna.cartItemsDetailed().find((item) => item.product.id === id);
        if (!row) return;
        window.Asalna.updateCartItem(id, row.quantity + 1);
        render();
      };
    });

    root.querySelectorAll('[data-remove]').forEach((button) => {
      button.onclick = () => {
        window.Asalna.removeFromCart(Number(button.dataset.remove));
        render();
      };
    });

    document.getElementById('applyCoupon').onclick = render;
    document.getElementById('clearCartBtn').onclick = () => { window.Asalna.clearCart(); render(); };
    window.Asalna.applyReveal();
  }

  render();
})();
