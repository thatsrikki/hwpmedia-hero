@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Manrope', 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #f7f7f5;
  background: #070707;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --black: #070707;
  --panel: #0b0b0b;
  --white: #f7f7f5;
  --muted: #9a9a96;
  --line: rgba(255, 255, 255, 0.11);
  --red: #dc2528;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--black);
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.07), transparent 36%),
    linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-shell {
  position: relative;
  min-height: 100svh;
  isolation: isolate;
  overflow: hidden;
}

.site-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -4;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.ambient-glow {
  position: absolute;
  z-index: -3;
  pointer-events: none;
  border-radius: 999px;
  filter: blur(90px);
  opacity: 0.28;
}

.ambient-glow--red {
  width: 34rem;
  height: 24rem;
  top: 12%;
  left: -15rem;
  background: rgba(220, 37, 40, 0.34);
}

.ambient-glow--white {
  width: 36rem;
  height: 20rem;
  top: -12rem;
  right: -10rem;
  background: rgba(255, 255, 255, 0.11);
}

.noise {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.site-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
  padding-top: 28px;
}

.brand-mark,
.header-tag {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 20px rgba(220, 37, 40, 0.8);
}

.header-tag {
  color: #767672;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  grid-template-rows: 1fr auto;
  align-items: center;
  min-height: 100svh;
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
  padding: 112px 0 30px;
}

.hero-visual {
  position: relative;
  width: 100%;
  height: min(68vh, 740px);
  min-height: 440px;
  opacity: 0;
  transform: scale(0.985);
  animation: canvas-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
}

.hero-visual::before {
  content: '';
  position: absolute;
  left: 10%;
  right: 12%;
  bottom: 12%;
  height: 12%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(220, 37, 40, 0.16), transparent 68%);
  filter: blur(22px);
  transform: perspective(600px) rotateX(72deg);
  pointer-events: none;
}

.hero-canvas {
  width: 100% !important;
  height: 100% !important;
  cursor: crosshair;
}

.canvas-loader {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
}

.canvas-loader span {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 680px;
  padding-left: clamp(12px, 4vw, 72px);
  opacity: 0;
  transform: translateY(24px);
  animation: copy-in 0.95s cubic-bezier(0.22, 1, 0.36, 1) 2s forwards;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 22px;
  color: #a4a49f;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.eyebrow span {
  width: 34px;
  height: 1px;
  background: var(--red);
  box-shadow: 0 0 14px rgba(220, 37, 40, 0.7);
}

h1 {
  max-width: 780px;
  margin: 0;
  font-size: clamp(3.2rem, 6.4vw, 7rem);
  line-height: 0.92;
  letter-spacing: -0.064em;
  font-weight: 600;
  text-wrap: balance;
}

.hero-subheadline {
  max-width: 610px;
  margin: 28px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.45vw, 1.18rem);
  line-height: 1.72;
  letter-spacing: -0.015em;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 36px;
}

.primary-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
  min-height: 54px;
  padding: 0 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: var(--red);
  box-shadow:
    0 16px 45px rgba(220, 37, 40, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  color: white;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    background 240ms ease;
}

.primary-cta::before {
  content: '';
  position: absolute;
  top: -80%;
  left: -35%;
  width: 35%;
  height: 260%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(22deg);
  transition: left 460ms ease;
}

.primary-cta:hover {
  transform: translateY(-2px);
  background: #ee2d31;
  box-shadow:
    0 20px 58px rgba(220, 37, 40, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.primary-cta:hover::before {
  left: 118%;
}

.primary-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 4px;
}

.availability {
  color: #747470;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
}

.hero-meta {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  color: #5f5f5b;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.hero-meta span:nth-child(2) {
  text-align: center;
}

.hero-meta span:last-child {
  text-align: right;
}

@keyframes canvas-in {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes copy-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    align-content: center;
    padding-top: 96px;
  }

  .hero-visual {
    height: min(49vh, 520px);
    min-height: 330px;
    order: 1;
  }

  .hero-copy {
    order: 2;
    max-width: 820px;
    margin: -18px auto 0;
    padding: 0;
    text-align: center;
  }

  .eyebrow,
  .hero-actions {
    justify-content: center;
  }

  .hero-subheadline {
    margin-inline: auto;
  }

  .hero-meta {
    order: 3;
    margin-top: 58px;
  }
}

@media (max-width: 640px) {
  .site-header,
  .hero {
    width: min(100% - 28px, 1400px);
  }

  .site-header {
    padding-top: 20px;
  }

  .header-tag {
    display: none;
  }

  .hero {
    padding: 76px 0 22px;
  }

  .hero-visual {
    height: 42vh;
    min-height: 300px;
  }

  .hero-copy {
    margin-top: -8px;
  }

  h1 {
    font-size: clamp(3rem, 15.5vw, 4.7rem);
  }

  .hero-subheadline {
    margin-top: 22px;
    font-size: 0.98rem;
    line-height: 1.62;
  }

  .hero-actions {
    flex-direction: column;
    gap: 14px;
    margin-top: 28px;
  }

  .primary-cta {
    width: 100%;
    max-width: 320px;
  }

  .hero-meta {
    grid-template-columns: 1fr 1fr;
    margin-top: 44px;
  }

  .hero-meta span:nth-child(2) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0ms !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
