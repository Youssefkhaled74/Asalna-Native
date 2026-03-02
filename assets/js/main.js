(function () {
  const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  let currentLang = localStorage.getItem('asalna_lang') || 'en';

  const I18N = {
    en: {
      navHome: 'Home',
      navShop: 'Shop',
      navAbout: 'About',
      navContact: 'Contact',
      navCart: 'Cart',
      footerBrand: 'Luxury organic honey crafted with purity, integrity, and premium taste.',
      footerQuickLinks: 'Quick Links',
      footerContact: 'Contact',
      footerFollow: 'Follow',
      details: 'Details',
      add: 'Add',
      quickView: 'Quick View',
      categoryRaw: 'Raw',
      categoryMountain: 'Mountain',
      categoryBlackSeed: 'Black Seed',
      categoryCitrus: 'Citrus',
      categorySidr: 'Sidr',
      heroKicker: 'Luxury Organic Honey',
      heroTitle: 'Pure Honey, Straight From Nature',
      heroText: 'Hand-harvested from pristine fields and mountain blooms, crafted for those who value authenticity, purity, and premium taste.',
      shopNow: 'Shop Now',
      whyAsalna: 'Why Asalna',
      signatureCollection: 'Signature Collection',
      craftedVarieties: 'Crafted Honey Varieties',
      viewFullShop: 'View Full Shop',
      whyChooseAsalna: 'Why Choose Asalna',
      trustedPurity: 'Trusted Purity In Every Spoon',
      featureOrganicTitle: 'Organic',
      featureOrganicText: 'Sourced from clean ecosystems with naturally thriving wildflowers.',
      featureNaturalTitle: '100% Natural',
      featureNaturalText: 'Unprocessed honey preserving aroma, enzymes, and nutrients.',
      featureNoAdditivesTitle: 'No Additives',
      featureNoAdditivesText: 'No sugar syrups, flavors, or artificial ingredients. Pure only.',
      featureLabTitle: 'Lab Tested',
      featureLabText: 'Quality tested for safety, authenticity, and premium standards.',
      testimonials: 'Testimonials',
      lovedBy: 'Loved By Honey Connoisseurs',
      newsletter: 'Newsletter',
      newsletterTitle: 'Get Exclusive Honey Drops',
      newsletterText: 'Subscribe for first access to limited harvests and premium seasonal collections.',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      storeKicker: 'Asalna Store',
      shopTitle: 'Premium Honey Collection',
      shopText: 'Each jar is carefully sourced and cold-packed to preserve natural antioxidants, enzymes, and signature floral notes.',
      filterAll: 'All',
      filterRaw: 'Raw Honey',
      filterMountain: 'Mountain Honey',
      filterSidr: 'Sidr Honey',
      inStock: 'In Stock',
      quantity: 'Quantity',
      backToShop: 'Back to Shop',
      tabDescription: 'Description',
      tabIngredients: 'Ingredients',
      tabBenefits: 'Benefits',
      tabReviews: 'Reviews',
      aboutStoryKicker: 'Our Story',
      aboutTitle: 'From Fields To Fine Tables',
      aboutText1: 'Asalna was founded to redefine how premium honey is experienced. We partner with ethical beekeepers and protect bee habitats across mountain valleys, citrus farms, and wildflower plains to deliver honest, remarkable flavor.',
      aboutText2: 'Every batch is traceable and carefully tested, preserving the living character of pure honey while maintaining luxury quality for modern wellness lifestyles.',
      mission: 'Mission',
      missionText: 'Deliver uncompromised natural honey while supporting sustainable beekeeping communities and biodiversity.',
      vision: 'Vision',
      visionText: 'Become the benchmark of luxury organic honey, recognized globally for purity, trust, and craftsmanship.',
      organicProcess: 'Organic Process',
      preservePurity: 'How We Preserve Purity',
      contactUs: 'Contact Us',
      contactTitle: 'We Are Here To Help',
      contactText: 'For product inquiries, wholesale partnerships, and custom gifting, contact Asalna team and we will respond within one business day.',
      fullName: 'Full Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      sendMessage: 'Send Message'
    },
    ar: {
      navHome: 'الرئيسية',
      navShop: 'المتجر',
      navAbout: 'من نحن',
      navContact: 'تواصل',
      navCart: 'السلة',
      footerBrand: 'عسل عضوي فاخر مصنوع بنقاء وجودة عالية.',
      footerQuickLinks: 'روابط سريعة',
      footerContact: 'تواصل',
      footerFollow: 'تابعنا',
      details: 'التفاصيل',
      add: 'أضف',
      quickView: 'عرض سريع',
      categoryRaw: 'خام',
      categoryMountain: 'جبلي',
      categoryBlackSeed: 'الحبة السوداء',
      categoryCitrus: 'حمضيات',
      categorySidr: 'سدر',
      heroKicker: 'عسل عضوي فاخر',
      heroTitle: 'عسل نقي مباشرة من الطبيعة',
      heroText: 'يتم حصاده بعناية من المزارع والمرتفعات الطبيعية بطعم فاخر وجودة موثوقة.',
      shopNow: 'تسوق الآن',
      whyAsalna: 'لماذا أصلنا',
      signatureCollection: 'مجموعتنا المميزة',
      craftedVarieties: 'أنواع عسل مختارة',
      viewFullShop: 'عرض المتجر الكامل',
      whyChooseAsalna: 'لماذا تختار أصلنا',
      trustedPurity: 'نقاء موثوق في كل ملعقة',
      featureOrganicTitle: 'عضوي',
      featureOrganicText: 'مصادر طبيعية نظيفة من بيئات غنية بالأزهار.',
      featureNaturalTitle: 'طبيعي 100%',
      featureNaturalText: 'عسل غير معالج يحافظ على الرائحة والعناصر المفيدة.',
      featureNoAdditivesTitle: 'بدون إضافات',
      featureNoAdditivesText: 'بدون سكريات مضافة أو نكهات صناعية.',
      featureLabTitle: 'مُختبر معملياً',
      featureLabText: 'يتم فحص كل دفعة لضمان الجودة والأصالة.',
      testimonials: 'آراء العملاء',
      lovedBy: 'محبوب من عشاق العسل',
      newsletter: 'النشرة البريدية',
      newsletterTitle: 'احصل على إصدارات العسل الحصرية',
      newsletterText: 'اشترك للحصول على أول وصول للمحاصيل المحدودة والعروض الموسمية.',
      emailPlaceholder: 'ادخل بريدك الإلكتروني',
      subscribe: 'اشترك',
      storeKicker: 'متجر أصلنا',
      shopTitle: 'مجموعة العسل الفاخر',
      shopText: 'كل عبوة يتم تجهيزها بعناية للحفاظ على مضادات الأكسدة والطعم الطبيعي.',
      filterAll: 'الكل',
      filterRaw: 'عسل خام',
      filterMountain: 'عسل جبلي',
      filterSidr: 'عسل سدر',
      inStock: 'متوفر',
      quantity: 'الكمية',
      backToShop: 'العودة للمتجر',
      tabDescription: 'الوصف',
      tabIngredients: 'المكونات',
      tabBenefits: 'الفوائد',
      tabReviews: 'التقييمات',
      aboutStoryKicker: 'قصتنا',
      aboutTitle: 'من الطبيعة إلى الجودة الفاخرة',
      aboutText1: 'تأسست أصلنا لإعادة تعريف تجربة العسل الفاخر من خلال شراكات مسؤولة مع النحالين.',
      aboutText2: 'كل دفعة قابلة للتتبع ويتم اختبارها للحفاظ على النقاء والجودة.',
      mission: 'الرسالة',
      missionText: 'تقديم عسل طبيعي خالص مع دعم مجتمعات تربية النحل والاستدامة.',
      vision: 'الرؤية',
      visionText: 'أن تكون أصلنا مرجع العسل العضوي الفاخر محلياً وعالمياً.',
      organicProcess: 'العملية العضوية',
      preservePurity: 'كيف نحافظ على النقاء',
      contactUs: 'تواصل معنا',
      contactTitle: 'نحن هنا لمساعدتك',
      contactText: 'للاستفسارات والطلبات والشراكات، تواصل مع فريق أصلنا وسنرد خلال يوم عمل.',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      sendMessage: 'إرسال الرسالة'
    }
  };

  const PRODUCTS = [
    {
      id: 'raw-honey',
      name: 'Raw Honey',
      nameAr: 'عسل خام',
      category: 'Raw',
      categoryKey: 'categoryRaw',
      price: 26,
      image: `${basePath}assets/images/raw-honey.svg`,
      description: 'Unfiltered raw honey with rich floral notes and dense golden texture.',
      descriptionAr: 'عسل خام غير مفلتر بطعم زهري غني وقوام ذهبي كثيف.',
      ingredients: ['100% pure raw honey'],
      ingredientsAr: ['عسل خام نقي 100%'],
      benefits: ['Natural antioxidants', 'Supports immunity', 'No additives'],
      benefitsAr: ['مضادات أكسدة طبيعية', 'يدعم المناعة', 'بدون إضافات'],
      reviews: ['Silky texture and authentic taste.', 'My daily morning ritual.'],
      reviewsAr: ['قوام ناعم وطعم أصيل.', 'جزء أساسي من روتيني اليومي.']
    },
    {
      id: 'mountain-honey',
      name: 'Mountain Honey',
      nameAr: 'عسل جبلي',
      category: 'Mountain',
      categoryKey: 'categoryMountain',
      price: 31,
      image: `${basePath}assets/images/mountain-honey.svg`,
      description: 'Harvested from high-altitude blossoms with complex earthy sweetness.',
      descriptionAr: 'مستخرج من أزهار المرتفعات بنكهة عميقة ومتوازنة.',
      ingredients: ['100% mountain blossom honey'],
      ingredientsAr: ['عسل أزهار جبلي نقي 100%'],
      benefits: ['Bold mineral profile', 'Pure mountain nectar', 'Cold extracted'],
      benefitsAr: ['تركيبة معدنية مميزة', 'رحيق جبلي نقي', 'استخلاص بارد'],
      reviews: ['Deep and aromatic.', 'Outstanding premium quality.'],
      reviewsAr: ['نكهة عميقة وعطرية.', 'جودة فاخرة ممتازة.']
    },
    {
      id: 'black-seed-honey',
      name: 'Black Seed Honey',
      nameAr: 'عسل الحبة السوداء',
      category: 'Black Seed',
      categoryKey: 'categoryBlackSeed',
      price: 34,
      image: `${basePath}assets/images/black-seed-honey.svg`,
      description: 'A powerful blend of honey and black seed essence for wellness routines.',
      descriptionAr: 'مزيج قوي من العسل وخلاصة الحبة السوداء لدعم الروتين الصحي.',
      ingredients: ['Pure honey', 'Black seed infusion'],
      ingredientsAr: ['عسل نقي', 'خلاصة الحبة السوداء'],
      benefits: ['Supports daily wellness', 'Earthy and balanced', 'Naturally energizing'],
      benefitsAr: ['يدعم الصحة اليومية', 'طعم متوازن', 'طاقة طبيعية'],
      reviews: ['Unique flavor and premium feel.', 'Excellent quality and consistency.'],
      reviewsAr: ['نكهة مميزة وإحساس فاخر.', 'جودة وثبات رائعان.']
    },
    {
      id: 'citrus-honey',
      name: 'Citrus Honey',
      nameAr: 'عسل الحمضيات',
      category: 'Citrus',
      categoryKey: 'categoryCitrus',
      price: 29,
      image: `${basePath}assets/images/citrus-honey.svg`,
      description: 'Bright citrus blossom honey with delicate aroma and smooth finish.',
      descriptionAr: 'عسل أزهار الحمضيات بنكهة منعشة ورائحة رقيقة.',
      ingredients: ['100% citrus blossom honey'],
      ingredientsAr: ['عسل أزهار الحمضيات نقي 100%'],
      benefits: ['Light and fragrant', 'Versatile for tea and desserts', 'Naturally pure'],
      benefitsAr: ['خفيف وعطري', 'مناسب للشاي والحلويات', 'نقي طبيعي'],
      reviews: ['Very refined sweetness.', 'Perfect with yogurt and fruits.'],
      reviewsAr: ['حلاوة راقية.', 'مثالي مع الزبادي والفواكه.']
    },
    {
      id: 'sidr-honey',
      name: 'Sidr Honey',
      nameAr: 'عسل سدر',
      category: 'Sidr',
      categoryKey: 'categorySidr',
      price: 42,
      image: `${basePath}assets/images/sidr-honey.svg`,
      description: 'Exceptional Sidr honey with luxurious depth and rare floral origin.',
      descriptionAr: 'عسل سدر استثنائي بطعم غني ومصدر زهري نادر.',
      ingredients: ['100% Sidr honey'],
      ingredientsAr: ['عسل سدر نقي 100%'],
      benefits: ['Premium nutrient density', 'Rich aromatic profile', 'Small-batch harvest'],
      benefitsAr: ['قيمة غذائية عالية', 'رائحة غنية', 'حصاد بكميات محدودة'],
      reviews: ['True connoisseur honey.', 'Worth every spoonful.'],
      reviewsAr: ['عسل راقٍ لمحبي الجودة.', 'يستحق كل ملعقة.']
    }
  ];

  window.ASALNA_PRODUCTS = PRODUCTS;

  const componentFallbacks = {
    navbar: `
<nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-white/65 backdrop-blur-xl shadow-[0_10px_30px_rgba(21,18,14,0.08)]">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
    <a href="${basePath}index.html" class="flex items-center gap-3" aria-label="Asalna Home">
      <img src="${basePath}assets/images/black.png" alt="Asalna logo" class="h-12 w-auto object-contain" loading="eager">
    </a>
    <button id="mobileMenuButton" class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-honeyGold/35 text-honeyDark" aria-expanded="false" aria-controls="mobileMenu" aria-label="Toggle navigation">☰</button>
    <div class="hidden lg:flex items-center gap-8">
      <a href="${basePath}index.html" data-nav="home" data-i18n="navHome" class="nav-link">Home</a>
      <a href="${basePath}pages/shop.html" data-nav="shop" data-i18n="navShop" class="nav-link">Shop</a>
      <a href="${basePath}pages/about.html" data-nav="about" data-i18n="navAbout" class="nav-link">About</a>
      <a href="${basePath}pages/contact.html" data-nav="contact" data-i18n="navContact" class="nav-link">Contact</a>
      <a href="${basePath}pages/shop.html" class="relative nav-link" aria-label="Cart"><span data-i18n="navCart">Cart</span>
        <span id="cartCounter" class="absolute -top-2 -right-4 min-w-[1.25rem] h-5 px-1 rounded-full bg-honeyGold text-white text-[11px] grid place-items-center">0</span>
      </a>
      <button id="langToggle" class="px-4 py-2 rounded-full border border-honeyGold/35 text-sm font-semibold text-honeyDark hover:bg-honeyLight transition" type="button">AR</button>
    </div>
  </div>
  <div id="mobileMenu" class="lg:hidden hidden border-t border-honeyGold/20 bg-white/90 backdrop-blur-xl">
    <div class="px-6 py-4 flex flex-col gap-4 text-sm font-semibold">
      <a href="${basePath}index.html" data-nav="home" data-i18n="navHome" class="nav-link">Home</a>
      <a href="${basePath}pages/shop.html" data-nav="shop" data-i18n="navShop" class="nav-link">Shop</a>
      <a href="${basePath}pages/about.html" data-nav="about" data-i18n="navAbout" class="nav-link">About</a>
      <a href="${basePath}pages/contact.html" data-nav="contact" data-i18n="navContact" class="nav-link">Contact</a>
      <a href="${basePath}pages/shop.html" class="inline-flex items-center gap-2 nav-link"><span data-i18n="navCart">Cart</span> <span id="cartCounterMobile" class="min-w-[1.25rem] h-5 px-1 rounded-full bg-honeyGold text-white text-[11px] grid place-items-center">0</span></a>
      <button id="langToggleMobile" class="w-fit px-4 py-2 rounded-full border border-honeyGold/35 text-sm font-semibold text-honeyDark hover:bg-honeyLight transition" type="button">AR</button>
    </div>
  </div>
</nav>`,
    footer: `
<footer class="bg-charcoal text-honeyLight pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
    <div>
      <img src="${basePath}assets/images/black.png" alt="Asalna logo" class="h-14 w-auto object-contain" loading="lazy">
      <p class="text-sm mt-3 text-honeyLight/80" data-i18n="footerBrand">Luxury organic honey crafted with purity, integrity, and premium taste.</p>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-4" data-i18n="footerQuickLinks">Quick Links</h4>
      <ul class="space-y-2 text-sm">
        <li><a class="hover:text-white transition" href="${basePath}index.html" data-i18n="navHome">Home</a></li>
        <li><a class="hover:text-white transition" href="${basePath}pages/shop.html" data-i18n="navShop">Shop</a></li>
        <li><a class="hover:text-white transition" href="${basePath}pages/about.html" data-i18n="navAbout">About</a></li>
        <li><a class="hover:text-white transition" href="${basePath}pages/contact.html" data-i18n="navContact">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-4" data-i18n="footerContact">Contact</h4>
      <ul class="space-y-2 text-sm text-honeyLight/80">
        <li>hello@asalna.com</li>
        <li>+20 100 000 0000</li>
        <li>Cairo, Egypt</li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-4" data-i18n="footerFollow">Follow</h4>
      <div class="flex gap-3 text-sm">
        <a class="social-pill" href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
            <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"></rect>
            <circle cx="12" cy="12" r="4.1"></circle>
            <circle cx="17.2" cy="6.8" r="1.1"></circle>
          </svg>
        </a>
        <a class="social-pill" href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon social-fill">
            <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1z"></path>
          </svg>
        </a>
        <a class="social-pill" href="#" aria-label="X">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon social-fill">
            <path d="M18.9 3h2.9l-6.3 7.2L23 21h-5.9l-4.6-6.1L7 21H4.1l6.8-7.8L2 3h6l4.2 5.6L18.9 3zM17 19h1.6L7 4.9H5.3L17 19z"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div class="max-w-7xl mx-auto px-6 sm:px-8 mt-10 pt-6 border-t border-white/10 text-xs text-honeyLight/70">© <span id="yearNow"></span> Asalna. All rights reserved.</div>
</footer>`
  };

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
  }

  function getLocalizedProduct(product) {
    return {
      ...product,
      displayName: currentLang === 'ar' ? product.nameAr : product.name,
      displayCategory: t(product.categoryKey),
      displayDescription: currentLang === 'ar' ? product.descriptionAr : product.description
    };
  }

  function formatPrice(price) {
    return `EL ${price}`;
  }

  function hydrateComponentLinks(markup) {
    return markup
      .replaceAll('{{HOME_LINK}}', `${basePath}index.html`)
      .replaceAll('{{SHOP_LINK}}', `${basePath}pages/shop.html`)
      .replaceAll('{{ABOUT_LINK}}', `${basePath}pages/about.html`)
      .replaceAll('{{CONTACT_LINK}}', `${basePath}pages/contact.html`)
      .replaceAll('{{LOGO_SRC}}', `${basePath}assets/images/black.png`);
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const text = currentLang === 'ar' ? 'EN' : 'AR';
    if (langToggle) langToggle.textContent = text;
    if (langToggleMobile) langToggleMobile.textContent = text;
  }

  function initLanguageToggles() {
    ['langToggle', 'langToggleMobile'].forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('asalna_lang', currentLang);
        applyLanguage();
        renderFeaturedProducts();
        initProductActions(document);
        window.dispatchEvent(new CustomEvent('asalna:langchange', { detail: { lang: currentLang } }));
      });
    });
  }

  async function loadComponents() {
    const targets = document.querySelectorAll('[data-component]');
    for (const target of targets) {
      const name = target.getAttribute('data-component');
      const path = `${basePath}components/${name}.html`;
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Component fetch failed');
        }
        const html = await response.text();
        target.innerHTML = hydrateComponentLinks(html);
      } catch (error) {
        target.innerHTML = componentFallbacks[name] || '';
      }
    }
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('asalna_cart') || '[]');
    } catch (error) {
      return [];
    }
  }

  function setCart(cart) {
    localStorage.setItem('asalna_cart', JSON.stringify(cart));
    updateCartCounters();
  }

  function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: productId, quantity });
    }
    setCart(cart);
  }

  function updateCartCounters() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    ['cartCounter', 'cartCounterMobile'].forEach((id) => {
      const badge = document.getElementById(id);
      if (badge) {
        badge.textContent = String(count);
      }
    });
  }

  function setActiveNavLink() {
    const map = {
      'index.html': 'home',
      'shop.html': 'shop',
      'product.html': 'shop',
      'about.html': 'about',
      'contact.html': 'contact'
    };
    const activeKey = map[fileName] || 'home';
    document.querySelectorAll(`[data-nav="${activeKey}"]`).forEach((link) => {
      link.classList.add('active');
    });
  }

  function initMobileMenu() {
    const toggleButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!toggleButton || !mobileMenu) return;

    toggleButton.addEventListener('click', function () {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (event) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-rise');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function createProductCard(product) {
    const item = getLocalizedProduct(product);
    return `
      <article class="product-card reveal-rise">
        <img src="${item.image}" alt="${item.displayName}" loading="lazy">
        <div class="card-body">
          <p class="section-kicker">${item.displayCategory}</p>
          <h3 class="font-display text-2xl text-honeyDark mt-2">${item.displayName}</h3>
          <p class="text-sm text-charcoal/70 mt-3">${item.displayDescription}</p>
          <div class="mt-5 flex items-center justify-between gap-3">
            <span class="text-xl font-bold text-honeyDark">${formatPrice(item.price)}</span>
            <div class="flex gap-2">
              <a href="${basePath}pages/product.html?id=${item.id}" class="px-4 py-2 rounded-full border border-honeyGold/30 text-sm font-semibold hover:bg-honeyLight transition">${t('details')}</a>
              <button class="btn-premium text-sm px-4 py-2 add-cart" data-id="${item.id}">${t('add')}</button>
              <button class="px-4 py-2 rounded-full border border-honeyGold/30 text-sm font-semibold hover:bg-honeyLight transition quick-view" data-id="${item.id}">${t('quickView')}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    container.innerHTML = PRODUCTS.slice(0, 3).map(createProductCard).join('');
    container.querySelectorAll('.reveal-rise').forEach((item) => item.classList.add('is-visible'));
  }

  function initProductActions(scope = document) {
    scope.querySelectorAll('.add-cart').forEach((button) => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-id');
        if (!id) return;
        addToCart(id, 1);
      });
    });

    scope.querySelectorAll('.quick-view').forEach((button) => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-id');
        if (!id) return;
        openModal(id);
      });
    });
  }

  function openModal(productId) {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const item = getLocalizedProduct(product);

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
    if (modalPrice) modalPrice.textContent = formatPrice(item.price);
    if (modalAddToCart) {
      modalAddToCart.textContent = t('add');
      modalAddToCart.onclick = function () {
        addToCart(item.id, 1);
      };
    }

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    modal.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });
  }

  function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    const slides = Array.from(track.children);
    let index = 0;

    setInterval(() => {
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 4200);
  }

  function setYear() {
    const year = new Date().getFullYear();
    const yearNode = document.getElementById('yearNow');
    if (yearNode) yearNode.textContent = String(year);
  }

  async function init() {
    await loadComponents();
    setActiveNavLink();
    initLanguageToggles();
    applyLanguage();
    setYear();
    updateCartCounters();
    initMobileMenu();
    initSmoothScroll();
    renderFeaturedProducts();
    initProductActions(document);
    initRevealAnimation();
    initModal();
    initTestimonials();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.AsalnaCart = {
    addToCart,
    updateCartCounters,
    getCart
  };

  window.AsalnaI18n = {
    t,
    getLang: () => currentLang,
    formatPrice,
    getLocalizedProduct,
    applyLanguage
  };
})();
