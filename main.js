/* ─────────────────────────────────────────────────
   Climate Invest · COP31 — main.js v4
   Loader + navigation + scroll reveal
───────────────────────────────────────────────── */

/* PAGE LOADER ----------------------------------------------- */
(function () {
  const loader = document.getElementById('pageLoader');
  const MIN_MS = 2000; // minimum display time (ms)
  const start = performance.now();

  function dismiss() {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_MS - elapsed);
    setTimeout(() => loader.classList.add('loader-done'), remaining);
  }

  // Dismiss after fonts loaded OR after a hard cap (4 s)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(dismiss);
  } else {
    window.addEventListener('load', dismiss);
  }
  // Hard cap in case fonts.ready never resolves
  setTimeout(() => loader.classList.add('loader-done'), 4000);
}());


/* Nav shadow on scroll */
const navHeader = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* Mobile hamburger */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

/* Close menu when a link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

/* Active nav link by scroll position */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinkEls.forEach(link => {
      link.classList.toggle(
        'nav-link--active',
        link.getAttribute('href') === `#${id}`
      );
    });
  });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

sections.forEach(s => sectionObs.observe(s));

/* Scroll reveal — staggered by sibling index */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children)
      .filter(el => el.classList.contains('reveal'));
    const idx = siblings.indexOf(entry.target);
    // Stagger: 0, 80, 160 ms — capped at 320 ms
    const delay = Math.min(idx * 80, 320);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));
