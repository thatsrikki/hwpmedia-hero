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
  --pointer-x: 50vw;
  --pointer-y: 50vh;
  --grid-x: 0px;
  --grid-y: 0px;
  --experience-progress: 0;
  position: relative;
  min-height: 100svh;
  isolation: isolate;
  overflow: hidden;
}

.site-shell::before {
  content: '';
  position: fixed;
  inset: -24px;
  z-index: -5;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 64px 64px;
  transform: translate3d(var(--grid-x), var(--grid-y), 0);
  transition: transform 120ms linear;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
  -webkit-mask-image: linear-gradient(to bottom, black, transparent 88%);
}

.cursor-spotlight {
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background:
    radial-gradient(circle 260px at var(--pointer-x) var(--pointer-y), rgba(255, 255, 255, 0.075), transparent 70%),
    radial-gradient(circle 430px at var(--pointer-x) var(--pointer-y), rgba(220, 37, 40, 0.04), transparent 72%);
  opacity: 0.9;
}

.ambient-glow {
  position: fixed;
  z-index: -4;
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
  animation: ambient-drift 10s ease-in-out infinite alternate;
}

.ambient-glow--white {
  width: 36rem;
  height: 20rem;
  top: -12rem;
  right: -10rem;
  background: rgba(255, 255, 255, 0.11);
  animation: ambient-drift 13s ease-in-out infinite alternate-reverse;
}

.noise {
  position: fixed;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitchTiles'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
  padding-top: 28px;
  pointer-events: none;
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
  pointer-events: auto;
}

.brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 20px rgba(220, 37, 40, 0.8);
  animation: brand-pulse 2.4s ease-in-out infinite;
}

.header-tag {
  color: #767672;
}

.experience {
  position: relative;
  min-height: 200svh;
}

.scene-stage {
  position: sticky;
  top: 0;
  z-index: 1;
  width: min(53vw, 790px);
  height: 100svh;
  margin-left: max(0px, calc((100vw - 1400px) / 2));
  opacity: 0;
  transform: scale(0.985);
  animation: canvas-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
}

.scene-stage::after {
  content: '';
  position: absolute;
  left: 9%;
  right: 9%;
  bottom: 10.5%;
  height: 11%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(220, 37, 40, 0.15), transparent 68%);
  filter: blur(24px);
  transform: perspective(600px) rotateX(72deg);
  pointer-events: none;
  animation: floor-glow 4.5s ease-in-out infinite;
}

.logo-halo {
  position: absolute;
  inset: 19% 8%;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  background:
    radial-gradient(circle at 56% 46%, rgba(255, 255, 255, 0.075), transparent 35%),
    radial-gradient(circle at 37% 55%, rgba(220, 37, 40, 0.12), transparent 52%);
  filter: blur(30px);
  animation: halo-breathe 5s ease-in-out infinite;
}

.logo-scan {
  position: absolute;
  top: 16%;
  bottom: 16%;
  left: -28%;
  z-index: 4;
  width: 18%;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), rgba(255, 45, 51, 0.28), transparent);
  filter: blur(14px);
  mix-blend-mode: screen;
  transform: skewX(-12deg);
  animation: logo-scan 7s cubic-bezier(0.32, 0.72, 0, 1) 1.4s infinite;
}

