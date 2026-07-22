function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function applyLanguage() {
  const texts = i18n[state.currentLang];

  Object.keys(texts).forEach((key) => {
    if (key.startsWith('alert') && key !== 'alertOk') return;
    if (['remove', 'quickAdd', 'freeBulb', 'sameDay', 'emptyCartCheckout', 'checkoutCountLabel', 'checkoutSending', 'checkoutSuccess', 'checkoutError', 'checkoutNotConfigured', 'checkoutTelegramHint', 'checkoutTelegramHintCopied', 'cardTapHint'].includes(key)) return;
    setText(key, texts[key]);
  });

  setText('langBtnText', texts.langBtnText);
  setText('langFlag', state.currentLang === 'km' ? '🇬🇧' : '🇰🇭');
  setText('mobileLangText', state.currentLang === 'km' ? '🇰🇭 KM' : '🇬🇧 EN');
  setText(
    'ambientBtnText',
    state.isNightMode
      ? state.currentLang === 'km'
        ? 'ពន្លឺថ្ងៃ'
        : 'Day Mode ☀️'
      : texts.ambientBtnText
  );

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = texts.searchPlaceholder;

  setText(
    'lampStateText',
    state.isVirtualLampOn ? texts.lampStateOn : texts.lampStateOff
  );

  const alertOk = document.getElementById('alertOkBtn');
  if (alertOk) alertOk.textContent = texts.alertOk;

  const placeholders = [
    ['orderCustomerName', 'checkoutNamePlaceholder'],
    ['orderPhone', 'checkoutPhonePlaceholder'],
    ['orderAddress', 'checkoutAddressPlaceholder'],
  ];
  placeholders.forEach(([inputId, textKey]) => {
    const input = document.getElementById(inputId);
    if (input) input.placeholder = texts[textKey];
  });

  setText('checkoutTotalLabel', texts.totalText);

  if (document.body.dataset.page === 'home') {
    initHeroProduct(7);
  }

  document.documentElement.lang = state.currentLang;
}

function toggleLanguage() {
  state.currentLang = state.currentLang === 'km' ? 'en' : 'km';
  saveLangToStorage();
  applyLanguage();
  if (typeof renderCatalog === 'function') renderCatalog();
  if (typeof renderFeatured === 'function') renderFeatured();
  updateCartUI();
}
