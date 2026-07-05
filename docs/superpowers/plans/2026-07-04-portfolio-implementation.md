# Portfólio Pessoal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the one-page HTML/CSS/JS portfolio site for João Augusto Cantel, per `docs/superpowers/specs/2026-07-04-portfolio-design.md`.

**Architecture:** Fully static, semantic HTML in a single `index.html`, one `assets/css/style.css`, one `assets/js/script.js`. No build tools, no framework, no backend. Animation libraries (GSAP, ScrollTrigger, Lenis, Splitting.js) loaded via CDN `<script>` tags. Content is hardcoded in HTML (no JS rendering of content) for SEO and simplicity.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES6+), GSAP 3.12.5 + ScrollTrigger, Lenis v1, Splitting.js — all via CDN, no npm/build step.

## Global Constraints

- **Palette/typography/spacing tokens** (verbatim from spec, declared once in `:root`, never hardcoded elsewhere):
  ```css
  --color-bg: #05070a;
  --color-bg-alt: #0a0d12;
  --color-text: #f2f5f8;
  --color-text-muted: #8b96a3;
  --color-accent: #38bdf8;
  --color-accent-light: #7dd3fc;
  --color-accent-dark: #0284c7;
  --color-border: rgba(255, 255, 255, 0.08);
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius: 8px;
  --spacing-section: clamp(4rem, 8vw, 8rem);
  ```
- **No build tools.** All JS libraries load from CDN via `<script>` tags in `index.html`, in this exact order (each depends on the previous being loaded first): GSAP → ScrollTrigger → Lenis → Splitting → `assets/js/script.js`.
- **All content is static HTML** — no JS renders page copy from data arrays. JS only adds behavior (nav toggle, animations, smooth scroll, dynamic year).
- **Language:** all visible copy is Brazilian Portuguese (pt-BR), matching the spec's content verbatim.
- **Asset paths are relative** (`assets/css/style.css`, not `/assets/css/style.css`) so the site works regardless of where it's deployed inside `public_html`.
- **No automated test framework exists in this stack** (static site, no package.json, no test runner). Per the project's established workflow, verification is manual: Live Server + browser DevTools + visual/responsive inspection. Every task's "Verify" step replaces what would otherwise be an automated test run — do these checks for real, don't skip them.
- **Placeholders are intentional, not gaps.** The spec explicitly defers real projects, WhatsApp/GitHub/LinkedIn links, and the final domain. Wherever the plan uses `href="#"`, `SEU-DOMINIO-AQUI`, or `SEU-USUARIO`, leave it exactly as specified with its `<!-- TODO -->` comment — do not invent real values.
- **`prefers-reduced-motion: reduce` must be respected everywhere** — both via the global CSS rule (Task 1) and via the `prefersReducedMotion()` JS check (used by every animation function).

---

## Task 1: Project scaffolding, base styles, SEO base files

**Files:**
- Create: `index.html`
- Create: `assets/css/style.css`
- Create: `assets/js/script.js`
- Create: `robots.txt`
- Create: `sitemap.xml`

**Interfaces:**
- Produces: CSS custom properties on `:root` (listed in Global Constraints); utility classes `.container`, `.section`, `.section__title`; JS function `prefersReducedMotion()`; two literal marker comments in `script.js` (`// NEXT_FUNCTION` and `  // NEXT_INIT_CALL`) that every later task's JS edits target; one literal marker comment in `style.css` (`/* NEXT_SECTION_STYLES */`) that every later task's CSS edits target; one literal marker comment in `index.html` (`    <!-- NEXT_SECTION -->`) that every later section task's HTML edits target.
- Consumes: nothing (first task).

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>João Augusto Cantel — Web Designer e Desenvolvedor Web</title>
  <meta name="description" content="Web designer e desenvolvedor web especializado em sites profissionais com WordPress, código e inteligência artificial. Sites institucionais, landing pages e soluções digitais para empresas e prestadores de serviços.">
  <meta property="og:title" content="João Augusto Cantel — Web Designer e Desenvolvedor Web">
  <meta property="og:description" content="Sites institucionais e landing pages modernas, responsivas e alinhadas aos objetivos de empresas e prestadores de serviços.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="site-header" id="header">
    <div class="container site-header__inner">
      <a href="#hero" class="site-header__logo">João Cantel</a>
    </div>
  </header>

  <main>
    <!-- NEXT_SECTION -->
  </main>

  <footer class="site-footer">
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1/dist/lenis.min.js"></script>
  <script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
  <script src="assets/js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `assets/css/style.css`**

```css
:root {
  --color-bg: #05070a;
  --color-bg-alt: #0a0d12;
  --color-text: #f2f5f8;
  --color-text-muted: #8b96a3;
  --color-accent: #38bdf8;
  --color-accent-light: #7dd3fc;
  --color-accent-dark: #0284c7;
  --color-border: rgba(255, 255, 255, 0.08);

  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;

  --radius: 8px;
  --spacing-section: clamp(4rem, 8vw, 8rem);
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  line-height: 1.2;
  margin: 0 0 1rem;
}

p {
  margin: 0 0 1rem;
  color: var(--color-text-muted);
}

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding-block: var(--spacing-section);
  position: relative;
}

.section__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: var(--color-text);
  margin-bottom: 2.5rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Create `assets/js/script.js`**

```js
gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// NEXT_FUNCTION

