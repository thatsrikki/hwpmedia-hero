import { useEffect, useRef } from 'react';
import HeroScene from './components/HeroScene.jsx';

// Replace this with your Calendly, Cal.com, HoneyBook, or contact-page URL.
const BOOKING_URL = 'https://cal.com/your-booking-link';
const HEADLINE_WORDS = ['Websites', 'That', 'Build', 'Brands.'];

export default function App() {
  const shellRef = useRef(null);
  const ctaRef = useRef(null);

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
    <main ref={shellRef} className="site-shell">
      <div className="cursor-spotlight" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--red" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--white" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="HWP Media home">
          <span className="brand-dot" aria-hidden="true" />
          HWP MEDIA
        </a>
        <span className="header-tag">MEDIA · WEB · AUTOMATION</span>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-visual" aria-label="Animated three-dimensional HWP Media logo">
          <div className="logo-halo" aria-hidden="true" />
          <div className="logo-scan" aria-hidden="true" />
          <HeroScene />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" />
            AI-POWERED MEDIA &amp; GROWTH
          </p>

          <h1 id="hero-title" aria-label="Websites That Build Brands.">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                className="headline-word"
                style={{ '--word-index': index }}
                aria-hidden="true"
                key={word}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subheadline">
            Media that builds brands. Content that gets attention. Systems that generate leads.
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
          <span>HWP / 001</span>
          <span>SCROLL TO EXPLORE</span>
          <span>TAMPA BAY · FL</span>
        </div>
      </section>
    </main>
  );
}
