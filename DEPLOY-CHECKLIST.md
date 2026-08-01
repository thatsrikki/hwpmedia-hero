# HWP Media v2 deployment checklist

1. Extract the ZIP.
2. Upload the files and folders inside the extracted folder to the GitHub repository root.
3. Confirm GitHub shows `src/main.jsx`, `src/App.jsx`, and `src/components/HeroScene.jsx`.
4. Commit to a new branch named `v2-cinematic` for a safe Vercel preview.
5. In Vercel, verify Framework = Vite, Build = `npm run build`, Output = `dist`, Node = 20.x.
6. Review the preview on desktop and mobile before merging into `main`.
7. Replace the placeholder booking URL in `src/App.jsx`.
