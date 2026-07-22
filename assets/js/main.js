function initSite() {
  const page = document.body.dataset.page || 'home';

  mountSiteChrome(page);
  bindChromeActions();
  bindCartActions();
  bindCatalogActions();
  bindFooterAlerts();
  bindAmbientControls();
  bindCheckoutForm();

  applyLanguage();
  updateCartUI();

  if (page === 'home') {
    renderFeatured();
    document.querySelectorAll('[data-quick-view]').forEach((btn) => {
      btn.addEventListener('click', () => openQuickView(Number(btn.dataset.quickView)));
    });
  }

  if (page === 'shop') {
    initCatalogFromUrl();
  }
}

document.addEventListener('DOMContentLoaded', initSite);
