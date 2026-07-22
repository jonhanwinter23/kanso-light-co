function getOrderStats(lines) {
  const productCount = lines.length;
  const pieceCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  return { productCount, pieceCount, total };
}

function buildOrderMessage(lines, customer) {
  const { productCount, pieceCount, total } = getOrderStats(lines);
  const isKm = state.currentLang === 'km';
  const linesText = lines
    .map((line, index) => {
      const lineTotal = (line.price * line.qty).toFixed(2);
      const label =
        line.name.km && line.name.en
          ? `${line.name.km} (${line.name.en})`
          : line.name[state.currentLang];
      return `${index + 1}. ${label} × ${line.qty} — $${lineTotal}`;
    })
    .join('\n');

  const nameLine = customer.name
    ? isKm
      ? `👤 ឈ្មោះ: ${customer.name}`
      : `👤 Name: ${customer.name}`
    : '';

  if (isKm) {
    return [
      '🛒 KANSŌ Light Co. — ការកម៉្មង់ថ្មី',
      '',
      `📦 ${productCount} ម៉ូដ / ${pieceCount} ដុំ`,
      '',
      linesText,
      '',
      `💰 សរុប: $${total.toFixed(2)}`,
      '🚚 ដឹកជញ្ជូនភ្នំពេញ: ឥតគិតថ្លៃ',
      '',
      nameLine,
      `📞 ទូររបស់អតិថិជន: ${customer.phone}`,
      `📍 ទីតាំងដឹកជញ្ជូន: ${customer.address}`,
      '',
      '— ផ្ញើពីគេហទំព័រ KANSŌ (bot)',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    '🛒 KANSŌ Light Co. — New order',
    '',
    `📦 ${productCount} product(s) / ${pieceCount} item(s)`,
    '',
    linesText,
    '',
    `💰 Total: $${total.toFixed(2)}`,
    '🚚 Phnom Penh delivery: FREE',
    '',
    nameLine,
    `📞 Customer phone: ${customer.phone}`,
    `📍 Delivery location: ${customer.address}`,
    '',
    '— Sent from KANSŌ website (bot)',
  ]
    .filter(Boolean)
    .join('\n');
}

function normalizePhone(raw) {
  return raw.replace(/[\s-]/g, '').trim();
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

function renderCheckoutSummary() {
  const lines = getCartLineItems();
  const summaryEl = document.getElementById('checkoutOrderSummary');
  const countEl = document.getElementById('checkoutItemCount');
  const totalEl = document.getElementById('checkoutOrderTotal');
  if (!summaryEl || !countEl || !totalEl) return;

  const { productCount, pieceCount, total } = getOrderStats(lines);
  const t = i18n[state.currentLang];

  countEl.textContent = t.checkoutCountLabel
    .replace('{products}', String(productCount))
    .replace('{pieces}', String(pieceCount));

  totalEl.textContent = `$${total.toFixed(2)}`;

  summaryEl.innerHTML = lines
    .map(
      (line) => `
    <li class="flex justify-between gap-3 text-xs sm:text-sm py-2 border-b border-kanso-border/50 last:border-0">
      <span class="text-kanso-dark"><span class="font-bold">${line.qty}×</span> ${line.name[state.currentLang]}</span>
      <span class="font-semibold whitespace-nowrap">$${(line.price * line.qty).toFixed(2)}</span>
    </li>`
    )
    .join('');
}

function openCheckoutModal() {
  const lines = getCartLineItems();
  if (lines.length === 0) {
    showCustomAlert(i18n[state.currentLang].emptyCartCheckout);
    return;
  }

  renderCheckoutSummary();
  const err = document.getElementById('checkoutFormError');
  if (err) {
    err.classList.add('hidden');
    err.textContent = '';
  }

  const submitBtn = document.getElementById('checkoutSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }

  document.getElementById('checkoutModal')?.classList.remove('hidden');
  toggleCart();
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.add('hidden');
}

async function postOrderToServer(message, honeypot) {
  if (!KANSO_ORDER_API_URL) {
    throw new Error('NO_API');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (KANSO_ORDER_API_SECRET) {
    headers['X-Order-Secret'] = KANSO_ORDER_API_SECRET;
  }

  const response = await fetch(KANSO_ORDER_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, honeypot: honeypot || '' }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || !data.ok) {
    const err = new Error(data.error || 'REQUEST_FAILED');
    err.code = response.status;
    throw err;
  }
}

async function submitOrderToTelegram(event) {
  event.preventDefault();

  const lines = getCartLineItems();
  if (lines.length === 0) {
    showCustomAlert(i18n[state.currentLang].emptyCartCheckout);
    return;
  }

  const t = i18n[state.currentLang];
  const name = document.getElementById('orderCustomerName')?.value.trim() || '';
  const phoneRaw = document.getElementById('orderPhone')?.value.trim() || '';
  const address = document.getElementById('orderAddress')?.value.trim() || '';
  const honeypot = document.getElementById('orderHoneypot')?.value || '';
  const errorEl = document.getElementById('checkoutFormError');
  const submitBtn = document.getElementById('checkoutSubmitBtn');

  if (!isValidPhone(phoneRaw)) {
    if (errorEl) {
      errorEl.textContent = t.checkoutPhoneInvalid;
      errorEl.classList.remove('hidden');
    }
    document.getElementById('orderPhone')?.focus();
    return;
  }

  if (address.length < 5) {
    if (errorEl) {
      errorEl.textContent = t.checkoutAddressRequired;
      errorEl.classList.remove('hidden');
    }
    document.getElementById('orderAddress')?.focus();
    return;
  }

  if (errorEl) errorEl.classList.add('hidden');

  const customer = {
    name,
    phone: normalizePhone(phoneRaw),
    address,
  };

  const message = buildOrderMessage(lines, customer);

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
    submitBtn.dataset.defaultLabel = submitBtn.dataset.defaultLabel || submitBtn.textContent;
    submitBtn.textContent = t.checkoutSending;
  }

  try {
    await postOrderToServer(message, honeypot);

    state.cart = [];
    saveCartToStorage();
    updateCartUI();

    document.getElementById('checkoutForm')?.reset();
    closeCheckoutModal();
    showToast(t.checkoutSuccess);
  } catch (err) {
    if (errorEl) {
      errorEl.classList.remove('hidden');
      if (err.message === 'NO_API' || err.code === 503) {
        errorEl.textContent = t.checkoutNotConfigured;
      } else {
        errorEl.textContent = t.checkoutError;
      }
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      submitBtn.textContent = submitBtn.dataset.defaultLabel || t.checkoutSubmitBtn;
    }
  }
}

function proceedToCheckout() {
  openCheckoutModal();
}

function bindCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  form?.addEventListener('submit', submitOrderToTelegram);
}
