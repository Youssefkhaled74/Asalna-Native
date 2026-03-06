(function () {
  function createCard(product) {
    const item = window.AsalnaI18n.getLocalizedProduct(product);
    return `
      <article class="product-card reveal-rise">
        <img src="${item.image}" alt="${item.displayName}" loading="lazy">
        <div class="card-body">
          <div class="card-topline">
            <div>
              <p class="section-kicker">${item.displayCategory}</p>
              <h2 class="font-display text-4xl text-[#24170c] mt-3">${item.displayName}</h2>
            </div>
            <span class="price-pill">${window.AsalnaI18n.formatPrice(item.price)}</span>
          </div>
          <p class="card-blurb">${item.displayDescription}</p>
          <div class="card-actions">
            <a href="product.html?id=${item.id}" class="btn-ghost">${window.AsalnaI18n.t('details')}</a>
            <button class="btn-premium add-cart" data-id="${item.id}">${window.AsalnaI18n.t('add')}</button>
            <button class="btn-ghost quick-view" data-id="${item.id}">${window.AsalnaI18n.t('quickView')}</button>
          </div>
        </div>
      </article>
    `;
  }

  function wireActions() {
    document.querySelectorAll('.add-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (id) window.AsalnaCart.addToCart(id, 1);
      });
    });

    document.querySelectorAll('.quick-view').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (!id) return;
        const product = window.ASALNA_PRODUCTS.find((item) => item.id === id);
        if (!product) return;
        const item = window.AsalnaI18n.getLocalizedProduct(product);
        const modal = document.getElementById('quickViewModal');
        if (!modal) return;
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.displayName;
        document.getElementById('modalCategory').textContent = item.displayCategory;
        document.getElementById('modalName').textContent = item.displayName;
        document.getElementById('modalDescription').textContent = item.displayDescription;
        document.getElementById('modalPrice').textContent = window.AsalnaI18n.formatPrice(item.price);
        const addButton = document.getElementById('modalAddToCart');
        addButton.textContent = window.AsalnaI18n.t('add');
        addButton.onclick = () => window.AsalnaCart.addToCart(item.id, 1);
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function renderShop(filter) {
    const activeFilter = filter || 'all';
    const grid = document.getElementById('shopGrid');
    if (!grid || !window.ASALNA_PRODUCTS || !window.AsalnaI18n) return;
    const products = window.ASALNA_PRODUCTS.filter((product) => activeFilter === 'all' || product.category === activeFilter);
    grid.innerHTML = products.map(createCard).join('');
    grid.querySelectorAll('.reveal-rise').forEach((item) => item.classList.add('is-visible'));
    wireActions();
  }

  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        renderShop(button.getAttribute('data-filter') || 'all');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderShop();
    initFilters();
  });

  window.addEventListener('asalna:langchange', () => {
    const active = document.querySelector('.filter-btn.active');
    renderShop((active && active.getAttribute('data-filter')) || 'all');
  });
})();
