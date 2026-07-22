function navLinkClass(page, target) {
  return page === target
    ? 'nav-link-active text-kanso-terracotta'
    : 'text-kanso-dark hover:text-kanso-terracotta';
}

function renderBanner() {
  return `
  <div class="bg-kanso-dark text-kanso-bg text-xs py-2 px-4 text-center font-light tracking-wide flex justify-between items-center max-w-full overflow-hidden">
    <div class="mx-auto flex items-center gap-2">
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span id="bannerText"></span>
    </div>
    <div class="hidden sm:flex items-center gap-3">
      <button type="button" data-action="toggle-language" class="bg-stone-800 hover:bg-stone-700 text-amber-100 text-[11px] px-2.5 py-0.5 rounded-full transition border border-stone-700 flex items-center gap-1">
        <span id="langFlag">🇰🇭</span>
        <span id="langBtnText">EN</span>
      </button>
      <button type="button" data-action="toggle-night" class="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-amber-200 text-[11px] px-2.5 py-0.5 rounded-full transition border border-stone-700">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        <span id="ambientBtnText"></span>
      </button>
    </div>
  </div>`;
}

function renderHeader(page) {
  const categoryNav =
    page === 'shop'
      ? `
      <nav class="flex justify-center space-x-6 sm:space-x-10 py-3 text-xs sm:text-sm font-medium border-t border-kanso-border/60 overflow-x-auto whitespace-nowrap no-scrollbar">
        <button type="button" data-category="all" class="cat-btn text-kanso-terracotta font-semibold border-b-2 border-kanso-terracotta pb-1" data-cat="all" id="catAll"></button>
        <button type="button" data-category="table" class="cat-btn text-kanso-muted hover:text-kanso-dark pb-1" data-cat="table" id="catTable"></button>
        <button type="button" data-category="floor" class="cat-btn text-kanso-muted hover:text-kanso-dark pb-1" data-cat="floor" id="catFloor"></button>
        <button type="button" data-category="japandi" class="cat-btn text-kanso-muted hover:text-kanso-dark pb-1" data-cat="japandi" id="catJapandi"></button>
        <button type="button" data-category="bulbs" class="cat-btn text-kanso-muted hover:text-kanso-dark pb-1" data-cat="bulbs" id="catBulbs"></button>
      </nav>`
      : '';

  const searchBlock =
    page === 'shop'
      ? `
        <div class="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input type="search" id="searchInput" placeholder="" class="w-full bg-[#F0ECE3] border border-transparent rounded-full py-2 px-4 pl-10 text-xs sm:text-sm focus:outline-none focus:border-kanso-dark transition placeholder-kanso-muted">
          <svg class="w-4 h-4 absolute left-3.5 top-3 text-kanso-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>`
      : `<div class="hidden md:block flex-1 max-w-md mx-8"></div>`;

  return `
  <header class="border-b border-kanso-border bg-kanso-bg/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <a href="index.html" class="flex flex-col group">
          <span class="text-3xl font-semibold tracking-wide text-kanso-dark group-hover:text-kanso-terracotta transition">kansō</span>
          <span class="text-[10px] font-medium tracking-[0.25em] text-kanso-muted uppercase -mt-1">LIGHT CO.</span>
        </a>
        ${searchBlock}
        <div class="flex items-center space-x-3 sm:space-x-5 text-sm">
          <button type="button" data-action="toggle-language" class="sm:hidden text-xs bg-stone-200 px-2 py-1 rounded-full font-medium">
            <span id="mobileLangText">🇰🇭 KM</span>
          </button>
          <button type="button" data-action="toggle-night" class="sm:hidden p-2 rounded-full bg-stone-200" aria-label="Night mode">🌙</button>
          <nav class="hidden sm:flex items-center gap-5 text-xs sm:text-sm font-medium">
            <a href="index.html" id="navHome" class="${navLinkClass(page, 'home')} transition"></a>
            <a href="catalog.html" id="navShop" class="${navLinkClass(page, 'shop')} transition"></a>
            <a href="about.html" id="navStory" class="${navLinkClass(page, 'about')} transition"></a>
            <a href="contact.html" id="navStudio" class="${navLinkClass(page, 'contact')} transition"></a>
          </nav>
          <button type="button" data-action="toggle-cart" class="relative bg-kanso-dark text-kanso-bg px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-kanso-terracotta transition shadow-sm text-xs sm:text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span id="navCartText"></span>
            <span id="cartCount" class="bg-kanso-terracotta text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
      ${categoryNav}
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="bg-kanso-dark text-[#E5E0D8] pt-16 pb-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-sm">
      <div>
        <span class="text-3xl font-semibold tracking-wide text-white block mb-2">kansō</span>
        <p class="text-xs text-[#A8A299] leading-relaxed mb-4" id="footerBrandDesc"></p>
        <p class="text-xs text-amber-200/90 font-medium">📍 Phnom Penh, Cambodia</p>
      </div>
      <div>
        <h4 class="text-white font-medium mb-4 text-xs uppercase tracking-wider" id="footerNavTitle"></h4>
        <ul class="space-y-2 text-xs text-[#A8A299]">
          <li><a href="catalog.html?cat=table" class="hover:text-white transition" id="footerL1"></a></li>
          <li><a href="catalog.html?cat=floor" class="hover:text-white transition" id="footerL2"></a></li>
          <li><a href="catalog.html?cat=japandi" class="hover:text-white transition" id="footerL3"></a></li>
          <li><a href="catalog.html?cat=bulbs" class="hover:text-white transition" id="footerL4"></a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-medium mb-4 text-xs uppercase tracking-wider" id="footerCareTitle"></h4>
        <ul class="space-y-2 text-xs text-[#A8A299]">
          <li><a href="#" data-alert-key="alertShipping" class="hover:text-white transition" id="footerC1"></a></li>
          <li><a href="#" data-alert-key="alertWarranty" class="hover:text-white transition" id="footerC2"></a></li>
          <li><a href="#" data-alert-key="alertBulb" class="hover:text-white transition" id="footerC3"></a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-medium mb-4 text-xs uppercase tracking-wider" id="footerOrderTitle"></h4>
        <p class="text-xs text-[#A8A299] mb-4" id="footerOrderDesc"></p>
        <div class="flex flex-col gap-2">
          <a href="${KANSO_TELEGRAM_LINK}" target="_blank" rel="noopener noreferrer" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2 px-4 rounded-lg text-center transition">✈️ Telegram</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold py-2 px-4 rounded-lg text-center transition border border-stone-700">📷 @kansolightco</a>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 border-t border-stone-800 pt-8 text-center text-xs text-[#8C857B]" id="footerCopyright"></div>
  </footer>`;
}