.hero-canvas {
  position: relative;
  z-index: 2;
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

.experience-content {
  position: relative;
  z-index: 3;
  margin-top: -100svh;
  pointer-events: none;
}

.hero,
.services {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  align-items: center;
  min-height: 100svh;
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
}

.hero {
  grid-template-rows: 1fr auto;
  padding: 112px 0 30px;
}

.layout-spacer {
  grid-column: 1;
  pointer-events: none;
}

.hero-copy,
.services-copy {
  position: relative;
  z-index: 5;
  grid-column: 2;
  max-width: 680px;
  padding-left: clamp(12px, 4vw, 72px);
  pointer-events: auto;
}

.eyebrow,
.section-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a4a49f;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.eyebrow {
  margin: 0 0 22px;
  opacity: 0;
  transform: translateY(14px);
  animation: copy-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1.92s forwards;
}

.eyebrow > span,
.section-kicker > span {
  width: 34px;
  height: 1px;
  background: var(--red);
  box-shadow: 0 0 14px rgba(220, 37, 40, 0.7);
}

h1 {
  display: flex;
  flex-wrap: wrap;
  max-width: 780px;
  margin: 0;
  font-size: clamp(3.2rem, 6.4vw, 7rem);
  line-height: 0.92;
  letter-spacing: -0.064em;
  font-weight: 600;
  text-wrap: balance;
}

.headline-word {
  display: inline-block;
  margin-right: 0.2em;
  opacity: 0;
  filter: blur(14px);
  transform: translate3d(0, 62%, 0) rotateX(-14deg);
  transform-origin: 50% 100%;
  animation: word-in 0.92s cubic-bezier(0.16, 1, 0.3, 1) calc(2s + var(--word-index) * 95ms) forwards;
}

.headline-word:last-child {
  margin-right: 0;
}

.hero-subheadline {
  max-width: 610px;
  margin: 28px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.45vw, 1.18rem);
  line-height: 1.72;
  letter-spacing: -0.015em;
  opacity: 0;
  transform: translateY(18px);
  animation: copy-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) 2.48s forwards;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 36px;
  opacity: 0;
  transform: translateY(18px);
  animation: copy-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) 2.68s forwards;
}

.primary-cta {
  --magnetic-x: 0px;
  --magnetic-y: 0px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
  min-height: 54px;
  padding: 0 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: var(--red);
  box-shadow:
    0 16px 45px rgba(220, 37, 40, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  transform: translate3d(var(--magnetic-x), var(--magnetic-y), 0);
  transition:
    transform 160ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 240ms ease,
    background 240ms ease;
  animation: cta-pulse 3.8s ease-in-out 4.3s infinite;
  will-change: transform;
}

.primary-cta::before {
  content: '';
  position: absolute;
  top: -80%;
  left: -35%;
  width: 35%;
  height: 260%;
  background: rgba(255, 255, 255, 0.22);
  transform: rotate(22deg);
  transition: left 460ms ease;
}

.cta-label,
.cta-arrow {
  position: relative;
  z-index: 1;
}

.cta-arrow {
  transition: transform 220ms ease;
}

.primary-cta:hover {
  transform: translate3d(var(--magnetic-x), var(--magnetic-y), 0) scale(1.035);
  background: #ee2d31;
  box-shadow:
    0 22px 64px rgba(220, 37, 40, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.primary-cta:hover::before {
  left: 118%;
}

.primary-cta:hover .cta-arrow {
  transform: translate3d(3px, -3px, 0);
}

.primary-cta:focus-visible,
.services-link:focus-visible {
  outline: 2px solid white;
  outline-offset: 4px;
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #747470;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
}

.availability > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #64d98b;
  box-shadow: 0 0 12px rgba(100, 217, 139, 0.55);
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
  opacity: 0;
  animation: meta-in 0.8s ease 2.9s forwards;
}

.hero-meta span:nth-child(2) {
  text-align: center;
  animation: scroll-signal 1.8s ease-in-out infinite;
}

.hero-meta span:last-child {
  text-align: right;
}

.services {
  padding: 105px 0 70px;
}

.services::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 8%;
  right: -9vw;
  bottom: 6%;
  width: min(62vw, 940px);
  border: 1px solid rgba(255, 255, 255, 0.035);
  border-radius: 48px 0 0 48px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.025), transparent 45%),
    rgba(8, 8, 8, 0.66);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
  pointer-events: none;
}

.services-copy {
  align-self: center;
  max-width: 720px;
}

