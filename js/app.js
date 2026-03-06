(function () {
  const PRODUCT_KEY = 'asalna_products';
  const CART_KEY = 'asalna_cart';
  const ORDER_KEY = 'asalna_orders';
  const LANG_KEY = 'asalna_lang';

  const defaultProducts = [
    { id: 1, slug: 'sidr-honey', name: 'Sidr Honey', nameAr: 'عسل سدر', category: 'Signature', price: 420, oldPrice: 480, rating: 4.9, badge: 'Limited', image: 'assets/images/honey-sidr.jpg', short: 'Deep amber body with rich floral warmth.', description: 'Rare premium sidr honey with deep aroma, dense body, and ceremonial finish.', origin: 'Siwa desert bloom', notes: 'Resin, toasted blossom, warm wood', benefits: ['Natural energy', 'Dense texture', 'Premium gifting'], tags: ['organic', 'raw', 'best'] },
    { id: 2, slug: 'clover-honey', name: 'Clover Honey', nameAr: 'عسل البرسيم', category: 'Daily', price: 220, oldPrice: 260, rating: 4.7, badge: 'Raw', image: 'assets/images/honey-raw.jpg', short: 'Silky and bright for daily rituals.', description: 'Smooth clover honey with clean sweetness and soft floral aroma.', origin: 'Nile Delta fields', notes: 'White blossom, vanilla', benefits: ['Daily sweetness', 'Tea pairing', 'Smooth finish'], tags: ['raw'] },
    { id: 3, slug: 'black-seed-honey', name: 'Black Seed Honey', nameAr: 'عسل الحبة السوداء', category: 'Wellness', price: 310, oldPrice: null, rating: 4.8, badge: 'Organic', image: 'assets/images/honey-blackseed.jpg', short: 'Bold wellness blend with deeper profile.', description: 'Powerful blend combining pure honey and black seed character.', origin: 'Upper Egypt farms', notes: 'Spice, herbs, roasted depth', benefits: ['Balanced warmth', 'Aromatic depth', 'Daily routine'], tags: ['organic', 'best'] },
    { id: 4, slug: 'mountain-honey', name: 'Mountain Honey', nameAr: 'عسل جبلي', category: 'Signature', price: 295, oldPrice: 340, rating: 4.9, badge: 'Best Seller', image: 'assets/images/honey-mountain.jpg', short: 'Mineral rich profile from mountain blooms.', description: 'Complex mountain harvest with earthy sweetness and lingering finish.', origin: 'South Sinai heights', notes: 'Wild thyme, cedar', benefits: ['Mineral profile', 'Distinct aftertaste', 'Craft harvest'], tags: ['raw', 'best'] },
    { id: 5, slug: 'citrus-blossom-honey', name: 'Citrus Blossom Honey', nameAr: 'عسل زهر الحمضيات', category: 'Fresh', price: 245, oldPrice: null, rating: 4.8, badge: 'Fresh Drop', image: 'assets/images/honey-citrus.jpg', short: 'Bright citrus blossom aroma and clean finish.', description: 'Fresh and elegant citrus blossom honey with light aromatic lift.', origin: 'Sharqia citrus groves', notes: 'Orange flower, white tea', benefits: ['Fresh aroma', 'Versatile pairing', 'Soft sweetness'], tags: ['organic'] },
    { id: 6, slug: 'royal-honey-mix', name: 'Royal Honey Mix', nameAr: 'رويال هاني ميكس', category: 'Wellness', price: 520, oldPrice: 590, rating: 4.9, badge: 'Premium', image: 'assets/images/hero.jpg', short: 'Ceremonial blend crafted for premium routine.', description: 'Dense luxury honey blend designed for focused daily rituals.', origin: 'Curated Egyptian blend', notes: 'Dark blossom, pollen', benefits: ['Luxury blend', 'Dense spoon texture', 'Gift-worthy'], tags: ['organic', 'limited'] },
    { id: 7, slug: 'honeycomb-edition', name: 'Honeycomb Edition', nameAr: 'شمع العسل', category: 'Raw Craft', price: 390, oldPrice: null, rating: 4.8, badge: 'Raw', image: 'assets/images/honey-wildflower.jpg', short: 'Natural comb structure, striking table presence.', description: 'Raw cut honeycomb with jewel-like presentation and natural flow.', origin: 'Canal apiaries', notes: 'Cell wax, bright nectar', benefits: ['Raw comb texture', 'Hosting centerpiece', 'Premium serving'], tags: ['raw', 'limited'] },
    { id: 8, slug: 'asalna-gift-box', name: 'Asalna Gift Box', nameAr: 'بوكس أصلنا', category: 'Gift', price: 890, oldPrice: 980, rating: 5.0, badge: 'Limited', image: 'assets/images/about.jpg', short: 'Curated premium gift collection from Asalna.', description: 'Signature jars arranged in an artistic premium gift box.', origin: 'Curated across Egypt', notes: 'Mixed floral library', benefits: ['Premium gifting', 'Curated selection', 'Memorable unboxing'], tags: ['best', 'limited'] }
  ];

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === 'ar' ? 'ar' : 'en';
  }

  function setLang(lang) {
    const next = lang === 'ar' ? 'ar' : 'en';
    localStorage.setItem(LANG_KEY, next);
    applyLang();
  }

  function applyLang() {
    const lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', lang === 'ar');
  }

  function isArabic() {
    return getLang() === 'ar';
  }

  function tr(en, ar) {
    return isArabic() ? ar : en;
  }

  function localCategory(category) {
    const map = {
      Signature: 'التوقيع',
      Daily: 'يومي',
      Wellness: 'صحة',
      Fresh: 'منعش',
      'Raw Craft': 'خام فاخر',
      Gift: 'هدايا'
    };
    return isArabic() ? (map[category] || category) : category;
  }

  function localBadge(badge) {
    const map = {
      Limited: 'إصدار محدود',
      Raw: 'خام',
      Organic: 'عضوي',
      'Best Seller': 'الأكثر مبيعًا',
      'Fresh Drop': 'دفعة جديدة',
      Premium: 'فاخر'
    };
    if (!badge) return isArabic() ? 'عسلنا' : 'Asalna';
    return isArabic() ? (map[badge] || badge) : badge;
  }

  function ensureData() {
    const existing = readJSON(PRODUCT_KEY, null);
    if (!existing || !Array.isArray(existing) || !existing.length) {
      writeJSON(PRODUCT_KEY, defaultProducts);
      return;
    }

    const fallbackById = Object.fromEntries(defaultProducts.map((p) => [p.id, p.image]));
    const migrated = existing.map((item) => {
      const broken = !item.image || item.image.includes('.svg') || item.image.includes('facebook-cover.png');
      if (!broken) return item;
      return { ...item, image: fallbackById[item.id] || 'assets/images/hero.jpg' };
    });
    writeJSON(PRODUCT_KEY, migrated);
  }

  ensureData();

  function getProducts() { return readJSON(PRODUCT_KEY, defaultProducts); }
  function getProductById(id) { return getProducts().find((p) => p.id === Number(id)); }
  function getCart() { return readJSON(CART_KEY, []); }
  function saveCart(cart) { writeJSON(CART_KEY, cart); updateCartCount(); }
  function clearCart() { saveCart([]); }

  function addToCart(productId, quantity) {
    const qty = Math.max(1, Number(quantity || 1));
    const product = getProductById(productId);
    if (!product) return;
    const cart = getCart();
    const current = cart.find((item) => item.productId === product.id);
    if (current) current.quantity += qty;
    else cart.push({ productId: product.id, quantity: qty });
    saveCart(cart);
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((item) => item.productId !== Number(productId)));
  }

  function updateCartItem(productId, quantity) {
    const next = getCart().map((item) => {
      if (item.productId !== Number(productId)) return item;
      return { ...item, quantity: Math.max(1, Number(quantity || 1)) };
    });
    saveCart(next);
  }

  function cartItemsDetailed() {
    return getCart().map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.quantity };
    }).filter(Boolean);
  }

  function cartSummary(coupon) {
    const items = cartItemsDetailed();
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = subtotal >= 700 || subtotal === 0 ? 0 : 65;
    const discount = String(coupon || '').trim().toUpperCase() === 'ASALNA10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total, items };
  }

  function getOrders() { return readJSON(ORDER_KEY, []); }
  function saveOrders(orders) { writeJSON(ORDER_KEY, orders); }

  function createOrder(payload) {
    const existing = getOrders();
    const summary = cartSummary(payload.coupon || '');
    const order = {
      id: `AS-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
      customer: {
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        notes: payload.notes || ''
      },
      items: summary.items,
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      discount: summary.discount,
      total: summary.total
    };
    existing.unshift(order);
    saveOrders(existing);
    clearCart();
    return order;
  }

  function money(value) {
    return new Intl.NumberFormat(isArabic() ? 'ar-EG' : 'en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value || 0));
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((node) => {
      node.textContent = String(count);
    });
  }

  function toast(message) {
    const old = document.getElementById('asalna-toast');
    if (old) old.remove();
    const node = document.createElement('div');
    node.id = 'asalna-toast';
    node.className = 'fixed bottom-4 right-4 z-[60] rounded-2xl px-4 py-3 text-sm font-semibold text-white';
    node.style.background = 'rgba(33,22,13,.9)';
    node.style.boxShadow = '0 16px 34px rgba(30,19,11,.35)';
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2500);
  }

  function applyReveal() {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    nodes.forEach((node) => observer.observe(node));
  }

  function initParallax() {
    const targets = document.querySelectorAll('[data-parallax]');
    if (!targets.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      targets.forEach((node) => {
        const speed = Number(node.getAttribute('data-parallax')) || 0.08;
        node.style.transform = `translateY(${y * speed}px)`;
      });
    });
  }

  function nav(active) {
    const lang = getLang();
    const labels = {
      en: { index: 'Home', shop: 'Shop', about: 'About', contact: 'Contact', orders: 'Orders', admin: 'Admin', cart: 'Cart' },
      ar: { index: 'الرئيسية', shop: 'المتجر', about: 'عن أصلنا', contact: 'تواصل', orders: 'الطلبات', admin: 'الإدارة', cart: 'السلة' }
    };
    return `
      <div class="asalna-nav flex items-center justify-between gap-3 reveal">
        <a href="index.html" class="flex items-center gap-3 text-[#fff7e8]">
          <img src="assets/images/hero.jpg" alt="Asalna" class="w-11 h-11 rounded-full bg-white/10 p-1.5 object-cover">
          <div>
            <strong class="block tracking-[0.04em]">ASALNA</strong>
            <span class="text-[10px] uppercase tracking-[0.22em] text-[#f8e6c4b0]">عسلنا</span>
          </div>
        </a>
        <div class="hidden md:flex items-center gap-1">
          ${['index', 'shop', 'about', 'contact', 'orders', 'admin'].map((slug) => {
            const href = `${slug}.html`;
            return `<a class="asalna-nav-link ${active === slug ? 'active' : ''}" href="${href}">${labels[lang][slug]}</a>`;
          }).join('')}
        </div>
        <div class="flex items-center gap-2">
          <button id="asalna-lang-toggle" class="asalna-nav-link" type="button">${lang === 'ar' ? 'EN' : 'AR'}</button>
          <a href="cart.html" class="asalna-nav-link active !text-white flex items-center gap-2">${labels[lang].cart} <span class="inline-grid place-items-center rounded-full bg-[#d89b2d] min-w-[1.35rem] h-5 px-1 text-[11px]" data-cart-count>0</span></a>
        </div>
      </div>
    `;
  }

  function footer() {
    const l = isArabic();
    return `
      <footer class="footer-shell reveal mt-16">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-2xl font-display">ASALNA</h3>
            <p class="mt-2 text-sm text-[#f6e8cccf]">${l ? 'بيت عسل مصري فاخر يجمع بين الحصاد الطبيعي والتصميم المعاصر.' : 'Premium Egyptian honey house shaped by golden harvests and modern design.'}</p>
          </div>
          <div>
            <h4 class="uppercase tracking-[0.2em] text-xs text-[#f6e8cca8]">${l ? 'استكشف' : 'Explore'}</h4>
            <div class="mt-3 flex flex-col gap-2 text-sm text-[#fff0d6e0]">
              <a href="shop.html">${l ? 'المتجر' : 'Shop'}</a><a href="about.html">${l ? 'عن أصلنا' : 'About'}</a><a href="orders.html">${l ? 'الطلبات' : 'Orders'}</a>
            </div>
          </div>
          <div>
            <h4 class="uppercase tracking-[0.2em] text-xs text-[#f6e8cca8]">${l ? 'تواصل' : 'Contact'}</h4>
            <div class="mt-3 text-sm text-[#fff0d6e0] space-y-2"><p>hello@asalna.com</p><p>+20 100 000 0000</p><p>Cairo, Egypt</p></div>
          </div>
          <div>
            <h4 class="uppercase tracking-[0.2em] text-xs text-[#f6e8cca8]">${l ? 'ملاحظات' : 'Notes'}</h4>
            <p class="mt-3 text-sm text-[#f6e8cccf]">${l ? 'الطلبات والسلة تُحفظ محليًا بمنطق كامل في الواجهة بدون أي خادم.' : 'Orders and cart are saved locally with full frontend logic and no backend required.'}</p>
          </div>
        </div>
      </footer>
    `;
  }

  window.Asalna = {
    getProducts,
    getProductById,
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    cartItemsDetailed,
    cartSummary,
    getOrders,
    createOrder,
    money,
    toast,
    nav,
    footer,
    updateCartCount,
    applyReveal,
    initParallax,
    getLang,
    setLang,
    applyLang,
    isArabic,
    tr,
    localCategory,
    localBadge
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.Asalna.applyLang();
    window.Asalna.updateCartCount();
    document.body.addEventListener('click', (event) => {
      const target = event.target.closest('#asalna-lang-toggle');
      if (!target) return;
      const next = window.Asalna.getLang() === 'ar' ? 'en' : 'ar';
      window.Asalna.setLang(next);
      window.location.reload();
    });
  });
})();
