function addToCart(id) {
  const item = products.find((p) => p.id === id);
  if (!item) return;

  const existing = state.cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ id: item.id, qty: 1 });

  saveCartToStorage();
  updateCartUI();
  showToast(`${i18n[state.currentLang].toastAdded}: "${item.name[state.currentLang]}"`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter((c) => c.id !== id);
  saveCartToStorage();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = state.cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else {
    saveCartToStorage();
    updateCartUI();
  }
}

function getCartLineItems() {
  return state.cart
    .map((c) => {
      const product = products.find((p) => p.id === c.id);
      return product ? { ...product, qty: c.qty } : null;
    })
    .filter(Boolean);
}

function updateCartUI() {
  const count = state.cart.reduce((acc, c) => acc + c.qty, 0);
  const lines = getCartLineItems();
  const total = lines.reduce((acc, c) => acc + c.price * c.qty, 0);
  const texts = i18n[state.currentLang];

  setText('cartCount', String(count));
  setText('drawerCartCount', `${count} ${texts.itemsSuffix}`);
  setText('cartSubtotal', `$${total.toFixed(2)}`);
  setText('cartTotal', `$${total.toFixed(2)}`);

  const list = document.getElementById('cartItemsList');
  if (!list) return;

  if (lines.length === 0) {
    list.innerHTML = `
      <div class="text-center py-12 text-kanso-muted space-y-2">
        <span class="text-4xl block">🛋️</span>
        <p class="text-xs sm:text-sm font-medium">${texts.emptyCartMsg}</p>
        <p class="text-[11px] sm:text-xs">${texts.emptyCartSub}</p>
      </div>`;
    return;
  }

  list.innerHTML = lines
    .map(
      (c) => `
    <div class="flex gap-4 bg-kanso-card p-3 rounded-xl border border-kanso-border">
      <img src="${c.image}" alt="" class="w-16 h-16 object-cover rounded-lg">
      <div class="flex-1 text-xs">
        <h4 class="font-bold text-kanso-dark">${c.name[state.currentLang]}</h4>
        <p class="text-kanso-muted mt-0.5">$${c.price.toFixed(2)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button type="button" data-qty-minus="${c.id}" class="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 font-bold">-</button>
          <span class="font-bold">${c.qty}</span>
          <button type="button" data-qty-plus="${c.id}" class="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 font-bold">+</button>
        </div>
      </div>
      <div class="text-right flex flex-col justify-between">
        <span class="font-bold text-sm text-kanso-dark">$${(c.price * c.qty).toFixed(2)}</span>
        <button type="button" data-remove-cart="${c.id}" class="text-xs text-red-500 hover:underline">${texts.remove}</button>
      </div>
    </div>`
    )
    .join('');
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const panel = document.getElementById('cartPanel');
  if (!drawer || !panel) return;

  if (drawer.classList.contains('opacity-0')) {
    drawer.classList.remove('opacity-0', 'pointer-events-none');
    panel.classList.remove('translate-x-full');
  } else {
    drawer.classList.add('opacity-0', 'pointer-events-none');
    panel.classList.add('translate-x-full');
  }
}

function bindCartActions() {
  document.addEventListener('click', (e) => {
    const minus = e.target.closest('[data-qty-minus]');
    if (minus) {
      changeQty(Number(minus.dataset.qtyMinus), -1);
      return;
    }
    const plus = e.target.closest('[data-qty-plus]');
    if (plus) {
      changeQty(Number(plus.dataset.qtyPlus), 1);
      return;
    }
    const remove = e.target.closest('[data-remove-cart]');
    if (remove) removeFromCart(Number(remove.dataset.removeCart));
  });
}
