// Decision Garden interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Fade-in animations */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => obs.observe(el));

  /* Floating emoji random delay */
  document.querySelectorAll('.emoji.float').forEach(el => {
    el.style.animationDelay = (Math.random() * 2) + 's';
    el.style.animationDuration = (3 + Math.random() * 2) + 's';
  });

  /* Ripple / micro-burst on click */
  function addClickBurst(el) {
    el.addEventListener('click', (ev) => {
      const rect = el.getBoundingClientRect();
      const circle = document.createElement('div');
      const size = Math.max(rect.width, rect.height) * 1.2;
      circle.style.position = 'absolute';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (ev.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (ev.clientY - rect.top - size / 2) + 'px';
      circle.style.borderRadius = '50%';
      circle.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 40%)';
      circle.style.pointerEvents = 'none';
      circle.style.transition = 'transform .6s ease, opacity .6s ease';
      circle.style.transform = 'scale(.2)';
      circle.style.opacity = '1';
      el.appendChild(circle);
      requestAnimationFrame(() => {
        circle.style.transform = 'scale(1)';
        circle.style.opacity = '0';
      });
      setTimeout(() => circle.remove(), 700);
    });
  }
  document.querySelectorAll('.feature-card, .garden-card, .task-card').forEach(addClickBurst);

  /* Mark current nav link active */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* Theme toggle */
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem('dg-theme', t);
    const btn = document.querySelector('.theme-toggle div');
    if (btn) btn.textContent = t === 'light' ? '☀️ Light' : '🌙 Dark';
  }
  const saved = localStorage.getItem('dg-theme')
    || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(saved);
  if (toggle) {
    toggle.addEventListener('click', () => {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* Task double-click toggle */
  document.querySelectorAll('.task-card').forEach(tc => {
    tc.addEventListener('dblclick', () => {
      tc.style.transition = 'transform .3s ease, opacity .3s ease';
      tc.style.opacity = tc.style.opacity === '0.6' ? '1' : '0.6';
      tc.classList.toggle('done');
    });
  });

  /* Motivational quotes (Home) */
  const quotes = [
    "🌱 Every small task is a seed of progress.",
    "🌸 Focus today, bloom tomorrow.",
    "⚡ Energy flows where attention goes.",
    "🌳 Growth takes time — nurture your projects.",
    "🍂 Revive neglected ideas; they can still grow."
  ];
  const quoteEl = document.querySelector('.quote');
  if (quoteEl) {
    let i = 0;
    function showQuote() {
      quoteEl.classList.remove('visible');
      setTimeout(() => {
        quoteEl.textContent = quotes[i];
        quoteEl.classList.add('visible');
        i = (i + 1) % quotes.length;
      }, 400);
    }
    showQuote();
    setInterval(showQuote, 5000);
  }
});
