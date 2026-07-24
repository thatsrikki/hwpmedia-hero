# GitHub and Vercel deployment checklist

The repository root must contain all of these items at the same level:

- `package.json`
- `index.html`
- `vite.config.js`
- `vercel.json`
- `src/main.jsx`
- `src/App.jsx`
- `src/styles.css`
- `src/components/HeroScene.jsx`
- `src/components/Logo3D.jsx`
- `src/assets/HWP Logo.svg`

Do not upload only the loose files from the project root while leaving out the `src` folder.

In Vercel:

- Framework Preset: Vite
- Root Directory: leave blank when the files above are at the repository root
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 20.x
