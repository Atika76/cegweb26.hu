document.documentElement.classList.add('js');

// GYIK: billentyűzettel is használható, az állapotot az aria-expanded jelzi.
document.querySelectorAll('.faq-q').forEach((button) => {
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = !item.classList.contains('open');
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// Finom belépő animáció; JavaScript nélkül minden tartalom látható marad.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('show'));
}

// Űrlap küldési visszajelzés.
document.querySelectorAll('form[data-email-form]').forEach((form) => {
  form.addEventListener('submit', () => {
    const submitButton = form.querySelector('[type="submit"]');
    const notice = form.querySelector('.notice');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Küldés folyamatban…';
    }
    if (notice) {
      notice.textContent = 'Az üzenet küldése folyamatban van. Kérlek, ne zárd be az oldalt.';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
    }
  });
});

function applyPrefill(template, pack) {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const templateSelect = document.getElementById('templateSelect');
  const packageSelect = document.getElementById('packageSelect');
  if (templateSelect && template) {
    const option = [...templateSelect.options].find((item) => item.value === template || item.textContent.trim() === template);
    if (option) templateSelect.value = option.value;
  }
  if (packageSelect && pack) {
    const wanted = pack.toLowerCase();
    const option = [...packageSelect.options].find((item) => item.value.toLowerCase().includes(wanted) || item.textContent.toLowerCase().includes(wanted));
    if (option) packageSelect.value = option.value;
  }
  const message = form.querySelector('textarea[name="Üzenet"]');
  if (message && !message.value.trim()) {
    const details = [template, pack ? `${pack} csomag` : ''].filter(Boolean).join(', ');
    message.value = details ? `Erről a megoldásról szeretnék előzetesen egyeztetni: ${details}.` : '';
  }
}

document.querySelectorAll('.js-prefill').forEach((button) => {
  button.addEventListener('click', () => applyPrefill(button.dataset.template || '', button.dataset.package || ''));
});

(() => {
  const params = new URLSearchParams(window.location.search);
  const template = params.get('template') || '';
  const pack = params.get('csomag') || params.get('package') || '';
  if (template || pack) {
    applyPrefill(template, pack);
    const form = document.getElementById('quoteForm');
    if (form) setTimeout(() => form.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }
})();

// Mobilmenü.
(() => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menu.inert = !open;
    toggle.textContent = open ? '×' : '☰';
  };

  setOpen(false);
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (menu.classList.contains('open') && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setOpen(false);
  });
})();

// A fejléc lefelé görgetve elbújik, felfelé azonnal megjelenik.
(() => {
  const header = document.querySelector('.topbar');
  if (!header) return;
  let lastScrollY = Math.max(0, window.scrollY);
  let ticking = false;
  const update = () => {
    const current = Math.max(0, window.scrollY);
    const difference = current - lastScrollY;
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOpen = mobileMenu && mobileMenu.classList.contains('open');
    const headerFocused = header.contains(document.activeElement);
    if (current <= 24 || menuOpen || headerFocused) header.classList.remove('header-hidden');
    else if (difference > 7) header.classList.add('header-hidden');
    else if (difference < -7) header.classList.remove('header-hidden');
    lastScrollY = current;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
})();
