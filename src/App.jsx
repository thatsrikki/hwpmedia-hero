import { useEffect, useRef } from 'react';
import HeroScene from './components/HeroScene.jsx';

// Replace this with your Calendly, Cal.com, HoneyBook, or contact-page URL.
const BOOKING_URL = 'https://cal.com/your-booking-link';
const HEADLINE_WORDS = ['Build', 'Brands', 'That', 'Move.'];

const SERVICES = [
  {
    number: '01',
    title: 'Web Experiences',
    description: 'Cinematic websites built to clarify your position, hold attention, and convert the right visitors.',
  },
  {
    number: '02',
    title: 'Content Engines',
    description: 'Repeatable media systems that turn your point of view into consistent, recognizable momentum.',
  },
  {
    number: '03',
    title: 'Lead Systems',
    description: 'Automation and conversion infrastructure that moves attention toward booked conversations.',
  },
];

const LIGHT_FG = [35, 31, 32];
const DARK_FG = [247, 244, 239];
const LIGHT_MUTED = [103, 96, 96];
const DARK_MUTED = [166, 161, 157];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value, edge0, edge1) {
  const normalized = clamp((value - edge0) / Math.max(edge1 - edge0, 0.0001), 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function mixRgb(from, to, amount) {
  const values = from.map((value, index) => Math.round(value + (to[index] - value) * amount));
  return `rgb(${values.join(' ')})`;
}

function mixRgbChannels(from, to, amount) {
  return from
    .map((value, index) => Math.round(value + (to[index] - value) * amount))
    .join(', ');
}

export default function App() {
  const shellRef = useRef(null);
  const experienceRef = useRef(null);
  const transitionRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    let animationFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const renderPointer = () => {
      const normalizedX = pointerX / Math.max(window.innerWidth, 1) - 0.5;
      const normalizedY = pointerY / Math.max(window.innerHeight, 1) - 0.5;

      shell.style.setProperty('--pointer-x', `${pointerX}px`);
      shell.style.setProperty('--pointer-y', `${pointerY}px`);
      shell.style.setProperty('--grid-x', `${normalizedX * -14}px`);
      shell.style.setProperty('--grid-y', `${normalizedY * -14}px`);
      animationFrame = 0;
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderPointer);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const experience = experienceRef.current;
    const transition = transitionRef.current;
    const services = servicesRef.current;
    if (!shell || !experience || !transition || !services) return undefined;

    let animationFrame = 0;

    const updateScrollProgress = () => {
      const rect = experience.getBoundingClientRect();
      const scrollRange = Math.max(experience.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollRange, 0, 1);
      const themeProgress = smoothstep(progress, 0.18, 0.74);
      const transitionIn = smoothstep(progress, 0.18, 0.37);
      const transitionOut = 1 - smoothstep(progress, 0.58, 0.8);
      const transitionOpacity = clamp(transitionIn * transitionOut, 0, 1);

      scrollProgressRef.current = progress;
      shell.style.setProperty('--experience-progress', progress.toFixed(4));
      shell.style.setProperty('--theme-progress', themeProgress.toFixed(4));
      shell.style.setProperty('--transition-opacity', transitionOpacity.toFixed(4));
      shell.style.setProperty('--transition-shift', `${Math.round((1 - transitionOpacity) * 36)}px`);
      shell.style.setProperty('--theme-fg', mixRgb(LIGHT_FG, DARK_FG, themeProgress));
      shell.style.setProperty('--theme-muted', mixRgb(LIGHT_MUTED, DARK_MUTED, themeProgress));
      shell.style.setProperty('--grid-rgb', mixRgbChannels(LIGHT_FG, DARK_FG, themeProgress));
      shell.dataset.theme = themeProgress > 0.56 ? 'dark' : 'light';

      transition.classList.toggle('is-visible', transitionOpacity > 0.05);
      services.classList.toggle('is-visible', progress > 0.66);
      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMagneticMove = (event) => {
    const button = ctaRef.current;
    if (!button || !window.matchMedia('(pointer: fine)').matches) return;

    const bounds = button.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    button.style.setProperty('--magnetic-x', `${offsetX * 0.15}px`);
    button.style.setProperty('--magnetic-y', `${offsetY * 0.18}px`);
  };

  const resetMagneticButton = () => {
    const button = ctaRef.current;
    if (!button) return;
    button.style.setProperty('--magnetic-x', '0px');
    button.style.setProperty('--magnetic-y', '0px');
  };

  return (
    <main ref={shellRef} className="site-shell" data-theme="light">
      <div className="theme-layer theme-layer--light" aria-hidden="true" />
      <div className="theme-layer theme-layer--dark" aria-hidden="true" />
      <div className="cursor-spotlight" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--red" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--warm" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="HWP Media home">
          <span className="brand-dot" aria-hidden="true" />
          HWP MEDIA
        </a>
        <span className="header-tag">MEDIA · WEB · AUTOMATION</span>
      </header>

      <div ref={experienceRef} className="experience">
        <div className="scene-stage" aria-label="Interactive three-dimensional HWP Media logo">
          <div className="scene-orbit" aria-hidden="true" />
          <div className="logo-halo" aria-hidden="true" />
          <div className="logo-scan" aria-hidden="true" />
          <HeroScene scrollProgressRef={scrollProgressRef} />
        </div>

        <div className="experience-content">
          <section id="top" className="hero" aria-labelledby="hero-title">
            <div className="layout-spacer" aria-hidden="true" />

            <div className="hero-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                AI-POWERED MEDIA &amp; GROWTH
              </p>

              <h1 id="hero-title" aria-label="Build Brands That Move.">
                {HEADLINE_WORDS.map((word, index) => (
                  <span
                    className="headline-word"
                    style={{ '--word-delay': `${index * 95}ms` }}
                    aria-hidden="true"
                    key={word}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p className="hero-subheadline">
                Strategy, media, and digital systems engineered to make your brand easier to notice—and harder to forget.
              </p>

              <div className="hero-actions">
                <a
                  ref={ctaRef}
                  className="primary-cta"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={resetMagneticButton}
                  onBlur={resetMagneticButton}
                >
                  <span className="cta-label">Book a Call</span>
                  <span className="cta-arrow" aria-hidden="true">↗</span>
                </a>

                <span className="availability">
                  <span aria-hidden="true" />
                  Now booking select projects
                </span>
              </div>
            </div>

            <div className="hero-meta" aria-hidden="true">
              <span>HWP / 003</span>
              <span>SCROLL INTO THE SYSTEM</span>
              <span>TAMPA BAY · FL</span>
            </div>
          </section>

          <section ref={transitionRef} className="transition-panel" aria-label="Brand transformation statement">
            <div className="layout-spacer" aria-hidden="true" />

            <div className="transition-copy">
              <p className="section-kicker">
                <span aria-hidden="true" />
                LIGHT / SHADOW / MOTION
              </p>
              <h2>A brand should feel different before it says a word.</h2>
              <p>
                We turn positioning into atmosphere—then connect that atmosphere to a system built for attention, trust, and action.
              </p>

              <div className="transition-metrics" aria-hidden="true">
                <span><strong>03</strong> connected systems</span>
                <span><strong>01</strong> recognizable brand</span>
                <span><strong>∞</strong> room to scale</span>
              </div>
            </div>
          </section>

          <section ref={servicesRef} id="services" className="services" aria-labelledby="services-title">
            <div className="layout-spacer" aria-hidden="true" />

            <div className="services-copy">
              <p className="section-kicker">
                <span aria-hidden="true" />
                THE BRAND ENGINE
              </p>

              <h2 id="services-title">From attention to action.</h2>
              <p className="services-intro">
                Three connected systems designed to make your brand sharper, more visible, and easier to choose.
              </p>

              <div className="service-list">
                {SERVICES.map((service, index) => (
                  <article
                    className="service-card"
                    style={{ '--card-delay': `${index * 100}ms` }}
                    key={service.number}
                  >
                    <div className="service-card__topline">
                      <span className="service-number">{service.number}</span>
                      <span className="service-signal" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>

              <a className="services-link" href={BOOKING_URL} target="_blank" rel="noreferrer">
                Build your brand system
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
