(function () {
  const root = document.getElementById('shopRoot');
  if (!root) return;
  const ar = window.Asalna.isArabic();

  let products = window.Asalna.getProducts();

  function card(product) {
    return `
      <article class="asalna-glass product-card floating-card reveal">
        <img src="${product.image}" alt="${product.name}">
        <div class="p-3">
          <div class="flex items-center justify-between gap-2">
            <span class="section-kicker">${window.Asalna.localCategory(product.category)}</span>
            <span class="badge-pill">${window.Asalna.localBadge(product.badge)}</span>
          </div>
          <h3 class="text-3xl font-display mt-2">${ar ? (product.nameAr || product.name) : product.name}</h3>
          <p class="text-sm text-[#3a2818bf] mt-2">${ar ? product.description : product.short}</p>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2"><span class="font-extrabold">${window.Asalna.money(product.price)}</span>${product.oldPrice ? `<span class="text-xs line-through text-[#3a28188a]">${window.Asalna.money(product.oldPrice)}</span>` : ''}</div>
            <span class="text-xs font-bold">${product.rating}★</span>
          </div>
          <div class="flex gap-2 mt-4">
            <a href="product.html?id=${product.id}" class="btn-soft text-sm">${ar ? 'التفاصيل' : 'Details'}</a>
            <button class="btn-gold text-sm" data-add="${product.id}">${ar ? 'إضافة' : 'Add'}</button>
          </div>
        </div>
      </article>
    `;
  }

  function paint(list) {
    root.innerHTML = list.length ? list.map(card).join('') : `<div class="asalna-glass rounded-3xl p-8 text-center">${ar ? 'لا توجد منتجات مطابقة.' : 'No products found.'}</div>`;
    root.querySelectorAll('[data-add]').forEach((button) => {
      button.addEventListener('click', () => {
        window.Asalna.addToCart(Number(button.dataset.add), 1);
        window.Asalna.toast(ar ? 'تمت الإضافة إلى السلة' : 'Added to cart');
      });
    });
    window.Asalna.applyReveal();
  }

  function applyFilters() {
    const search = (document.getElementById('searchInput').value || '').toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const min = Number(document.getElementById('minPrice').value || 0);
    const max = Number(document.getElementById('maxPrice').value || 9999999);
    const sort = document.getElementById('sortFilter').value;

    let filtered = products.filter((product) => {
      const hay = `${product.name} ${product.nameAr} ${product.description}`.toLowerCase();
      return (!category || product.category === category) && hay.includes(search) && product.price >= min && product.price <= max;
    });

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    paint(filtered);
  }

  ['searchInput', 'categoryFilter', 'minPrice', 'maxPrice', 'sortFilter'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.addEventListener('input', applyFilters);
    if (node) node.addEventListener('change', applyFilters);
  });

  paint(products);
})();
