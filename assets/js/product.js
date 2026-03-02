(function () {
  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'sidr-honey';
  }

  function createThumbs(product) {
    const thumbs = document.getElementById('galleryThumbs');
    if (!thumbs) return;

    const gallery = [product.image, product.image, product.image];
    thumbs.innerHTML = gallery
      .map(
        (img, index) => `
        <button class="rounded-2xl overflow-hidden border ${index === 0 ? 'border-honeyGold' : 'border-honeyGold/25'} thumb-btn" data-src="${img}">
          <img src="${img}" alt="${product.displayName} gallery image ${index + 1}" class="w-full h-24 object-cover" loading="lazy">
        </button>
      `
      )
      .join('');

    const mainImage = document.getElementById('productMainImage');
    thumbs.querySelectorAll('.thumb-btn').forEach((button) => {
      button.addEventListener('click', function () {
        thumbs.querySelectorAll('.thumb-btn').forEach((item) => item.classList.remove('border-honeyGold'));
        button.classList.add('border-honeyGold');
        if (mainImage) {
          const src = button.getAttribute('data-src');
          if (src) mainImage.src = src;
        }
      });
    });
  }

  function fillTabs(product) {
    const desc = document.getElementById('tab-description');
    const ingredients = document.getElementById('tab-ingredients');
    const benefits = document.getElementById('tab-benefits');
    const reviews = document.getElementById('tab-reviews');
    const lang = window.AsalnaI18n.getLang();

    const display = window.AsalnaI18n.getLocalizedProduct(product);
    if (desc) desc.innerHTML = `<p>${display.displayDescription}</p>`;
    if (ingredients) {
      const ingredientsList = lang === 'ar' ? product.ingredientsAr : product.ingredients;
      ingredients.innerHTML = `<ul class="list-disc pl-5">${ingredientsList.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    }
    if (benefits) {
      const benefitsList = lang === 'ar' ? product.benefitsAr : product.benefits;
      benefits.innerHTML = `<ul class="list-disc pl-5">${benefitsList.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    }
    if (reviews) {
      const reviewsList = lang === 'ar' ? product.reviewsAr : product.reviews;
      reviews.innerHTML = reviewsList
        .map(
          (review) => `
          <article class="bg-[#fffaf2] border border-honeyGold/20 rounded-2xl p-4 mb-3">
            <p>"${review}"</p>
            <p class="text-xs uppercase tracking-[0.2em] mt-2 text-honeyGold">Verified Buyer</p>
          </article>
        `
        )
        .join('');
    }
  }

  function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const tab = button.getAttribute('data-tab');
        if (!tab) return;

        buttons.forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });

        document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        const panel = document.getElementById(`tab-${tab}`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function initQuantity(product) {
    const input = document.getElementById('quantity');
    const minus = document.getElementById('qtyMinus');
    const plus = document.getElementById('qtyPlus');
    const addButton = document.getElementById('addProductToCart');

    if (!input || !minus || !plus || !addButton || !window.AsalnaCart) return;

    minus.onclick = function () {
      const value = Math.max(1, Number(input.value || 1) - 1);
      input.value = String(value);
    };

    plus.onclick = function () {
      const value = Math.max(1, Number(input.value || 1) + 1);
      input.value = String(value);
    };

    addButton.onclick = function () {
      const quantity = Math.max(1, Number(input.value || 1));
      window.AsalnaCart.addToCart(product.id, quantity);
    };
  }

  function renderProduct() {
    if (!window.ASALNA_PRODUCTS || !window.AsalnaI18n) return;

    const productId = getProductIdFromUrl();
    const sourceProduct = window.ASALNA_PRODUCTS.find((item) => item.id === productId) || window.ASALNA_PRODUCTS[0];
    if (!sourceProduct) return;
    const product = window.AsalnaI18n.getLocalizedProduct(sourceProduct);

    const category = document.getElementById('productCategory');
    const name = document.getElementById('productName');
    const price = document.getElementById('productPrice');
    const summary = document.getElementById('productSummary');
    const image = document.getElementById('productMainImage');
    const addBtn = document.getElementById('addProductToCart');

    if (category) category.textContent = product.displayCategory;
    if (name) name.textContent = product.displayName;
    if (price) price.textContent = window.AsalnaI18n.formatPrice(product.price);
    if (summary) summary.textContent = product.displayDescription;
    if (image) {
      image.src = product.image;
      image.alt = product.displayName;
    }
    if (addBtn) addBtn.textContent = window.AsalnaI18n.t('add');

    createThumbs(product);
    fillTabs(sourceProduct);
    initTabs();
    initQuantity(sourceProduct);
  }

  document.addEventListener('DOMContentLoaded', renderProduct);
  window.addEventListener('asalna:langchange', renderProduct);
})();