document.addEventListener('DOMContentLoaded', () => {
  // NEXT_INIT_CALL
});
```

- [ ] **Step 4: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://SEU-DOMINIO-AQUI/sitemap.xml
```

- [ ] **Step 5: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://SEU-DOMINIO-AQUI/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 6: Verify manually**

Open the project folder in VS Code, right-click `index.html` → "Open with Live Server". Expected:
- Page loads at `http://127.0.0.1:5500` with a near-black background and no visible content yet besides the header logo "João Cantel".
- Open DevTools console: no red errors. Typing `gsap`, `ScrollTrigger`, `Lenis`, `Splitting` each return a defined object/function (not `undefined`).
- View page source: confirm `<title>`, meta description, and og: tags are present.

- [ ] **Step 7: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js robots.txt sitemap.xml
git commit -m "Scaffold portfolio site structure, base styles and SEO base files"
```

---

## Task 2: Ambient background glow effect

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `--color-accent`, `--color-accent-light`, `--color-accent-dark` (Task 1); `prefersReducedMotion()` (Task 1); markers `/* NEXT_SECTION_STYLES */`, `// NEXT_FUNCTION`, `  // NEXT_INIT_CALL` (Task 1).
- Produces: JS function `initAmbientBackground()`; CSS classes `.ambient-bg`, `.ambient-blob`, `.ambient-blob--1/2/3`.

- [ ] **Step 1: Insert the ambient background markup in `index.html`**

Old:
```html
<body>
  <header class="site-header" id="header">
```

New:
```html
<body>
  <div class="ambient-bg" aria-hidden="true">
    <div class="ambient-blob ambient-blob--1"></div>
    <div class="ambient-blob ambient-blob--2"></div>
    <div class="ambient-blob ambient-blob--3"></div>
  </div>

  <header class="site-header" id="header">
```

- [ ] **Step 2: Add ambient background CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.ambient-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;
}

.ambient-blob--1 {
  width: 480px;
  height: 480px;
  top: -12%;
  left: -10%;
  opacity: 0.35;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
}

.ambient-blob--2 {
  width: 560px;
  height: 560px;
  bottom: -18%;
  right: -12%;
  opacity: 0.3;
  background: radial-gradient(circle, var(--color-accent-dark) 0%, transparent 70%);
}

.ambient-blob--3 {
  width: 380px;
  height: 380px;
  top: 42%;
  left: 55%;
  opacity: 0.22;
  background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Add `initAmbientBackground()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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
```

- [ ] **Step 4: Call `initAmbientBackground()` on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initAmbientBackground();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload the Live Server tab. Expected:
- Three large, soft, blurred blue-toned glows are visible over the black background (top-left, bottom-right, center-right), slowly drifting back and forth.
- No layout shift or horizontal scrollbar appears.
- In DevTools, toggle "Emulate CSS prefers-reduced-motion: reduce" (Rendering tab) and reload — the blobs should remain static (no drifting).

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "Add animated ambient glow background"
```

---

## Task 3: Header and mobile navigation

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `.container` (Task 1); markers (Task 1).
- Produces: JS function `initNav()`; element ids `#navToggle`, `#siteNav`; CSS classes `.site-header`, `.site-header__toggle`, `.site-nav`, `.is-open`.

- [ ] **Step 1: Expand the header markup in `index.html`**

Old:
```html
  <header class="site-header" id="header">
    <div class="container site-header__inner">
      <a href="#hero" class="site-header__logo">João Cantel</a>
    </div>
  </header>
```

New:
```html
  <header class="site-header" id="header">
    <div class="container site-header__inner">
      <a href="#hero" class="site-header__logo">João Cantel</a>
      <button class="site-header__toggle" id="navToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="siteNav">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav" id="siteNav">
        <ul>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#especialidades">Especialidades</a></li>
          <li><a href="#processo">Processo</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#contato" class="site-nav__cta">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>
```

- [ ] **Step 2: Add header/nav CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(5, 7, 10, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.1rem;
}

.site-header__logo {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-text);
}

.site-header__toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 20;
}

.site-header__toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.site-header__toggle.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.site-header__toggle.is-open span:nth-child(2) {
  opacity: 0;
}

