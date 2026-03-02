(function () {
  function renderShop(filter = 'all') {
    const grid = document.getElementById('shopGrid');
    if (!grid || !window.ASALNA_PRODUCTS || !window.AsalnaI18n) return;

    const products = window.ASALNA_PRODUCTS.filter((product) => {
      if (filter === 'all') return true;
      return product.category === filter;
    });

    grid.innerHTML = products
      .map((product) => {
        const item = window.AsalnaI18n.getLocalizedProduct(product);
        return `
          <article class="product-card reveal-rise">
            <img src="${item.image}" alt="${item.displayName}" loading="lazy">
            <div class="card-body">
              <p class="section-kicker">${item.displayCategory}</p>
              <h2 class="font-display text-2xl text-honeyDark mt-2">${item.displayName}</h2>
              <p class="text-sm text-charcoal/70 mt-3">${item.displayDescription}</p>
              <div class="mt-5 flex items-center justify-between gap-3">
                <span class="text-xl font-bold text-honeyDark">${window.AsalnaI18n.formatPrice(item.price)}</span>
                <div class="flex gap-2">
                  <a href="product.html?id=${item.id}" class="px-4 py-2 rounded-full border border-honeyGold/30 text-sm font-semibold hover:bg-honeyLight transition">${window.AsalnaI18n.t('details')}</a>
                  <button class="btn-premium text-sm px-4 py-2 add-cart" data-id="${item.id}">${window.AsalnaI18n.t('add')}</button>
                  <button class="px-4 py-2 rounded-full border border-honeyGold/30 text-sm font-semibold hover:bg-honeyLight transition quick-view" data-id="${item.id}">${window.AsalnaI18n.t('quickView')}</button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    if (window.AsalnaCart) {
      document.querySelectorAll('.add-cart').forEach((button) => {
        button.addEventListener('click', function () {
          const id = button.getAttribute('data-id');
          if (id) window.AsalnaCart.addToCart(id, 1);
        });
      });

      document.querySelectorAll('.quick-view').forEach((button) => {
        button.addEventListener('click', function () {
          const id = button.getAttribute('data-id');
          if (!id) return;
          const modal = document.getElementById('quickViewModal');
          if (!modal) return;

          const product = window.ASALNA_PRODUCTS.find((item) => item.id === id);
          if (!product) return;
          const item = window.AsalnaI18n.getLocalizedProduct(product);

          const modalImage = document.getElementById('modalImage');
          const modalCategory = document.getElementById('modalCategory');
          const modalName = document.getElementById('modalName');
          const modalDescription = document.getElementById('modalDescription');
          const modalPrice = document.getElementById('modalPrice');
          const modalAddToCart = document.getElementById('modalAddToCart');

          if (modalImage) {
            modalImage.src = item.image;
            modalImage.alt = item.displayName;
          }
          if (modalCategory) modalCategory.textContent = item.displayCategory;
          if (modalName) modalName.textContent = item.displayName;
          if (modalDescription) modalDescription.textContent = item.displayDescription;
          if (modalPrice) modalPrice.textContent = window.AsalnaI18n.formatPrice(item.price);
          if (modalAddToCart) {
            modalAddToCart.textContent = window.AsalnaI18n.t('add');
            modalAddToCart.onclick = function () {
              window.AsalnaCart.addToCart(item.id, 1);
            };
          }

          modal.classList.remove('hidden');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        });
      });
    }

    const reveals = document.querySelectorAll('.reveal-rise');
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        buttons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        renderShop(button.getAttribute('data-filter') || 'all');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderShop();
    initFilters();
  });

  window.addEventListener('asalna:langchange', function () {
    const activeFilter = document.querySelector('.filter-btn.active');
    renderShop((activeFilter && activeFilter.getAttribute('data-filter')) || 'all');
  });
})();