.section-kicker {
  margin: 0 0 20px;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 700ms ease, transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

.services h2 {
  max-width: 720px;
  margin: 0;
  font-size: clamp(2.7rem, 4.4vw, 5.35rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 600;
  text-wrap: balance;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(28px);
  transition:
    opacity 800ms ease 80ms,
    filter 850ms ease 80ms,
    transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 80ms;
}

.services-intro {
  max-width: 590px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(0.98rem, 1.35vw, 1.12rem);
  line-height: 1.7;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ease 180ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 180ms;
}

.service-list {
  display: grid;
  gap: 12px;
  margin-top: 34px;
}

.service-card {
  position: relative;
  overflow: hidden;
  padding: 20px 22px 22px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.035), transparent 45%),
    rgba(11, 11, 11, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
  opacity: 0;
  transform: translateY(28px) scale(0.985);
  transition:
    opacity 700ms ease calc(260ms + var(--card-index) * 100ms),
    transform 850ms cubic-bezier(0.16, 1, 0.3, 1) calc(260ms + var(--card-index) * 100ms),
    border-color 240ms ease,
    background 240ms ease,
    box-shadow 240ms ease;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, rgba(220, 37, 40, 0.9), transparent);
  opacity: 0.4;
  transform: scaleY(0.4);
  transition: opacity 240ms ease, transform 300ms ease;
}

.service-card:hover {
  transform: translateY(-4px) scale(1);
  border-color: rgba(255, 255, 255, 0.16);
  background:
    radial-gradient(circle at 82% 25%, rgba(220, 37, 40, 0.09), transparent 28%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.045), transparent 45%),
    rgba(12, 12, 12, 0.9);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

.service-card:hover::before {
  opacity: 1;
  transform: scaleY(1);
}

.service-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.service-number {
  color: var(--red);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.17em;
}

.service-signal {
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 12px;
}

.service-signal i {
  display: block;
  width: 2px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.34);
  animation: signal-bars 1.5s ease-in-out infinite;
}

.service-signal i:nth-child(1) {
  height: 5px;
}

.service-signal i:nth-child(2) {
  height: 11px;
  animation-delay: 130ms;
}

.service-signal i:nth-child(3) {
  height: 8px;
  animation-delay: 260ms;
}

.service-card h3 {
  margin: 16px 0 7px;
  font-size: clamp(1.15rem, 1.5vw, 1.38rem);
  letter-spacing: -0.025em;
  font-weight: 600;
}

.service-card p {
  max-width: 570px;
  margin: 0;
  color: #888884;
  font-size: 0.84rem;
  line-height: 1.58;
}

.services-link {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  margin-top: 26px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  opacity: 0;
  transform: translateY(15px);
  transition:
    opacity 700ms ease 620ms,
    transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 620ms,
    border-color 220ms ease,
    color 220ms ease;
}

.services-link span {
  transition: transform 220ms ease;
}

.services-link:hover {
  color: #ffffff;
  border-color: var(--red);
}

.services-link:hover span {
  transform: translate3d(3px, -3px, 0);
}

.services.is-visible .section-kicker,
.services.is-visible h2,
.services.is-visible .services-intro,
.services.is-visible .service-card,
.services.is-visible .services-link {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0) scale(1);
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

@keyframes word-in {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0) rotateX(0);
  }
}

@keyframes meta-in {
  to {
    opacity: 1;
  }
}

@keyframes logo-scan {
  0%, 8% {
    left: -28%;
    opacity: 0;
  }
  16% {
    opacity: 0.75;
  }
  43% {
    left: 110%;
    opacity: 0;
  }
  100% {
    left: 110%;
    opacity: 0;
  }
}

