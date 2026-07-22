function renderProductCard(p, texts) {
  return `
    <div data-product-card="${p.id}" class="product-card group bg-kanso-card rounded-2xl overflow-hidden border border-kanso-border/70 hover:border-kanso-terracotta transition duration-300 shadow-sm hover:shadow-md flex flex-col cursor-pointer" role="button" tabindex="0" aria-label="${p.name[state.currentLang]}">
      <div class="w-full h-72 bg-stone-200 overflow-hidden relative pointer-events-none">
        <img src="${p.image}" alt="${p.name[state.currentLang]}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        ${
          p.badge[state.currentLang]
            ? `<span class="absolute top-3 left-3 bg-kanso-dark text-kanso-bg text-[10px] font-bold px-2.5 py-1 rounded-md">${p.badge[state.currentLang]}</span>`
            : ''
        }
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between pointer-events-none">
        <div>
          <p class="text-xs text-kanso-muted mb-1">${p.specs[state.currentLang]}</p>
          <h3 class="font-bold text-base text-kanso-dark group-hover:text-kanso-terracotta transition">${p.name[state.currentLang]}</h3>
        </div>
        <div class="mt-4 pt-3 border-t border-kanso-border/60 flex items-center justify-between gap-2">
          <span class="text-lg font-bold text-kanso-dark">$${p.price.toFixed(2)}</span>
          <span class="text-[10px] sm:text-xs font-semibold text-kanso-muted group-hover:text-kanso-terracotta transition">${texts.cardTapHint}</span>
        </div>
      </div>
    </div>`;
}

function getFilteredProducts() {
  const searchInput = document.getElementById('searchInput');
  const searchVal = searchInput ? searchInput.value.toLowerCase() : '';

  return products.filter((p) => {
    const matchesCategory =
      state.currentCategory === 'all' || p.tags.includes(state.currentCategory);
    const pName = p.name[state.currentLang].toLowerCase();
    const pSpecs = p.specs[state.currentLang].toLowerCase();
    const matchesSearch = pName.includes(searchVal) || pSpecs.includes(searchVal);
    return matchesCategory && matchesSearch;
  });
}

function renderCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = getFilteredProducts();
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = String(filtered.length);

  const texts = i18n[state.currentLang];
  grid.innerHTML = filtered.map((p) => renderProductCard(p, texts)).join('');
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = products.filter((p) => [1, 2, 7].includes(p.id));
  const texts = i18n[state.currentLang];
  grid.innerHTML = featured.map((p) => renderProductCard(p, texts)).join('');
}

function setCategory(cat, options = {}) {
  state.currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach((btn) => {
    if (btn.dataset.cat === cat) {
      btn.classList.add(
        'text-kanso-terracotta',
        'font-semibold',
        'border-b-2',
        'border-kanso-terracotta'
      );
      btn.classList.remove('text-kanso-muted');
    } else {
      btn.classList.remove(
        'text-kanso-terracotta',
        'font-semibold',
        'border-b-2',
        'border-kanso-terracotta'
      );
      btn.classList.add('text-kanso-muted');
    }
  });
  renderCatalog();
  if (options.scroll !== false && document.getElementById('catalog')) {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  }
}

function filterProducts() {
  renderCatalog();
}

function initCatalogFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat && ['all', 'table', 'floor', 'japandi', 'bulbs'].includes(cat)) {
    setCategory(cat, { scroll: false });
    return;
  }
  renderCatalog();
}

function bindCatalogActions(root = document) {
  root.addEventListener('click', (e) => {
    const qvBtn = e.target.closest('[data-quick-view]');
    if (qvBtn) {
      e.stopPropagation();
      openQuickView(Number(qvBtn.dataset.quickView));
      return;
    }
    const card = e.target.closest('[data-product-card]');
    if (card) {
      addToCartAndOpenDrawer(Number(card.dataset.productCard));
    }
  });

  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-product-card]');
    if (!card) return;
    e.preventDefault();
    addToCartAndOpenDrawer(Number(card.dataset.productCard));
  });
}
