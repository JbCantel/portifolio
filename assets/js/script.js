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

// NEXT_FUNCTION

document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackground();
  // NEXT_INIT_CALL
});
