import HeroScene from './components/HeroScene.jsx';

// Replace this with your Calendly, Cal.com, HoneyBook, or contact-page URL.
const BOOKING_URL = 'https://cal.com/your-booking-link';

export default function App() {
  return (
    <main className="site-shell">
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
          <HeroScene />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" />
            AI-POWERED MEDIA &amp; GROWTH
          </p>

          <h1 id="hero-title">Websites That Build Brands.</h1>

          <p className="hero-subheadline">
            Media that builds brands. Content that gets attention. Systems that generate leads.
          </p>

          <div className="hero-actions">
            <a
              className="primary-cta"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book a Call
              <span aria-hidden="true">↗</span>
            </a>

            <span className="availability">Now booking select projects</span>
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
