# HWP Media v3 deployment checklist

1. Create a new branch from the working `v2-browser-clean` branch.
2. Suggested branch name: `v3-light-dark`.
3. Extract the ZIP locally.
4. Use GitHub **Add file → Upload files**.
5. Drag the entire selection together: `src`, `index.html`, `package.json`, `vite.config.js`, and `vercel.json`.
6. Confirm GitHub shows nested paths beginning with `/src/`.
7. Commit with: `Add light-to-dark cinematic v3`.
8. Wait for the Vercel preview deployment.
9. Test desktop, mobile, scroll transition, logo motion, and service cards before merging.
