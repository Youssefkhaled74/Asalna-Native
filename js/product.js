(function () {
  const root = document.getElementById('productPage');
  if (!root) return;

  const id = Number(new URLSearchParams(window.location.search).get('id') || 1);
  const product = window.Asalna.getProductById(id) || window.Asalna.getProducts()[0];
  if (!product) return;

  const related = window.Asalna.getProducts().filter((item) => item.id !== product.id).slice(0, 4);

  root.innerHTML = `
    <section class="asalna-glass rounded-[2rem] p-4 md:p-6 grid lg:grid-cols-[1.1fr_.9fr] gap-6 reveal">
      <div>
        <div id="mainImageWrap" class="rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-[#f7e3b8] to-[#e6c580] cursor-zoom-in">
          <img id="mainImage" src="${product.image}" alt="${product.name}" class="w-full aspect-[1/.9] object-cover transition duration-300">
        </div>
        <div class="grid grid-cols-4 gap-3 mt-3">
          ${[product.image, product.image, product.image, product.image].map((image, idx) => `<button class="rounded-2xl overflow-hidden border border-[#2e1d11]/10 thumb-btn ${idx === 0 ? 'ring-2 ring-[#d89b2d]' : ''}" data-src="${image}"><img src="${image}" alt="thumb" class="w-full h-20 object-cover"></button>`).join('')}
        </div>
      </div>
      <aside class="asalna-glass rounded-[1.6rem] p-5 lg:sticky lg:top-24 h-fit">
        <span class="badge-pill">${product.badge}</span>
        <h1 class="text-5xl font-display mt-3">${product.name}</h1>
        <p class="text-[#3a2818bf] mt-3">${product.description}</p>
        <div class="mt-4 flex items-center gap-3"><strong class="text-2xl">${window.Asalna.money(product.price)}</strong>${product.oldPrice ? `<span class="line-through text-[#3a28188f]">${window.Asalna.money(product.oldPrice)}</span>` : ''}<span class="badge-pill">${product.rating}★</span></div>
        <div class="mt-4 grid gap-3 text-sm">
          <p><strong>Origin:</strong> ${product.origin}</p>
          <p><strong>Taste Notes:</strong> ${product.notes}</p>
        </div>
        <ul class="mt-4 space-y-2 text-sm text-[#3a2818cb]">${product.benefits.map((item) => `<li>• ${item}</li>`).join('')}</ul>
        <div class="mt-5 flex items-center gap-3">
          <div class="inline-flex rounded-full border border-[#2e1d11]/20 overflow-hidden">
            <button class="px-4 py-2" id="qtyMinus">-</button>
            <input id="qtyInput" type="number" value="1" min="1" class="w-14 text-center bg-transparent outline-none">
            <button class="px-4 py-2" id="qtyPlus">+</button>
          </div>
          <button class="btn-gold" id="addProductBtn">Add to Cart</button>
        </div>
      </aside>
    </section>

    <section class="mt-12">
      <div class="flex items-end justify-between gap-4 mb-5 reveal">
        <div><p class="section-kicker">Related</p><h2 class="text-5xl font-display">You may also like</h2></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${related.map((item) => `<article class="asalna-glass product-card reveal"><img src="${item.image}" alt="${item.name}"><div class="p-3"><h3 class="font-display text-3xl">${item.name}</h3><p class="text-sm text-[#3a2818bf]">${item.short}</p><div class="mt-3 flex justify-between items-center"><span class="font-bold">${window.Asalna.money(item.price)}</span><a class="btn-soft text-sm" href="product.html?id=${item.id}">View</a></div></div></article>`).join('')}
      </div>
    </section>
  `;

  document.querySelectorAll('.thumb-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.thumb-btn').forEach((item) => item.classList.remove('ring-2', 'ring-[#d89b2d]'));
      button.classList.add('ring-2', 'ring-[#d89b2d]');
      document.getElementById('mainImage').src = button.dataset.src;
    });
  });

  const mainWrap = document.getElementById('mainImageWrap');
  const mainImage = document.getElementById('mainImage');
  mainWrap.addEventListener('mousemove', (event) => {
    const rect = mainWrap.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mainImage.style.transformOrigin = `${x}% ${y}%`;
  });
  mainWrap.addEventListener('mouseenter', () => { mainImage.style.transform = 'scale(1.45)'; });
  mainWrap.addEventListener('mouseleave', () => { mainImage.style.transform = 'scale(1)'; });

  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').onclick = () => { qtyInput.value = String(Math.max(1, Number(qtyInput.value) - 1)); };
  document.getElementById('qtyPlus').onclick = () => { qtyInput.value = String(Number(qtyInput.value) + 1); };
  document.getElementById('addProductBtn').onclick = () => {
    window.Asalna.addToCart(product.id, Number(qtyInput.value || 1));
    window.Asalna.toast('Added to cart');
  };

  window.Asalna.applyReveal();
})();
