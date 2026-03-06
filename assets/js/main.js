(function () {
  const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  let currentLang = localStorage.getItem('asalna_lang') || 'en';

  const I18N = {
    en: {
      navHome: 'Home', navShop: 'Shop', navAbout: 'Story', navContact: 'Contact', navCart: 'Cart', navBadge: 'Estate Honey',
      footerBrand: 'Asalna turns Egyptian honey into a sensory brand experience: bold harvests, traceable origin, and a table presence that feels worth opening.',
      footerQuickLinks: 'Navigate', footerContact: 'Reach Us', footerFollow: 'Follow', footerTagline: 'Harvested in Egypt. Packed with intent.',
      details: 'Details', add: 'Add to cart', quickView: 'Quick view', categoryRaw: 'Raw', categoryMountain: 'Mountain', categoryBlackSeed: 'Black Seed', categoryCitrus: 'Citrus Blossom', categorySidr: 'Sidr',
      heroKicker: 'Not another generic honey store', heroTitle: 'A honey brand with weight, warmth, and presence.',
      heroText: 'Asalna is designed like the product should feel: rich, honest, textured, and memorable. Every jar carries a distinct floral source, slow handling, and a stronger visual identity than typical commodity websites.',
      shopNow: 'Shop the harvest', whyAsalna: 'See the difference', heroStatOne: 'Wild bloom zones', heroStatTwo: 'Small batch flow', heroStatThree: 'Layered taste', heroBadgeTitle: 'Fresh drop', heroBadgeText: 'Spring citrus extraction now live', heroNoteTitle: 'Texture-first brand', heroNoteText: 'Warm gradients, dense typography, and editorial spacing make the site feel premium instead of template-driven.', heroHarvestTitle: 'Every jar starts with place', heroHarvestText: 'Mountain air, citrus farms, sidr trees, and black seed blends become distinct characters, not generic SKUs.',
      signatureCollection: 'Signature collection', craftedVarieties: 'Five jars. Five different moods.', viewFullShop: 'View the full collection', whyChooseAsalna: 'Why Asalna works', trustedPurity: 'Purity is only part of the story.',
      featureOrganicTitle: 'Source-led', featureOrganicText: 'Each product starts from a real forage environment, not a stock product page.', featureNaturalTitle: 'Visually distinct', featureNaturalText: 'The brand language now feels crafted, layered, and recognizably yours.', featureNoAdditivesTitle: 'Clean composition', featureNoAdditivesText: 'No fake wellness claims, no clutter, no filler sections.', featureLabTitle: 'Confidence ready', featureLabText: 'Built to support retail trust, gifting, and premium positioning.',
      testimonials: 'What people notice', lovedBy: 'Buyers remember the taste and the presentation.', newsletter: 'Stay close to the next drop', newsletterTitle: 'Get limited harvest announcements before they sell out.', newsletterText: 'Use the list for rare releases, gifting windows, and small seasonal runs only.', emailPlaceholder: 'Enter your email', subscribe: 'Join the list',
      storeKicker: 'Asalna store', shopTitle: 'Premium jars with clearer personalities.', shopText: 'Instead of a flat catalog, each honey type now reads like its own harvest profile, with stronger hierarchy and faster scanning.', filterAll: 'All jars', filterRaw: 'Raw', filterMountain: 'Mountain', filterSidr: 'Sidr',
      inStock: 'In stock', quantity: 'Quantity', backToShop: 'Back to shop', tabDescription: 'Description', tabIngredients: 'Ingredients', tabBenefits: 'Benefits', tabReviews: 'Reviews',
      aboutStoryKicker: 'Brand story', aboutTitle: 'We did not want Asalna to look like every other honey shop.', aboutText1: 'The old direction sold honey. The new direction sells confidence, atmosphere, and identity. We framed Asalna as a honey house with origin, rhythm, and a point of view.', aboutText2: 'That means better visual hierarchy, more editorial layouts, cleaner product framing, and messaging that respects the product instead of hiding it in generic ecommerce blocks.', mission: 'Mission', missionText: 'Make premium honey feel culturally rooted, commercially sharp, and visually unforgettable.', vision: 'Vision', visionText: 'Build a regional honey brand that looks strong enough for gifting, retail shelves, and modern direct-to-consumer growth.', organicProcess: 'How the brand now moves', preservePurity: 'A stronger website needs stronger structure.',
      contactUs: 'Contact Asalna', contactTitle: 'Talk to us about retail, gifting, or custom orders.', contactText: 'The contact experience now feels like part of the brand system, not a leftover form page. Reach out for wholesale, collabs, or curated honey bundles.', fullName: 'Full name', email: 'Email', subject: 'Subject', message: 'Message', sendMessage: 'Send message',
      shopStatOne: 'Curated varieties', shopStatTwo: 'Fast visual scan', shopStatThree: 'Gift-ready positioning', storyCardOneTitle: 'Richer direction', storyCardOneText: 'Typography, gradients, and framed content now feel intentional instead of standard.', storyCardTwoTitle: 'Commercial clarity', storyCardTwoText: 'The site communicates premium value faster, which matters for conversion and wholesale trust.', storyCardThreeTitle: 'Product-first flow', storyCardThreeText: 'Jars, origin, and taste notes lead the page instead of random decorative filler.',
      processOneTitle: '01. Strong opening', processOneText: 'The first screen now sells a point of view, not just a hero banner.', processTwoTitle: '02. Sharper sections', processTwoText: 'Every block has a job: trust, distinction, product framing, or conversion.', processThreeTitle: '03. Unified system', processThreeText: 'Shared cards, surfaces, and spacing keep the experience premium across all pages.',
      contactPanelOneTitle: 'Wholesale', contactPanelOneText: 'Retailers, cafes, and concept stores looking for premium honey placement.', contactPanelTwoTitle: 'Curated gifting', contactPanelTwoText: 'Seasonal boxes, corporate gifts, and events that need a refined local product.', contactPanelThreeTitle: 'Brand collabs', contactPanelThreeText: 'Limited runs, hospitality partnerships, and creative campaigns with character.',
      productHeroKicker: 'Product detail', productHeroTitle: 'A jar should feel special before it is opened.', productHeroText: 'The product page now gives each honey type a stronger sense of story, texture, and justification.', verifiedBuyer: 'Verified buyer', footerLocation: 'Cairo, Egypt', footerEmail: 'hello@asalna.com', footerPhone: '+20 100 000 0000'
    },
    ar: {
      navHome: 'الرئيسية', navShop: 'المتجر', navAbout: 'الحكاية', navContact: 'تواصل', navCart: 'السلة', navBadge: 'عسل بهوية',
      footerBrand: 'أصلنا يحول العسل المصري لتجربة براند كاملة: طعم واضح، مصدر معروف، وحضور بصري يليق بمنتج فاخر.', footerQuickLinks: 'التنقل', footerContact: 'تواصل معنا', footerFollow: 'تابعنا', footerTagline: 'محصول مصري. وتغليف له معنى.',
      details: 'التفاصيل', add: 'أضف للسلة', quickView: 'عرض سريع', categoryRaw: 'خام', categoryMountain: 'جبلي', categoryBlackSeed: 'حبة سوداء', categoryCitrus: 'أزهار حمضيات', categorySidr: 'سدر',
      heroKicker: 'مش مجرد موقع عسل تقليدي', heroTitle: 'براند عسل له وزن ودفء وشخصية.', heroText: 'أصلنا اتصمم بنفس إحساس المنتج: غني، صادق، ملموس، وسهل يتفكر. كل برطمان له مصدر زهور مختلف، معالجة هادئة، وهوية أقوى بكتير من شكل مواقع البيع المعتادة.', shopNow: 'تسوق المحصول', whyAsalna: 'شوف الفرق', heroStatOne: 'مناطق زهور برية', heroStatTwo: 'دفعات صغيرة', heroStatThree: 'طبقات في الطعم', heroBadgeTitle: 'إصدار جديد', heroBadgeText: 'عسل الحمضيات الربيعي متاح الآن', heroNoteTitle: 'هوية مبنية على الإحساس', heroNoteText: 'ألوان دافئة، تايبوجرافي قوي، ومسافات مدروسة تخلي الموقع شكله فاخر بدل ما يكون قالب جاهز.', heroHarvestTitle: 'كل برطمان يبدأ من مكان حقيقي', heroHarvestText: 'مرتفعات، مزارع حمضيات، أشجار سدر، وخلطات حبة سوداء. كل نوع له شخصيته، مش مجرد منتج متكرر.',
      signatureCollection: 'المجموعة الأساسية', craftedVarieties: 'خمسة برطمانات. خمس شخصيات مختلفة.', viewFullShop: 'شوف المجموعة كاملة', whyChooseAsalna: 'ليه أصلنا مختلف', trustedPurity: 'النقاء مهم، لكن مش هو الحكاية كلها.',
      featureOrganicTitle: 'بداية من المصدر', featureOrganicText: 'كل منتج مبني على بيئة زهور حقيقية، مش صفحة منتجات عامة.', featureNaturalTitle: 'شكل مميز', featureNaturalText: 'اللغة البصرية بقت أوضح وأقوى وسهل تتعرف عليها فورًا.', featureNoAdditivesTitle: 'تركيب نظيف', featureNoAdditivesText: 'بدون زحمة، بدون مبالغات، وبدون أقسام مالهاش لازمة.', featureLabTitle: 'جاهز للثقة', featureLabText: 'الموقع مناسب للبيع، للهدايا، ولعرض منتج فاخر بثقة.',
      testimonials: 'الناس لاحظت إيه', lovedBy: 'العميل بيفتكر الطعم وطريقة التقديم معًا.', newsletter: 'خليك قريب من الإصدار الجاي', newsletterTitle: 'وصلك أخبار المحاصيل المحدودة قبل ما تخلص.', newsletterText: 'القائمة مخصصة للإصدارات النادرة، مواسم الهدايا، والكميات الصغيرة فقط.', emailPlaceholder: 'اكتب بريدك الإلكتروني', subscribe: 'اشترك',
      storeKicker: 'متجر أصلنا', shopTitle: 'برطمانات فاخرة بشخصيات أوضح.', shopText: 'بدل كتالوج مسطح، كل نوع عسل بقى له حضور أقوى وتسلسل بصري أسرع وأسهل في الفهم.', filterAll: 'كل البرطمانات', filterRaw: 'خام', filterMountain: 'جبلي', filterSidr: 'سدر',
      inStock: 'متوفر', quantity: 'الكمية', backToShop: 'العودة للمتجر', tabDescription: 'الوصف', tabIngredients: 'المكونات', tabBenefits: 'المميزات', tabReviews: 'الآراء',
      aboutStoryKicker: 'حكاية البراند', aboutTitle: 'ماكناش عايزين أصلنا يبقى شبه أي موقع عسل تاني.', aboutText1: 'الشكل القديم كان بيبيع عسل. الشكل الجديد بيبيع ثقة، جو عام، وهوية. قدمنا أصلنا كبيت عسل له أصل، وإيقاع، ونبرة واضحة.', aboutText2: 'وده معناه ترتيب بصري أقوى، Layouts أقرب للـ editorial، عرض منتجات أنضف، وكلام يحترم المنتج بدل ما يضيع وسط بلوكات ecommerce عامة.', mission: 'الرسالة', missionText: 'نخلي العسل الفاخر يبدو محليًا بصدق، وتجاريًا بثقة، وبصريًا لا يُنسى.', vision: 'الرؤية', visionText: 'نبني براند عسل إقليمي شكله قوي بما يكفي للهدايا، الرفوف، والبيع المباشر الحديث.', organicProcess: 'كيف الموقع بقى أقوى', preservePurity: 'الموقع القوي يحتاج بنية أقوى.',
      contactUs: 'تواصل مع أصلنا', contactTitle: 'كلمنا بخصوص البيع، الهدايا، أو الطلبات الخاصة.', contactText: 'صفحة التواصل بقت جزء من الهوية نفسها، مش مجرد فورم قديم. تواصل معانا بخصوص الجملة، التعاونات، أو باقات العسل المختارة.', fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', subject: 'الموضوع', message: 'الرسالة', sendMessage: 'إرسال الرسالة',
      shopStatOne: 'أنواع مختارة', shopStatTwo: 'قراءة بصرية سريعة', shopStatThree: 'جاهز للهدايا', storyCardOneTitle: 'اتجاه أغنى', storyCardOneText: 'الخطوط، الخلفيات، وطريقة التأطير بقت مقصودة بدل الشكل المكرر.', storyCardTwoTitle: 'وضوح تجاري', storyCardTwoText: 'الموقع بيوصل قيمة المنتج أسرع، وده مهم جدًا للبيع والثقة في الجملة.', storyCardThreeTitle: 'المنتج أولًا', storyCardThreeText: 'البرطمان، المصدر، ونوتات الطعم بقوا هم الأساس بدل الزينة الفارغة.',
      processOneTitle: '01. افتتاحية أقوى', processOneText: 'أول شاشة بقت تبيع وجهة نظر، مش مجرد بانر تقليدي.', processTwoTitle: '02. أقسام أذكى', processTwoText: 'كل جزء له وظيفة واضحة: ثقة، تمييز، عرض منتج، أو تحويل.', processThreeTitle: '03. نظام موحد', processThreeText: 'الكروت، المساحات، والسطوح متوحدة عشان كل الصفحات تحافظ على نفس الجودة.',
      contactPanelOneTitle: 'جملة', contactPanelOneText: 'للمتاجر، الكافيهات، والمساحات اللي محتاجة منتج عسل فاخر بحضور واضح.', contactPanelTwoTitle: 'هدايا مختارة', contactPanelTwoText: 'بوكسات موسمية، هدايا شركات، ومناسبات تحتاج منتج محلي أنيق.', contactPanelThreeTitle: 'تعاونات براند', contactPanelThreeText: 'إصدارات محدودة، شراكات ضيافة، وحملات فيها شخصية.',
      productHeroKicker: 'تفاصيل المنتج', productHeroTitle: 'البرطمان لازم يحسسك بقيمته قبل ما يتفتح.', productHeroText: 'صفحة المنتج دلوقتي بتدي لكل نوع عسل قصة أوضح وإحساس أقوى ومبرر للشراء.', verifiedBuyer: 'عميل موثق', footerLocation: 'القاهرة، مصر', footerEmail: 'hello@asalna.com', footerPhone: '+20 100 000 0000'
    }
  };

  const PRODUCTS = [
    { id: 'raw-honey', name: 'Raw Honey', nameAr: 'عسل خام', category: 'Raw', categoryKey: 'categoryRaw', price: 26, image: `${basePath}assets/images/raw-honey.svg`, description: 'Dense floral honey with an unfiltered body and a clean golden finish.', descriptionAr: 'عسل زهري كثيف غير مفلتر بقوام ممتلئ ونهاية ذهبية نظيفة.', ingredients: ['100% pure raw honey'], ingredientsAr: ['عسل خام نقي 100%'], benefits: ['Natural antioxidants', 'Unfiltered texture', 'Daily table staple'], benefitsAr: ['مضادات أكسدة طبيعية', 'قوام غير مفلتر', 'مناسب للاستخدام اليومي'], reviews: ['Silky, deep, and very real.', 'Tastes like a serious product, not a sugary spread.'], reviewsAr: ['قوامه ناعم وطعمه حقيقي جدًا.', 'تحسه منتج محترم وليس مجرد حلاوة سكرية.'] },
    { id: 'mountain-honey', name: 'Mountain Honey', nameAr: 'عسل جبلي', category: 'Mountain', categoryKey: 'categoryMountain', price: 31, image: `${basePath}assets/images/mountain-honey.svg`, description: 'High-altitude nectar with a darker edge, earthy sweetness, and longer finish.', descriptionAr: 'رحيق مرتفعات بطابع أغمق وحلاوة أرضية ونهاية أطول في الفم.', ingredients: ['100% mountain blossom honey'], ingredientsAr: ['عسل أزهار جبلية نقي 100%'], benefits: ['Bold mineral profile', 'Distinct aftertaste', 'Cold handled'], benefitsAr: ['تركيبة معدنية أوضح', 'أثر طعمي مميز', 'معالجة هادئة وباردة'], reviews: ['Very layered and aromatic.', 'Feels premium from the first spoon.'], reviewsAr: ['طعمه متعدد الطبقات وعطري.', 'تحسه فاخر من أول ملعقة.'] },
    { id: 'black-seed-honey', name: 'Black Seed Honey', nameAr: 'عسل الحبة السوداء', category: 'Black Seed', categoryKey: 'categoryBlackSeed', price: 34, image: `${basePath}assets/images/black-seed-honey.svg`, description: 'A richer blend with black seed notes for a darker, wellness-led profile.', descriptionAr: 'خلطة أغنى مع نوتات الحبة السوداء بطابع أعمق وميل صحي أوضح.', ingredients: ['Pure honey', 'Black seed infusion'], ingredientsAr: ['عسل نقي', 'خلاصة الحبة السوداء'], benefits: ['Balanced warmth', 'Wellness-oriented profile', 'Distinctive flavor'], benefitsAr: ['دفء متوازن', 'طابع مناسب للروتين الصحي', 'نكهة مميزة'], reviews: ['Unexpectedly refined.', 'Excellent if you want something deeper than regular honey.'], reviewsAr: ['أرقى مما توقعت.', 'ممتاز لو عايز طعم أعمق من العسل المعتاد.'] },
    { id: 'citrus-honey', name: 'Citrus Honey', nameAr: 'عسل الحمضيات', category: 'Citrus', categoryKey: 'categoryCitrus', price: 29, image: `${basePath}assets/images/citrus-honey.svg`, description: 'Bright blossom honey with a lighter body and a fresher aromatic lift.', descriptionAr: 'عسل أزهار فاتح بطابع أخف ورائحة منعشة أكثر.', ingredients: ['100% citrus blossom honey'], ingredientsAr: ['عسل أزهار الحمضيات نقي 100%'], benefits: ['Fresh aroma', 'Versatile pairing', 'Soft sweetness'], benefitsAr: ['رائحة منعشة', 'سهل دمجه مع وصفات مختلفة', 'حلاوة ناعمة'], reviews: ['Perfect with yogurt and fruit.', 'Very elegant and clean.'], reviewsAr: ['مثالي مع الزبادي والفواكه.', 'أنيق ونظيف جدًا في الطعم.'] },
    { id: 'sidr-honey', name: 'Sidr Honey', nameAr: 'عسل سدر', category: 'Sidr', categoryKey: 'categorySidr', price: 42, image: `${basePath}assets/images/sidr-honey.svg`, description: 'A rare floral profile with luxurious depth, density, and gifting appeal.', descriptionAr: 'طابع زهري نادر بعمق فاخر وكثافة أعلى وحضور مناسب للهدايا.', ingredients: ['100% sidr honey'], ingredientsAr: ['عسل سدر نقي 100%'], benefits: ['Rare source profile', 'Gift-worthy presence', 'Dense spoon texture'], benefitsAr: ['مصدر نادر', 'مناسب للهدايا', 'قوام كثيف على الملعقة'], reviews: ['This is the jar you remember.', 'Worth the premium position.'], reviewsAr: ['هذا هو البرطمان الذي ستتذكره.', 'يستحق مكانه كمنتج فاخر.'] }
  ];

  window.ASALNA_PRODUCTS = PRODUCTS;
  const componentFallbacks = {
    navbar: `
<nav class="topbar">
  <div class="topbar-inner">
    <a href="${basePath}index.html" class="brand-mark" aria-label="Asalna Home">
      <img src="${basePath}assets/images/black.png" alt="Asalna logo" loading="eager">
      <div class="brand-copy">
        <strong>ASALNA</strong>
        <span data-i18n="navBadge">Estate Honey</span>
      </div>
    </a>
    <div class="nav-links">
      <a href="${basePath}index.html" data-nav="home" data-i18n="navHome" class="nav-link">Home</a>
      <a href="${basePath}pages/shop.html" data-nav="shop" data-i18n="navShop" class="nav-link">Shop</a>
      <a href="${basePath}pages/about.html" data-nav="about" data-i18n="navAbout" class="nav-link">Story</a>
      <a href="${basePath}pages/contact.html" data-nav="contact" data-i18n="navContact" class="nav-link">Contact</a>
    </div>
    <div class="nav-actions">
      <a href="${basePath}pages/shop.html" class="nav-link" aria-label="Cart"><span data-i18n="navCart">Cart</span><span id="cartCounter" class="nav-cart-count">0</span></a>
      <button id="langToggle" class="lang-toggle" type="button">AR</button>
      <a href="${basePath}pages/shop.html" class="btn-premium" data-i18n="shopNow">Shop the harvest</a>
      <button id="mobileMenuButton" class="menu-toggle" aria-expanded="false" aria-controls="mobileMenu" aria-label="Toggle navigation">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
      </button>
    </div>
  </div>
  <div id="mobileMenu" class="mobile-panel hidden">
    <a href="${basePath}index.html" data-nav="home" data-i18n="navHome" class="nav-link">Home</a>
    <a href="${basePath}pages/shop.html" data-nav="shop" data-i18n="navShop" class="nav-link">Shop</a>
    <a href="${basePath}pages/about.html" data-nav="about" data-i18n="navAbout" class="nav-link">Story</a>
    <a href="${basePath}pages/contact.html" data-nav="contact" data-i18n="navContact" class="nav-link">Contact</a>
    <a href="${basePath}pages/shop.html" class="nav-link"><span data-i18n="navCart">Cart</span><span id="cartCounterMobile" class="nav-cart-count">0</span></a>
    <button id="langToggleMobile" class="lang-toggle" type="button">AR</button>
  </div>
</nav>`,
    footer: `
<footer class="site-footer">
  <div class="max-w-7xl mx-auto px-4 sm:px-8">
    <div class="footer-shell">
      <div class="footer-grid">
        <div>
          <a href="${basePath}index.html" class="brand-mark" aria-label="Asalna Home">
            <img src="${basePath}assets/images/black.png" alt="Asalna logo" loading="lazy">
            <div class="brand-copy">
              <strong>ASALNA</strong>
              <span data-i18n="footerTagline">Harvested in Egypt. Packed with intent.</span>
            </div>
          </a>
          <p class="footer-note" data-i18n="footerBrand">Asalna turns Egyptian honey into a sensory brand experience: bold harvests, traceable origin, and a table presence that feels worth opening.</p>
        </div>
        <div>
          <p class="footer-title" data-i18n="footerQuickLinks">Navigate</p>
          <div class="footer-links">
            <a href="${basePath}index.html" data-i18n="navHome">Home</a>
            <a href="${basePath}pages/shop.html" data-i18n="navShop">Shop</a>
            <a href="${basePath}pages/about.html" data-i18n="navAbout">Story</a>
            <a href="${basePath}pages/contact.html" data-i18n="navContact">Contact</a>
          </div>
        </div>
        <div>
          <p class="footer-title" data-i18n="footerContact">Reach Us</p>
          <div class="footer-links">
            <a href="mailto:hello@asalna.com" data-i18n="footerEmail">hello@asalna.com</a>
            <a href="tel:+201000000000" data-i18n="footerPhone">+20 100 000 0000</a>
            <span data-i18n="footerLocation">Cairo, Egypt</span>
          </div>
        </div>
        <div>
          <p class="footer-title" data-i18n="footerFollow">Follow</p>
          <div class="footer-links">
            <div class="flex gap-3">
              <a class="social-pill" href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.2" cy="6.8" r="1.1"></circle></svg></a>
              <a class="social-pill" href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon social-fill"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1z"></path></svg></a>
              <a class="social-pill" href="#" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon social-fill"><path d="M18.9 3h2.9l-6.3 7.2L23 21h-5.9l-4.6-6.1L7 21H4.1l6.8-7.8L2 3h6l4.2 5.6L18.9 3zM17 19h1.6L7 4.9H5.3L17 19z"></path></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom"><span>&copy; <span id="yearNow"></span> Asalna.</span><span data-i18n="footerTagline">Harvested in Egypt. Packed with intent.</span></div>
    </div>
  </div>
</footer>`
  };

  function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || key; }

  function getLocalizedProduct(product) {
    return { ...product, displayName: currentLang === 'ar' ? product.nameAr : product.name, displayCategory: t(product.categoryKey), displayDescription: currentLang === 'ar' ? product.descriptionAr : product.description };
  }

  function formatPrice(price) { return `EGP ${price}`; }

  function hydrateComponentLinks(markup) {
    return markup.replaceAll('{{HOME_LINK}}', `${basePath}index.html`).replaceAll('{{SHOP_LINK}}', `${basePath}pages/shop.html`).replaceAll('{{ABOUT_LINK}}', `${basePath}pages/about.html`).replaceAll('{{CONTACT_LINK}}', `${basePath}pages/contact.html`).replaceAll('{{LOGO_SRC}}', `${basePath}assets/images/black.png`);
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
    ['langToggle', 'langToggleMobile'].forEach((id) => {
      const button = document.getElementById(id);
      if (button) button.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    });
  }

  function initLanguageToggles() {
    ['langToggle', 'langToggleMobile'].forEach((id) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.addEventListener('click', () => {
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
        if (!response.ok) throw new Error('Component fetch failed');
        const html = await response.text();
        target.innerHTML = hydrateComponentLinks(html);
      } catch (error) {
        target.innerHTML = componentFallbacks[name] || '';
      }
    }
  }

  function getCart() { try { return JSON.parse(localStorage.getItem('asalna_cart') || '[]'); } catch (error) { return []; } }
  function setCart(cart) { localStorage.setItem('asalna_cart', JSON.stringify(cart)); updateCartCounters(); }
  function addToCart(productId, quantity) {
    const safeQuantity = quantity || 1;
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) existing.quantity += safeQuantity;
    else cart.push({ id: productId, quantity: safeQuantity });
    setCart(cart);
  }
  function updateCartCounters() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    ['cartCounter', 'cartCounterMobile'].forEach((id) => {
      const badge = document.getElementById(id);
      if (badge) badge.textContent = String(count);
    });
  }
  function setActiveNavLink() {
    const map = { 'index.html': 'home', 'shop.html': 'shop', 'product.html': 'shop', 'about.html': 'about', 'contact.html': 'contact' };
    const activeKey = map[fileName] || 'home';
    document.querySelectorAll(`[data-nav="${activeKey}"]`).forEach((link) => { link.classList.add('active'); });
  }
  function initMobileMenu() {
    const toggleButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!toggleButton || !mobileMenu) return;
    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open', !expanded);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
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
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-rise, .reveal-scale');
    if (!revealElements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealElements.forEach((element) => observer.observe(element));
  }

  function createProductCard(product) {
    const item = getLocalizedProduct(product);
    return `
      <article class="product-card reveal-rise">
        <img src="${item.image}" alt="${item.displayName}" loading="lazy">
        <div class="card-body">
          <div class="card-topline">
            <div>
              <p class="section-kicker">${item.displayCategory}</p>
              <h3 class="font-display text-4xl text-[#24170c] mt-3">${item.displayName}</h3>
            </div>
            <span class="price-pill">${formatPrice(item.price)}</span>
          </div>
          <p class="card-blurb">${item.displayDescription}</p>
          <div class="card-actions">
            <a href="${basePath}pages/product.html?id=${item.id}" class="btn-ghost">${t('details')}</a>
            <button class="btn-premium add-cart" data-id="${item.id}">${t('add')}</button>
            <button class="btn-ghost quick-view" data-id="${item.id}">${t('quickView')}</button>
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

  function initProductActions(scope) {
    const safeScope = scope || document;
    safeScope.querySelectorAll('.add-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (id) addToCart(id, 1);
      });
    });
    safeScope.querySelectorAll('.quick-view').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (id) openModal(id);
      });
    });
  }

  function openModal(productId) {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    const item = getLocalizedProduct(product);
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalImage) { modalImage.src = item.image; modalImage.alt = item.displayName; }
    if (modalCategory) modalCategory.textContent = item.displayCategory;
    if (modalName) modalName.textContent = item.displayName;
    if (modalDescription) modalDescription.textContent = item.displayDescription;
    if (modalPrice) modalPrice.textContent = formatPrice(item.price);
    if (modalAddToCart) {
      modalAddToCart.textContent = t('add');
      modalAddToCart.onclick = () => addToCart(item.id, 1);
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
    modal.querySelectorAll('[data-close-modal]').forEach((element) => { element.addEventListener('click', closeModal); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  }

  function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    const slides = Array.from(track.children);
    let index = 0;
    setInterval(() => {
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 4600);
  }

  function setYear() {
    const node = document.getElementById('yearNow');
    if (node) node.textContent = String(new Date().getFullYear());
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

  window.AsalnaCart = { addToCart, updateCartCounters, getCart };
  window.AsalnaI18n = { t, getLang: () => currentLang, formatPrice, getLocalizedProduct, applyLanguage };
})();
