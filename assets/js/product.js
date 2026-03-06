(function () {
  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'sidr-honey';
  }

  function createThumbs(product) {
    const thumbs = document.getElementById('galleryThumbs');
    if (!thumbs) return;
    const gallery = [product.image, product.image, product.image];
    thumbs.innerHTML = gallery.map((img, index) => `
      <button class="thumb-frame ${index === 0 ? 'is-active' : ''}" data-src="${img}">
        <img src="${img}" alt="${product.displayName} gallery image ${index + 1}" loading="lazy">
      </button>
    `).join('');

    const mainImage = document.getElementById('productMainImage');
    thumbs.querySelectorAll('.thumb-frame').forEach((button) => {
      button.addEventListener('click', () => {
        thumbs.querySelectorAll('.thumb-frame').forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        if (mainImage) {
          const src = button.getAttribute('data-src');
          if (src) mainImage.src = src;
        }
      });
    });
  }

  function fillTabs(product) {
    const lang = window.AsalnaI18n.getLang();
    const display = window.AsalnaI18n.getLocalizedProduct(product);
    const ingredientsList = lang === 'ar' ? product.ingredientsAr : product.ingredients;
    const benefitsList = lang === 'ar' ? product.benefitsAr : product.benefits;
    const reviewsList = lang === 'ar' ? product.reviewsAr : product.reviews;

    document.getElementById('tab-description').innerHTML = `<p>${display.displayDescription}</p>`;
    document.getElementById('tab-ingredients').innerHTML = `<ul class="list-block">${ingredientsList.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    document.getElementById('tab-benefits').innerHTML = `<ul class="list-block">${benefitsList.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    document.getElementById('tab-reviews').innerHTML = reviewsList.map((review) => `
      <article class="contact-panel mb-3">
        <p>"${review}"</p>
        <span class="story-step mt-4 inline-flex">${window.AsalnaI18n.t('verifiedBuyer')}</span>
      </article>
    `).join('');
  }

  function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        if (!tab) return;
        buttons.forEach((item) => {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        document.getElementById(`tab-${tab}`).classList.add('active');
      });
    });
  }

  function initQuantity(product) {
    const input = document.getElementById('quantity');
    document.getElementById('qtyMinus').onclick = () => { input.value = String(Math.max(1, Number(input.value || 1) - 1)); };
    document.getElementById('qtyPlus').onclick = () => { input.value = String(Math.max(1, Number(input.value || 1) + 1)); };
    document.getElementById('addProductToCart').onclick = () => {
      const quantity = Math.max(1, Number(input.value || 1));
      window.AsalnaCart.addToCart(product.id, quantity);
    };
  }

  function renderProduct() {
    if (!window.ASALNA_PRODUCTS || !window.AsalnaI18n) return;
    const sourceProduct = window.ASALNA_PRODUCTS.find((item) => item.id === getProductIdFromUrl()) || window.ASALNA_PRODUCTS[0];
    const product = window.AsalnaI18n.getLocalizedProduct(sourceProduct);
    document.getElementById('productCategory').textContent = product.displayCategory;
    document.getElementById('productName').textContent = product.displayName;
    document.getElementById('productPrice').textContent = window.AsalnaI18n.formatPrice(product.price);
    document.getElementById('productSummary').textContent = product.displayDescription;
    document.getElementById('productMainImage').src = product.image;
    document.getElementById('productMainImage').alt = product.displayName;
    document.getElementById('addProductToCart').textContent = window.AsalnaI18n.t('add');
    createThumbs(product);
    fillTabs(sourceProduct);
    initTabs();
    initQuantity(sourceProduct);
  }

  document.addEventListener('DOMContentLoaded', renderProduct);
  window.addEventListener('asalna:langchange', renderProduct);
})();
