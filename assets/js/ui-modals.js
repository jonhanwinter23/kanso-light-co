function openQuickView(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;

  const content = document.getElementById('quickModalContent');
  const modal = document.getElementById('quickModal');
  if (!content || !modal) return;

  const t = i18n[state.currentLang];
  content.innerHTML = `
    <div class="rounded-xl overflow-hidden bg-stone-200 h-64 sm:h-full">
      <img src="${p.image}" alt="${p.name[state.currentLang]}" class="w-full h-full object-cover">
    </div>
    <div class="flex flex-col justify-between space-y-4">
      <div>
        <span class="text-xs text-kanso-terracotta uppercase font-bold tracking-wider">${p.specs[state.currentLang]}</span>
        <h3 class="text-xl sm:text-2xl font-bold text-kanso-dark mt-1">${p.name[state.currentLang]}</h3>
        <p class="text-xl sm:text-2xl font-semibold text-kanso-dark mt-2">$${p.price.toFixed(2)}</p>
        <p class="text-xs text-kanso-muted mt-3 leading-relaxed">${p.desc[state.currentLang]}</p>
        <div class="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
          <p class="font-bold">✓ ${t.freeBulb}</p>
          <p>✓ ${t.sameDay}</p>
        </div>
      </div>
      <button type="button" id="quickViewAddBtn" data-id="${p.id}" class="w-full bg-kanso-dark hover:bg-kanso-terracotta text-white py-3 rounded-xl font-bold transition text-xs sm:text-sm">
        ${t.quickAdd} • $${p.price.toFixed(2)}
      </button>
    </div>`;

  modal.classList.remove('hidden');
  document.getElementById('quickViewAddBtn')?.addEventListener('click', () => {
    addToCart(p.id);
    closeQuickView();
  });
}

function closeQuickView() {
  document.getElementById('quickModal')?.classList.add('hidden');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  setText('toastMsg', msg);
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

function showCustomAlert(msg) {
  setText('customAlertText', msg);
  document.getElementById('customAlertModal')?.classList.remove('hidden');
}

function closeCustomAlert() {
  document.getElementById('customAlertModal')?.classList.add('hidden');
}

function bindFooterAlerts() {
  document.querySelectorAll('[data-alert-key]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const key = el.dataset.alertKey;
      const texts = i18n[state.currentLang];
      if (texts[key]) showCustomAlert(texts[key]);
    });
  });
}
