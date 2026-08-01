# HWP Media — Cinematic Brand Engine v2

React 19 + Vite + Three.js + React Three Fiber + Drei + React Postprocessing.

## New in this version

- Blurred glossy reflection floor beneath the SVG logo
- Soft contact shadow for grounded depth
- Material-driven selective bloom on the logo edges
- Scroll-driven camera and logo transition
- Second-screen Brand Engine services section
- Desktop, tablet, mobile, and reduced-motion handling

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run preview
```

## Booking URL

Update `BOOKING_URL` near the top of `src/App.jsx`.

## Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 20.x

Upload the contents of this folder to the root of the GitHub repository. Preserve the `src` folder structure.
