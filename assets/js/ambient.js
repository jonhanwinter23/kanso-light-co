function toggleVirtualLamp() {
  state.isVirtualLampOn = !state.isVirtualLampOn;
  const overlay = document.getElementById('roomOverlay');
  const lamp = document.getElementById('virtualLamp');
  const text = document.getElementById('lampStateText');
  if (!overlay || !lamp || !text) return;

  const texts = i18n[state.currentLang];
  if (state.isVirtualLampOn) {
    overlay.style.backgroundColor = 'rgba(0,0,0,0.1)';
    lamp.classList.add('glow-effect');
    lamp.textContent = '💡';
    text.textContent = texts.lampStateOn;
    text.className = 'font-bold text-kanso-terracotta';
  } else {
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    lamp.classList.remove('glow-effect');
    lamp.textContent = '🔌';
    text.textContent = texts.lampStateOff;
    text.className = 'font-bold text-stone-500';
  }
}

function toggleNightMode() {
  state.isNightMode = !state.isNightMode;
  document.body.classList.toggle('night-mode', state.isNightMode);
  const hero = document.getElementById('heroSection');
  if (hero) hero.classList.toggle('bg-stone-900', state.isNightMode);

  setText(
    'ambientBtnText',
    state.isNightMode
      ? state.currentLang === 'km'
        ? 'ពន្លឺថ្ងៃ'
        : 'Day Mode ☀️'
      : i18n[state.currentLang].ambientBtnText
  );
}

function bindAmbientControls() {
  document.getElementById('virtualLamp')?.addEventListener('click', toggleVirtualLamp);
}
