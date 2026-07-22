const STORAGE_CART = 'kanso_cart';
const STORAGE_LANG = 'kanso_lang';

const state = {
  currentLang: localStorage.getItem(STORAGE_LANG) || 'km',
  cart: [],
  currentCategory: 'all',
  isNightMode: false,
  isVirtualLampOn: true,
};

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_CART);
    state.cart = raw ? JSON.parse(raw) : [];
  } catch {
    state.cart = [];
  }
}

function saveCartToStorage() {
  localStorage.setItem(STORAGE_CART, JSON.stringify(state.cart));
}

function saveLangToStorage() {
  localStorage.setItem(STORAGE_LANG, state.currentLang);
}

loadCartFromStorage();