.site-header__toggle.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.site-nav ul {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.site-nav a {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.site-nav a:hover {
  color: var(--color-accent);
}

.site-nav__cta {
  color: var(--color-accent) !important;
  font-weight: 600;
}

@media (max-width: 767px) {
  .site-nav {
    position: fixed;
    inset: 0 0 0 auto;
    width: min(280px, 80vw);
    z-index: 15;
    background-color: var(--color-bg-alt);
    border-left: 1px solid var(--color-border);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .site-nav.is-open {
    transform: translateX(0);
  }

  .site-nav ul {
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem;
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .site-header__toggle {
    display: none;
  }
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Add `initNav()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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
```

- [ ] **Step 4: Call `initNav()` on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initNav();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload Live Server. In DevTools responsive mode set width to 375px. Expected:
- A 3-line hamburger icon appears on the right of the header; the nav links are hidden off-screen.
- Clicking the hamburger slides the nav panel in from the right and morphs the icon into an X; clicking again (or clicking a nav link) closes it.
- At 1024px+ width, the hamburger is hidden and the nav links show inline in the header.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "Add sticky header with responsive navigation"
```

---

## Task 4: Smooth scroll (Lenis) and scroll-reveal utility

**Files:**
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `Lenis`, `gsap`, `ScrollTrigger` globals (Task 1 CDN scripts); `prefersReducedMotion()` (Task 1); markers (Task 1).
- Produces: JS functions `initLenis()`, `initReveal()`; CSS class `.reveal` is the contract every later content task uses to opt an element into scroll-reveal (no new JS call needed per section — `initReveal()` scans all `.reveal` elements present in the DOM once, at load).

- [ ] **Step 1: Add Lenis recommended CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 2: Add `initLenis()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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
  return lenis;
}

// NEXT_FUNCTION
```

- [ ] **Step 3: Add `initReveal()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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

// NEXT_FUNCTION
```

- [ ] **Step 4: Call both functions on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initLenis();
  initReveal();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload Live Server. Expected:
- Scrolling the page (mouse wheel) feels smoothed/eased rather than jumping instantly (compare by momentarily commenting out the `<script src=".../lenis.min.js">` tag and reloading — the difference should be noticeable).
- No console errors about `Lenis` or `ScrollTrigger` being undefined.
- With DevTools "prefers-reduced-motion: reduce" emulation on, scrolling is instant (no smoothing) — confirms the guard works.

- [ ] **Step 6: Commit**

```bash
git add assets/css/style.css assets/js/script.js
git commit -m "Add Lenis smooth scroll and generic scroll-reveal utility"
```

---

## Task 5: Hero section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `.container`, `.section` (Task 1); `Splitting` global (Task 1 CDN); `prefersReducedMotion()` (Task 1); markers (Task 1).
- Produces: JS function `initHero()`; CSS classes `.hero`, `.hero__title`, `.hero__subtitle`, `.hero__actions`, `.btn`, `.btn--primary`, `.btn--secondary` (the `.btn` classes are reused by the Contato task later).

- [ ] **Step 1: Insert the hero section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="hero" id="hero">
      <div class="container hero__inner">
        <h1 class="hero__title" data-splitting>Sites profissionais desenvolvidos com design, código e inteligência artificial</h1>
        <p class="hero__subtitle">Desenvolvo sites institucionais e landing pages modernas, responsivas e alinhadas aos objetivos de empresas e prestadores de serviços.</p>
        <div class="hero__actions">
          <a href="#projetos" class="btn btn--primary">Conheça meus projetos</a>
          <a href="#contato" class="btn btn--secondary">Solicite um orçamento</a>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add hero and button CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-block: var(--spacing-section);
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.75rem);
  max-width: 18ch;
  color: var(--color-text);
}

.hero__title .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.4em);
}

.hero__subtitle {
  max-width: 46ch;
  font-size: 1.125rem;
  opacity: 0;
  transform: translateY(16px);
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(16px);
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius);
  font-weight: 600;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-2px);
}

.btn--secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn--secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Add `initHero()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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

// NEXT_FUNCTION
```

- [ ] **Step 4: Call `initHero()` on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initHero();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload Live Server. Expected:
- The hero title animates in letter by letter, followed by the subtitle and the two buttons fading/sliding up.
- Clicking "Solicite um orçamento" jumps to the bottom of the page (the `#contato` section doesn't exist yet, so the browser just scrolls to the end of `<main>` — this is expected at this point in the build and will resolve once Task 14 adds `#contato`).
- With reduced-motion emulation on, all hero text/buttons are immediately visible with no animation.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "Add hero section with Splitting.js letter reveal"
```

---

## Task 6: Sobre mim section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); marker `    <!-- NEXT_SECTION -->` (Task 1, still present after Task 5 re-emits it).
- Produces: CSS class `.sobre__content`.

- [ ] **Step 1: Insert the "Sobre mim" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section sobre" id="sobre">
      <div class="container">
        <h2 class="section__title reveal">Sobre mim</h2>
        <div class="sobre__content">
          <p class="reveal">Sou João Augusto Cantel, web designer e desenvolvedor web com formação em Programação Full Stack em Java. Trabalho com WordPress, Elementor, HTML, CSS, JavaScript e ferramentas de desenvolvimento assistido por inteligência artificial, como Claude Code e OpenAI Codex.</p>
          <p class="reveal">Desenvolvo sites institucionais, landing pages e soluções digitais para empresas de diferentes segmentos, participando desde o planejamento e a organização do conteúdo até o desenvolvimento, responsividade, publicação e manutenção.</p>
          <p class="reveal">Meu objetivo é unir design, programação, inteligência artificial e estratégia para criar sites profissionais que transmitam confiança, apresentem serviços com clareza e ajudem empresas a fortalecer sua presença digital.</p>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Sobre mim" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.sobre__content {
  max-width: 70ch;
}

.sobre__content p {
  font-size: 1.05rem;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload Live Server and scroll to the "Sobre mim" section. Expected:
- The heading and each paragraph fade/slide up individually as they cross into the viewport (staggered by scroll position, not simultaneously).
- Clicking "Sobre" in the nav (desktop or mobile) scrolls smoothly to this section.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Sobre mim section"
```

---

## Task 7: Especialidades section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); marker (Task 1).
- Produces: CSS classes `.card-grid`, `.card`, `.card__icon` (the `.card` pattern is specific to this section; the Projetos section in Task 12 uses its own `.project-card` class, not this one).

- [ ] **Step 1: Insert the "Especialidades" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section especialidades" id="especialidades">
      <div class="container">
        <h2 class="section__title reveal">Especialidades</h2>
        <div class="card-grid">
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Criação de sites institucionais</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Desenvolvimento de landing pages</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Desenvolvimento com WordPress e Elementor</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Desenvolvimento front-end com HTML, CSS e JavaScript</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Criação de layouts responsivos</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Reformulação e modernização de sites</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Estruturação de páginas e conteúdo</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Integração com WhatsApp</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Configuração de formulários</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Publicação e configuração de sites em hospedagens</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Configuração de domínio e DNS</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>SEO básico, SEO on-page e SEO local</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Produção de imagens e elementos visuais com inteligência artificial</p>
          </div>
          <div class="card reveal">
            <svg class="card__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>Desenvolvimento assistido por Claude Code e Codex</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Especialidades" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.card {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.card__icon {
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.card p {
  margin: 0;
  color: var(--color-text);
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload and scroll to "Especialidades". Expected:
- 14 cards render in a responsive grid (multiple columns on desktop, 1 column under ~500px width), each with a checkmark icon and one specialty.
- Cards fade/slide in on scroll, same as previous sections.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Especialidades section"
```

---

## Task 8: Tecnologias e ferramentas section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); marker (Task 1).
- Produces: CSS classes `.tool-grid`, `.tool-group`, `.tag-list`, `.tag` (`.tag-list`/`.tag` are reused as-is by Segmentos, Formação, and Projetos tasks later — no redefinition needed there).

- [ ] **Step 1: Insert the "Tecnologias e ferramentas" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section ferramentas" id="ferramentas">
      <div class="container">
        <h2 class="section__title reveal">Tecnologias e ferramentas</h2>
        <div class="tool-grid">
          <div class="tool-group reveal">
            <h3>Desenvolvimento</h3>
            <ul class="tag-list">
              <li class="tag">WordPress</li>
              <li class="tag">Elementor</li>
              <li class="tag">HTML</li>
              <li class="tag">CSS</li>
              <li class="tag">JavaScript</li>
              <li class="tag">Java</li>
              <li class="tag">Git</li>
              <li class="tag">GitHub</li>
              <li class="tag">VS Code</li>
              <li class="tag">Antigravity</li>
            </ul>
          </div>
          <div class="tool-group reveal">
            <h3>Inteligência artificial</h3>
            <ul class="tag-list">
              <li class="tag">Claude Code</li>
              <li class="tag">OpenAI Codex</li>
              <li class="tag">Criação e refinamento de prompts</li>
              <li class="tag">Análise e geração de código</li>
              <li class="tag">Estruturação de projetos</li>
              <li class="tag">Identificação e correção de problemas</li>
              <li class="tag">Produção de imagens com IA</li>
              <li class="tag">Criação de banners e ativos visuais</li>
            </ul>
          </div>
          <div class="tool-group reveal">
            <h3>Publicação e infraestrutura</h3>
            <ul class="tag-list">
              <li class="tag">Hospedagem de sites</li>
              <li class="tag">Configuração de domínio</li>
              <li class="tag">DNS</li>
              <li class="tag">Publicação em public_html</li>
              <li class="tag">Migração de sites</li>
              <li class="tag">Formulários</li>
              <li class="tag">SMTP e serviços de e-mail</li>
              <li class="tag">TurboCloud</li>
              <li class="tag">Locaweb</li>
            </ul>
          </div>
          <div class="tool-group reveal">
            <h3>Conteúdo e otimização</h3>
            <ul class="tag-list">
              <li class="tag">Estruturação de títulos H1, H2 e H3</li>
              <li class="tag">Organização de páginas de serviços</li>
              <li class="tag">Criação de CTAs</li>
              <li class="tag">Textos alternativos para imagens</li>
              <li class="tag">SEO local</li>
              <li class="tag">Integração com WhatsApp</li>
              <li class="tag">Yoast SEO</li>
              <li class="tag">Organização de conteúdo para negócios locais</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Tecnologias e ferramentas" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.tool-group h3 {
  font-size: 1.1rem;
  color: var(--color-accent-light);
  margin-bottom: 1rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload and scroll to "Tecnologias e ferramentas". Expected:
- 4 columns (collapsing to fewer on narrow viewports) each with a heading and a wrapped row of pill-shaped tags.
- No tag text overflows its pill (long tags like "Estruturação de títulos H1, H2 e H3" should wrap the pill wider, not clip).

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Tecnologias e ferramentas section"
```

---

## Task 9: Diferencial profissional section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); marker (Task 1).
- Produces: CSS classes `.diferencial__quote`, `.diferencial__content`, `.diferencial__steps`.

- [ ] **Step 1: Insert the "Diferencial profissional" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section diferencial" id="diferencial">
      <div class="container">
        <h2 class="section__title reveal">Diferencial profissional</h2>
        <blockquote class="diferencial__quote reveal">Uno design, desenvolvimento e inteligência artificial para criar sites profissionais, responsivos e alinhados aos objetivos de cada negócio.</blockquote>
        <div class="diferencial__content reveal">
          <p>Meu principal diferencial é unir visão visual, desenvolvimento técnico e ferramentas de inteligência artificial dentro do mesmo processo.</p>
          <p>Consigo partir de informações ainda desorganizadas, compreender o objetivo da empresa e transformá-las em uma estrutura digital clara e profissional.</p>
          <p>Durante o desenvolvimento, utilizo a inteligência artificial como uma ferramenta de apoio, mas mantenho a responsabilidade pela análise, organização, personalização, revisão e qualidade do projeto.</p>
          <p>Não trabalho apenas com a montagem visual das páginas. Também tenho contato com etapas como:</p>
          <ul class="diferencial__steps">
            <li>Levantamento de informações</li>
            <li>Planejamento da estrutura</li>
            <li>Organização do conteúdo</li>
            <li>Desenvolvimento</li>
            <li>Responsividade</li>
            <li>Testes</li>
            <li>Formulários</li>
            <li>Hospedagem</li>
            <li>Domínio</li>
            <li>Publicação</li>
            <li>Manutenção</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Diferencial profissional" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.diferencial__quote {
  margin: 0 0 2.5rem;
  padding: 1.5rem 2rem;
  border-left: 3px solid var(--color-accent);
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: var(--color-text);
  background-color: var(--color-bg-alt);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.diferencial__content {
  max-width: 70ch;
}

.diferencial__steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem 1.5rem;
}

.diferencial__steps li {
  position: relative;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
}

.diferencial__steps li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-accent);
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload and scroll to "Diferencial profissional". Expected:
- The quote renders as a highlighted blockquote with a left accent border and its own background tint, visually distinct from the body paragraphs below it.
- The 11-item step list renders as a multi-column grid of bullet points, not a single long vertical list, on desktop widths.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Diferencial profissional section"
```

---

## Task 10: Processo de desenvolvimento section (sequential timeline)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); `prefersReducedMotion()` (Task 1); markers (Task 1). Note: `.timeline__step` elements are intentionally NOT given the `.reveal` class — they use their own dedicated stagger animation instead of the generic one, so they must start at `opacity: 0` via CSS (not via inline JS like `.reveal` does).
- Produces: JS function `initProcessTimeline()`; CSS classes `.timeline`, `.timeline__step`, `.timeline__number`.

- [ ] **Step 1: Insert the "Processo de desenvolvimento" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section processo" id="processo">
      <div class="container">
        <h2 class="section__title reveal">Processo de desenvolvimento</h2>
        <ol class="timeline">
          <li class="timeline__step">
            <span class="timeline__number">01</span>
            <h3>Compreensão do negócio</h3>
            <p>Analiso a empresa, seus serviços, público, objetivos, diferenciais e região de atendimento.</p>
          </li>
          <li class="timeline__step">
            <span class="timeline__number">02</span>
            <h3>Planejamento</h3>
            <p>Defino as páginas, seções, hierarquia de informações, chamadas para ação e direção visual.</p>
          </li>
          <li class="timeline__step">
            <span class="timeline__number">03</span>
            <h3>Conteúdo</h3>
            <p>Organizo títulos, descrições, serviços, diferenciais, informações institucionais e estrutura básica de SEO.</p>
          </li>
          <li class="timeline__step">
            <span class="timeline__number">04</span>
            <h3>Desenvolvimento</h3>
            <p>Construo o projeto utilizando WordPress, Elementor ou código, dependendo das necessidades do site.</p>
          </li>
          <li class="timeline__step">
            <span class="timeline__number">05</span>
            <h3>Responsividade e revisão</h3>
            <p>Adapto o projeto para computadores, tablets e celulares, revisando textos, links, imagens, formulários, espaçamentos e navegação.</p>
          </li>
          <li class="timeline__step">
            <span class="timeline__number">06</span>
            <h3>Publicação</h3>
            <p>Realizo a configuração do domínio, hospedagem, DNS e publicação da versão final.</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Processo de desenvolvimento" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.timeline__step {
  opacity: 0;
  transform: translateY(24px);
}

.timeline__number {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.timeline__step h3 {
  color: var(--color-text);
  font-size: 1.15rem;
}

.timeline__step p {
  font-size: 0.95rem;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Add `initProcessTimeline()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
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

// NEXT_FUNCTION
```

- [ ] **Step 4: Call `initProcessTimeline()` on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initProcessTimeline();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload and scroll to "Processo de desenvolvimento". Expected:
- The 6 steps are invisible until the timeline grid crosses ~80% of the viewport, then reveal one after another (staggered ~0.15s apart), not all at once.
- With reduced-motion emulation on, all 6 steps are visible immediately with no animation delay.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "Add Processo de desenvolvimento section with staggered timeline reveal"
```

---

## Task 11: Segmentos de experiência section

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal`, `.tag-list`, `.tag` (Tasks 1, 4, 8 — no new CSS needed, this section reuses the tag styling as-is); marker (Task 1).
- Produces: nothing new (pure content section).

- [ ] **Step 1: Insert the "Segmentos de experiência" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section segmentos" id="segmentos">
      <div class="container">
        <h2 class="section__title reveal">Segmentos de experiência</h2>
        <ul class="tag-list reveal">
          <li class="tag">Oficinas e auto centers</li>
          <li class="tag">Serviços automotivos</li>
          <li class="tag">Clínicas veterinárias</li>
          <li class="tag">Residenciais para idosos</li>
          <li class="tag">Empresas de cuidado continuado</li>
          <li class="tag">Marmorarias</li>
          <li class="tag">Empresas de mármores e granitos</li>
          <li class="tag">Empresas de toldos e coberturas</li>
          <li class="tag">Corte e dobra de metais</li>
          <li class="tag">Empresas industriais</li>
          <li class="tag">Prestadores de serviços</li>
          <li class="tag">Negócios locais</li>
          <li class="tag">Agências de marketing</li>
        </ul>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Verify manually**

Reload and scroll to "Segmentos de experiência". Expected:
- 13 tags render wrapped as pills, identical styling to the "Tecnologias e ferramentas" tags.
- The whole tag list fades/slides in together as one `.reveal` unit (not staggered per tag — that's expected, only the Processo section has per-item stagger).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Segmentos de experiência section"
```

---

## Task 12: Projetos section (placeholder cards)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal`, `.tag-list`, `.tag` (Tasks 1, 4, 8); marker (Task 1).
- Produces: CSS classes `.project-grid`, `.project-card`, `.project-card__thumb`.

- [ ] **Step 1: Insert the "Projetos" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section projetos" id="projetos">
      <div class="container">
        <h2 class="section__title reveal">Projetos</h2>
        <div class="project-grid">
          <!-- TODO: substituir por projeto real -->
          <article class="project-card reveal">
            <div class="project-card__thumb" aria-hidden="true">JC</div>
            <h3>Projeto Exemplo 1</h3>
            <p>Site institucional desenvolvido com HTML, CSS e JavaScript.</p>
            <ul class="tag-list">
              <li class="tag">HTML</li>
              <li class="tag">CSS</li>
              <li class="tag">JavaScript</li>
            </ul>
          </article>
          <!-- TODO: substituir por projeto real -->
          <article class="project-card reveal">
            <div class="project-card__thumb" aria-hidden="true">JC</div>
            <h3>Projeto Exemplo 2</h3>
            <p>Landing page desenvolvida com WordPress e Elementor.</p>
            <ul class="tag-list">
              <li class="tag">WordPress</li>
              <li class="tag">Elementor</li>
            </ul>
          </article>
          <!-- TODO: substituir por projeto real -->
          <article class="project-card reveal">
            <div class="project-card__thumb" aria-hidden="true">JC</div>
            <h3>Projeto Exemplo 3</h3>
            <p>Site institucional modernizado com animações e efeitos.</p>
            <ul class="tag-list">
              <li class="tag">GSAP</li>
              <li class="tag">JavaScript</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Projetos" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.project-card__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  border-radius: var(--radius);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-accent-dark), var(--color-accent));
  color: var(--color-bg);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
}

.project-card h3 {
  font-size: 1.15rem;
  color: var(--color-text);
}

.project-card p {
  font-size: 0.95rem;
}

.project-card .tag-list {
  margin-top: 0.75rem;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload and scroll to "Projetos". Expected:
- 3 cards render with a gradient placeholder thumbnail (showing "JC"), a fictional project name, a one-line description, and tech tags.
- Viewing page source shows the `<!-- TODO: substituir por projeto real -->` comment directly above each `<article>` — confirms these are clearly marked as placeholders for later replacement.
- Clicking "Conheça meus projetos" in the hero (Task 5) now correctly scrolls down to this section, since `#projetos` exists.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Projetos section with placeholder cards"
```

---

## Task 13: Formação section

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal`, `.tag-list`, `.tag` (Tasks 1, 4, 8); marker (Task 1).
- Produces: nothing new (pure content section).

- [ ] **Step 1: Insert the "Formação" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section formacao" id="formacao">
      <div class="container">
        <h2 class="section__title reveal">Formação</h2>
        <p class="reveal">Minha principal formação é o curso de <strong>Programador Full Stack em Java</strong>. Durante minha formação e projetos de aprendizagem, tive contato com:</p>
        <ul class="tag-list reveal">
          <li class="tag">Lógica de programação</li>
          <li class="tag">Java</li>
          <li class="tag">Desenvolvimento front-end</li>
          <li class="tag">Desenvolvimento back-end</li>
          <li class="tag">HTML</li>
          <li class="tag">CSS</li>
          <li class="tag">JavaScript</li>
          <li class="tag">TypeScript</li>
          <li class="tag">Angular</li>
          <li class="tag">Ionic</li>
          <li class="tag">Node.js</li>
          <li class="tag">Bancos de dados</li>
          <li class="tag">Criação e consumo de APIs</li>
          <li class="tag">Git e GitHub</li>
        </ul>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Verify manually**

Reload and scroll to "Formação". Expected:
- Intro paragraph with "Programador Full Stack em Java" in bold, followed by 14 tag pills reusing the same styling as other tag lists.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Formação section"
```

---

## Task 14: Contato section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section__title`, `.reveal` (Tasks 1, 4); marker (Task 1).
- Produces: CSS classes `.contact-links`, `.contact-link`, `.contact-link__icon` (reused as-is by the Footer in Task 15).

- [ ] **Step 1: Insert the "Contato" section markup**

Old:
```html
    <!-- NEXT_SECTION -->
```

New:
```html
    <section class="section contato" id="contato">
      <div class="container">
        <h2 class="section__title reveal">Vamos conversar sobre o seu projeto?</h2>
        <p class="reveal">Entre em contato pelos canais abaixo e me conte o que você precisa.</p>
        <div class="contact-links reveal">
          <a class="contact-link" href="mailto:joao@indexa.co">
            <span class="contact-link__icon" aria-hidden="true">@</span>
            <span>E-mail</span>
          </a>
          <!-- TODO: adicionar link do WhatsApp -->
          <a class="contact-link" href="#">
            <span class="contact-link__icon" aria-hidden="true">W</span>
            <span>WhatsApp</span>
          </a>
          <!-- TODO: adicionar link do GitHub -->
          <a class="contact-link" href="#">
            <span class="contact-link__icon" aria-hidden="true">GH</span>
            <span>GitHub</span>
          </a>
          <!-- TODO: adicionar link do LinkedIn -->
          <a class="contact-link" href="#">
            <span class="contact-link__icon" aria-hidden="true">in</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>

    <!-- NEXT_SECTION -->
```

- [ ] **Step 2: Add "Contato" CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.contact-link:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.contact-link__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-size: 0.8rem;
  font-weight: 700;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Verify manually**

Reload and scroll to "Contato". Expected:
- 4 pill buttons (E-mail, WhatsApp, GitHub, LinkedIn) each with a small round icon badge and label.
- Clicking "E-mail" opens the system's default mail client addressed to `joao@indexa.co`. The other three currently do nothing (`href="#"`) — expected, since real links are explicitly out of scope per the spec.
- Clicking "Contato" in the header nav scrolls smoothly to this section.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add Contato section with direct contact links"
```

---

## Task 15: Footer

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `assets/js/script.js`

**Interfaces:**
- Consumes: `.container`, `.contact-links`, `.contact-link`, `.contact-link__icon` (Tasks 1, 14).
- Produces: JS function `initFooterYear()`; element id `#footerYear`; CSS classes `.site-footer`, `.site-footer__inner`, `.site-footer__bio`, `.site-footer__copyright`.

- [ ] **Step 1: Fill in the footer markup**

Old:
```html
  <footer class="site-footer">
  </footer>
```

New:
```html
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__bio">Web designer e desenvolvedor web com formação Full Stack em Java. Desenvolvo sites institucionais e landing pages utilizando WordPress, Elementor, HTML, CSS, JavaScript, Claude Code e Codex.</p>
      <div class="contact-links">
        <a class="contact-link" href="mailto:joao@indexa.co">
          <span class="contact-link__icon" aria-hidden="true">@</span>
          <span>E-mail</span>
        </a>
        <!-- TODO: adicionar link do WhatsApp -->
        <a class="contact-link" href="#">
          <span class="contact-link__icon" aria-hidden="true">W</span>
          <span>WhatsApp</span>
        </a>
        <!-- TODO: adicionar link do GitHub -->
        <a class="contact-link" href="#">
          <span class="contact-link__icon" aria-hidden="true">GH</span>
          <span>GitHub</span>
        </a>
        <!-- TODO: adicionar link do LinkedIn -->
        <a class="contact-link" href="#">
          <span class="contact-link__icon" aria-hidden="true">in</span>
          <span>LinkedIn</span>
        </a>
      </div>
      <p class="site-footer__copyright">© <span id="footerYear"></span> João Augusto Cantel</p>
    </div>
  </footer>
```

- [ ] **Step 2: Add footer CSS**

Old:
```css
/* NEXT_SECTION_STYLES */
```

New:
```css
.site-footer {
  border-top: 1px solid var(--color-border);
  padding-block: 3rem;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}

.site-footer__bio {
  max-width: 60ch;
}

.site-footer__copyright {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0;
}

/* NEXT_SECTION_STYLES */
```

- [ ] **Step 3: Add `initFooterYear()` in `script.js`**

Old:
```js
// NEXT_FUNCTION
```

New:
```js
function initFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// NEXT_FUNCTION
```

- [ ] **Step 4: Call `initFooterYear()` on load**

Old:
```js
  // NEXT_INIT_CALL
```

New:
```js
  initFooterYear();
  // NEXT_INIT_CALL
```

- [ ] **Step 5: Verify manually**

Reload and scroll to the bottom of the page. Expected:
- Footer shows the short bio, the same 4 contact links as the Contato section, and "© 2026 João Augusto Cantel" (year must match the current system year, not a hardcoded one — confirm by checking `document.getElementById('footerYear').textContent` in the console).

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "Add footer with bio, contact links and dynamic copyright year"
```

---

## Task 16: SEO schema, accessibility pass, and full verification

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: entire page (all previous tasks).
- Produces: JSON-LD `Person` schema in `<head>`.

- [ ] **Step 1: Add Person schema markup**

Old:
```html
  <link rel="stylesheet" href="assets/css/style.css">
</head>
```

New:
```html
  <link rel="stylesheet" href="assets/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "João Augusto Cantel",
    "jobTitle": "Web Designer e Desenvolvedor Web",
    "url": "https://SEU-DOMINIO-AQUI/",
    "sameAs": [
      "https://github.com/SEU-USUARIO",
      "https://www.linkedin.com/in/SEU-USUARIO"
    ]
  }
  </script>
</head>
```

- [ ] **Step 2: Verify heading hierarchy and alt text**

In DevTools, run the Elements panel search for `h1` — confirm there is exactly **one** `<h1>` on the page (the hero title). Confirm every `<section>` has exactly one `<h2>` as its heading (Sobre, Especialidades, Tecnologias e ferramentas, Diferencial profissional, Processo de desenvolvimento, Segmentos de experiência, Projetos, Formação, Contato). Confirm there are no `<img>` tags without an `alt` attribute (this page currently uses no `<img>` tags — thumbnails are CSS gradients and SVG icons marked `aria-hidden`, so there is nothing to fix, just confirm this is still true).

- [ ] **Step 3: Full responsive and cross-browser pass**

In DevTools responsive mode, check the page at 320px, 768px, 1024px, and 1440px widths. At each width confirm: no horizontal scrollbar, nav toggle behaves correctly for its breakpoint, all grids reflow to a sensible column count, text doesn't overflow its container. Repeat a quick visual pass in both Chrome and Firefox (or Edge, per the project's usual checklist).

- [ ] **Step 4: Reduced-motion pass**

With DevTools "Emulate CSS prefers-reduced-motion: reduce" enabled, reload the full page top to bottom. Confirm: ambient background blobs are static, hero text appears immediately without letter-by-letter animation, all `.reveal` sections and the process timeline appear immediately without fade/stagger, scrolling has no smoothing applied.

- [ ] **Step 5: Run Lighthouse**

In Chrome DevTools, open the Lighthouse panel, select Performance + Accessibility + SEO + Best Practices, run against the Live Server URL in an Incognito window. Target: Performance ≥ 85 (per the spec's Modo Moderno requirement), Accessibility/SEO/Best Practices as high as reasonably achievable. Note any flagged issues; fix any that are quick wins (e.g., missing `lang`, contrast — both should already be covered by this plan, but confirm).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Add Person schema and complete final accessibility/SEO verification pass"
```

---

## Post-plan notes (not implemented here, per spec's "Fora de escopo")

- Real project cards, WhatsApp/GitHub/LinkedIn links, and the final domain (`SEU-DOMINIO-AQUI`, `SEU-USUARIO`) are placeholders by design — replace them when the real values are available.
- Final visual identity (exact colors/fonts) is provisional — swap the `:root` values in `assets/css/style.css` once decided; every other rule references these variables, so no other file needs to change.
- Favicon files are not included — the spec deferred final branding, and favicons should match whatever identity is chosen later.
- Deployment to TurboCloud follows the existing manual cPanel flow documented in the project's standard process; not part of this plan.
