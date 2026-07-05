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

function initLenis() {
  if (prefersReducedMotion()) {
    return null;
  }

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetSelector = link.getAttribute('href');

      // Skip bare "#" placeholder links (e.g. WhatsApp/GitHub/LinkedIn
      // links awaiting real URLs) — there's no element to scroll to.
      if (!targetSelector || targetSelector === '#') {
        return;
      }

      const targetEl = document.querySelector(targetSelector);
      if (!targetEl) {
        return;
      }

      event.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      lenis.scrollTo(targetSelector, { offset: -headerOffset });
    });
  });

  return lenis;
}

function initReveal() {
  const items = gsap.utils.toArray('.reveal');

  items.forEach((el) => {
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

function initHero() {
  Splitting();

  const chars = document.querySelectorAll('.hero__title .char');

  if (prefersReducedMotion()) {
    gsap.set(chars, { opacity: 1, y: 0 });
    gsap.set('.hero__subtitle, .hero__actions', { opacity: 1, y: 0 });
    return;
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  timeline
    .to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.02
    })
    .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero__actions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
}

function initProcessTimeline() {
  const steps = gsap.utils.toArray('.timeline__step');

  if (prefersReducedMotion()) {
    gsap.set(steps, { opacity: 1, y: 0 });
    return;
  }

  gsap.to(steps, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// NEXT_FUNCTION

document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackground();
  initNav();
  initLenis();
  initReveal();
  initHero();
  initProcessTimeline();
  initFooterYear();
  // NEXT_INIT_CALL
});
