const messages = [
  "Your coffee today secretly knows one of your childhood jokes.",
  "A stubborn sock will finally reveal its whereabouts tonight.",
  "You will invent a polite excuse for talking to houseplants.",
  "The internet will recommend the exact odd recipe you needed.",
  "A tiny invisible parade will march across your bookshelf.",
  "Today the clouds might wink at you—return the favor.",
  "You will discover a sentence that makes silence laugh.",
  "A spoon will philosophize with you about cereal choices.",
  "You have excellent taste in improbable coincidences.",
  "A lost idea will come back wearing sunglasses."
];

function dailyIndexFor(date) {
  const d = date.toISOString().slice(0,10);
  let h = 2166136261;
  for (let i = 0; i < d.length; i++) {
    h ^= d.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h) % messages.length;
}

function showTodayQuirk() {
  const idx = dailyIndexFor(new Date());
  const msg = messages[idx];
  const el = document.getElementById('message');
  el.classList.remove('fade-in');
  void el.offsetWidth;
  el.textContent = msg;
  el.classList.add('fade-in');
}

document.getElementById('quirkBtn').addEventListener('click', showTodayQuirk);