@keyframes halo-breathe {
  0%, 100% {
    opacity: 0.62;
    transform: scale(0.96);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes floor-glow {
  0%, 100% {
    opacity: 0.58;
    filter: blur(22px);
  }
  50% {
    opacity: 0.92;
    filter: blur(30px);
  }
}

@keyframes cta-pulse {
  0%, 82%, 100% {
    box-shadow:
      0 16px 45px rgba(220, 37, 40, 0.22),
      0 0 0 0 rgba(220, 37, 40, 0),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  90% {
    box-shadow:
      0 20px 58px rgba(220, 37, 40, 0.34),
      0 0 0 10px rgba(220, 37, 40, 0),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }
}

@keyframes brand-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 16px rgba(220, 37, 40, 0.58);
  }
  50% {
    transform: scale(1.22);
    box-shadow: 0 0 26px rgba(220, 37, 40, 0.9);
  }
}

@keyframes ambient-drift {
  to {
    transform: translate3d(4vw, 2vh, 0) scale(1.08);
  }
}

@keyframes scroll-signal {
  0%, 100% {
    opacity: 0.46;
  }
  50% {
    opacity: 1;
  }
}

@keyframes signal-bars {
  0%, 100% {
    opacity: 0.35;
    transform: scaleY(0.55);
  }
  50% {
    opacity: 0.95;
    transform: scaleY(1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .experience {
    min-height: 220svh;
  }

  .scene-stage {
    width: 100%;
    height: 52svh;
    margin-left: 0;
  }

  .scene-stage::after {
    left: 22%;
    right: 22%;
    bottom: 3%;
  }

  .experience-content {
    margin-top: -52svh;
  }

  .hero,
  .services {
    grid-template-columns: 1fr;
    width: min(100% - 40px, 820px);
  }

  .layout-spacer {
    display: none;
  }

  .hero {
    min-height: 108svh;
    padding: calc(52svh + 54px) 0 26px;
  }

  .hero-copy,
  .services-copy {
    grid-column: 1;
    max-width: 820px;
    margin-inline: auto;
    padding: 0;
    text-align: center;
  }

  .eyebrow,
  .section-kicker,
  .hero-actions,
  h1 {
    justify-content: center;
  }

  .hero-subheadline,
  .services-intro {
    margin-inline: auto;
  }

  .hero-meta {
    margin-top: 52px;
  }

  .services {
    min-height: 112svh;
    align-items: start;
    padding: 42svh 0 60px;
  }

  .services::before {
    top: 31svh;
    right: -10vw;
    bottom: 2%;
    width: 120vw;
    border-radius: 34px 0 0 34px;
  }

  .service-list {
    max-width: 680px;
    margin-inline: auto;
    margin-top: 32px;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .site-header,
  .hero,
  .services {
    width: min(100% - 28px, 1400px);
  }

  .site-header {
    padding-top: 20px;
  }

  .header-tag {
    display: none;
  }

  .experience {
    min-height: 232svh;
  }

  .scene-stage {
    height: 47svh;
  }

  .experience-content {
    margin-top: -47svh;
  }

  .hero {
    min-height: 106svh;
    padding: calc(47svh + 42px) 0 22px;
  }

  h1 {
    font-size: clamp(3rem, 15.5vw, 4.7rem);
  }

  .headline-word {
    margin-right: 0.16em;
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
    margin-top: 42px;
  }

  .hero-meta span:nth-child(2) {
    display: none;
  }

  .services {
    min-height: 126svh;
    padding: 35svh 0 54px;
  }

  .services::before {
    top: 28svh;
    border-radius: 28px 0 0 28px;
  }

  .services h2 {
    font-size: clamp(2.55rem, 13vw, 4.1rem);
  }

  .services-intro {
    margin-top: 20px;
    font-size: 0.96rem;
    line-height: 1.62;
  }

  .service-card {
    padding: 18px 18px 20px;
    border-radius: 17px;
  }

  .services-link {
    margin-top: 24px;
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

  .services .section-kicker,
  .services h2,
  .services .services-intro,
  .services .service-card,
  .services .services-link {
    opacity: 1;
    filter: none;
    transform: none;
  }
}