function renderOverlays() {
  return `
  <div id="cartDrawer" class="fixed inset-0 z-50 pointer-events-none opacity-0 transition-opacity duration-300">
    <div data-action="toggle-cart" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <div id="cartPanel" class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-kanso-bg shadow-2xl p-6 flex flex-col transform translate-x-full transition-transform duration-300 pointer-events-auto">
      <div class="flex items-center justify-between border-b border-kanso-border pb-4">
        <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
          <span id="drawerTitle"></span>
          <span class="text-xs bg-kanso-card border border-kanso-border px-2 py-0.5 rounded-full" id="drawerCartCount">0</span>
        </h3>
        <button type="button" data-action="toggle-cart" class="text-kanso-muted hover:text-kanso-dark p-2 text-xl">&times;</button>
      </div>
      <div id="cartItemsList" class="flex-1 overflow-y-auto py-4 space-y-4"></div>
      <div class="border-t border-kanso-border pt-4 space-y-3">
        <div class="flex justify-between text-xs sm:text-sm">
          <span class="text-kanso-muted" id="subtotalText"></span>
          <span id="cartSubtotal" class="font-bold text-kanso-dark">$0.00</span>
        </div>
        <div class="flex justify-between text-xs text-emerald-700">
          <span id="shippingText"></span>
          <span id="shippingVal"></span>
        </div>
        <div class="flex justify-between text-xs text-kanso-muted">
          <span id="accText"></span>
          <span id="accVal"></span>
        </div>
        <div class="border-t border-kanso-border pt-2 flex justify-between text-sm sm:text-base font-bold">
          <span id="totalText"></span>
          <span id="cartTotal" class="text-kanso-terracotta">$0.00</span>
        </div>
        <button type="button" data-action="checkout" class="w-full bg-kanso-dark hover:bg-kanso-terracotta text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg flex items-center justify-center gap-2">
          <span id="checkoutBtnText"></span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div id="quickModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-kanso-dark rounded-2xl max-w-2xl w-full p-6 relative overflow-hidden shadow-2xl border border-stone-600 max-h-[90vh] overflow-y-auto">
      <button type="button" data-action="close-quick" class="absolute top-4 right-4 text-2xl text-white/80 hover:text-white z-10">&times;</button>
      <div id="quickModalContent" class="grid sm:grid-cols-2 gap-6"></div>
    </div>
  </div>
  <div id="toast" class="fixed bottom-6 right-6 z-50 bg-kanso-dark text-white px-5 py-3 rounded-xl shadow-2xl transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 text-xs sm:text-sm">
    <span class="text-lg">✨</span>
    <span id="toastMsg"></span>
  </div>
  <div id="customAlertModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-kanso-bg rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-kanso-border">
      <div class="text-3xl">💡</div>
      <p id="customAlertText" class="text-xs sm:text-sm text-kanso-dark leading-relaxed"></p>
      <button type="button" data-action="close-alert" id="alertOkBtn" class="bg-kanso-dark text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-kanso-terracotta transition"></button>
    </div>
  </div>
  <div id="checkoutModal" class="fixed inset-0 z-[60] hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-kanso-bg rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-kanso-border max-h-[90vh] overflow-y-auto">
      <button type="button" data-action="close-checkout" class="absolute top-4 right-4 text-2xl text-kanso-muted hover:text-kanso-dark">&times;</button>
      <h2 class="text-lg sm:text-xl font-bold text-kanso-dark pr-8" id="checkoutTitle"></h2>
      <p class="text-xs text-kanso-muted mt-2 mb-4 leading-relaxed" id="checkoutSub"></p>
      <div class="bg-kanso-card rounded-xl border border-kanso-border p-4 mb-4">
        <div class="flex justify-between items-baseline mb-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-kanso-terracotta" id="checkoutSummaryTitle"></h3>
          <p class="text-xs text-kanso-muted" id="checkoutItemCount"></p>
        </div>
        <ul id="checkoutOrderSummary" class="mb-3"></ul>
        <div class="flex justify-between text-sm font-bold border-t border-kanso-border pt-2">
          <span id="checkoutTotalLabel"></span>
          <span id="checkoutOrderTotal" class="text-kanso-terracotta"></span>
        </div>
      </div>
      <form id="checkoutForm" class="space-y-3">
        <div>
          <label for="orderCustomerName" class="block text-xs font-medium text-kanso-dark mb-1" id="checkoutNameLabel"></label>
          <input type="text" id="orderCustomerName" autocomplete="name" class="w-full bg-white border border-kanso-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kanso-terracotta">
        </div>
        <div>
          <label for="orderPhone" class="block text-xs font-medium text-kanso-dark mb-1" id="checkoutPhoneLabel"></label>
          <input type="tel" id="orderPhone" required autocomplete="tel" class="w-full bg-white border border-kanso-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kanso-terracotta">
        </div>
        <div>
          <label for="orderAddress" class="block text-xs font-medium text-kanso-dark mb-1" id="checkoutAddressLabel"></label>
          <textarea id="orderAddress" required rows="3" class="w-full bg-white border border-kanso-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kanso-terracotta resize-none"></textarea>
        </div>
        <input type="text" id="orderHoneypot" name="company" tabindex="-1" autocomplete="off" class="absolute opacity-0 pointer-events-none h-0 w-0" aria-hidden="true">
        <p id="checkoutFormError" class="hidden text-xs text-red-600 font-medium"></p>
        <div class="flex flex-col sm:flex-row gap-2 pt-2">
          <button type="submit" class="flex-1 bg-kanso-dark hover:bg-kanso-terracotta text-white py-3 rounded-xl text-sm font-bold transition" id="checkoutSubmitBtn"></button>
          <button type="button" data-action="close-checkout" class="sm:w-auto px-6 py-3 rounded-xl text-sm font-medium border border-kanso-border hover:border-kanso-dark transition" id="checkoutCancelBtn"></button>
        </div>
      </form>
    </div>
  </div>`;
}

function mountSiteChrome(page) {
  const bannerEl = document.getElementById('site-banner');
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const overlaysEl = document.getElementById('site-overlays');

  if (bannerEl) bannerEl.innerHTML = renderBanner();
  if (headerEl) headerEl.innerHTML = renderHeader(page);
  if (footerEl) footerEl.innerHTML = renderFooter();
  if (overlaysEl) overlaysEl.innerHTML = renderOverlays();
}

function bindChromeActions() {
  document.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    if (action === 'toggle-language') toggleLanguage();
    if (action === 'toggle-night') toggleNightMode();
    if (action === 'toggle-cart') toggleCart();
    if (action === 'checkout') proceedToCheckout();
    if (action === 'close-checkout') closeCheckoutModal();
    if (action === 'close-quick') closeQuickView();
    if (action === 'close-alert') closeCustomAlert();
  });

  document.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => setCategory(btn.dataset.category));
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', filterProducts);

  document.querySelectorAll('[data-quick-view]').forEach((btn) => {
    btn.addEventListener('click', () => openQuickView(Number(btn.dataset.quickView)));
  });
}
