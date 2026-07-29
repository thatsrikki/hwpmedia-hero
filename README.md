# HWP Media Three.js Hero

A responsive React 19 + Vite hero using Three.js, React Three Fiber, and Drei. The uploaded HWP SVG is loaded from `src/assets/HWP Logo.svg`, converted into real SVG shapes, and extruded into 3D geometry.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`

A `vercel.json` file is included for SPA routing and immutable asset caching.

## Set the booking link

Open `src/App.jsx` and replace:

```js
const BOOKING_URL = 'https://cal.com/your-booking-link';
```

with your Calendly, Cal.com, HoneyBook, or contact-page URL.

## Main controls

- Extrusion depth and bevel: `src/components/Logo3D.jsx`
- Mouse tilt: `MAX_TILT` in `Logo3D.jsx`
- Float speed/intensity: the `<Float>` settings in `Logo3D.jsx`
- White key and red rim lights: `src/components/HeroScene.jsx`
- Two-second headline delay: `.hero-copy` in `src/styles.css`
