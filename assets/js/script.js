gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initAmbientBackground() {
  const blobs = document.querySelectorAll('.ambient-blob');
  if (prefersReducedMotion()) {
    return;
  }

  blobs.forEach((blob, index) => {
    gsap.to(blob, {
      x: index % 2 === 0 ? 60 : -60,
      y: index % 2 === 0 ? -40 : 40,
      duration: 10 + index * 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  });
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// NEXT_FUNCTION

document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackground();
  initNav();
  // NEXT_INIT_CALL
});
