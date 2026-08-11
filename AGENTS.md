# AGENTS.md

Three.js Journey learning repo (follows Bruno Simon's course). Each numbered folder is an **independent, standalone Vite project** — not a monorepo. There are no shared or hoisted dependencies, no tests, no linter, and no typecheck.

## Commands (run inside a lesson folder)
- `npm install` — first time only, per lesson
- `npm run dev` — Vite dev server (port 8080); opens browser unless a CodeSandbox env var is present
- `npm run build` — builds to `dist/` (per lesson)

## Structure
- Lesson 03 (`03-first-threejs-project`): atypical. `index.html` + `script.js` sit at the folder root; no `vite.config.js`, `src/`, or `static/`.
- Lessons 04+ follow the course template: `src/index.html`, `src/script.js`, `src/style.css`, `static/` for assets (textures, fonts), and `vite.config.js` with `root: 'src/'`, `publicDir: '../static/'`, `outDir: '../dist'`, plus `vite-plugin-restart` that watches `../static/`.
- Scripts use the course style: section-header comments (`Base`, `Debug`, `Objects`, `Lights`), a `tick` loop via `window.requestAnimationFrame(tick)`, and scene additions frequently left commented out. `lil-gui` is the debug UI from lesson 11 onward; lesson 05 also uses `gsap`.
- Three.js imports use modern paths, e.g. `import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'`.

## Version gotchas
- Lessons 04+ use `three@^0.174` + `vite@^6` (`type: module`). Lesson 03 uses `three@^0.185` + `vite@^8` and `type: commonjs`. Don't assume a single three/vite version across lessons, and don't update one lesson's deps to match another.

## Git
- Commit history is one short line per lesson (e.g. `13-go live completed`).
- Root `.gitignore` contains `node_modules/`, which covers all lesson dirs — do **not** add new lessons' `node_modules` to a commit.
- Gotcha: `12-3d-text/node_modules` (1382 files) is already committed to the repo and stays tracked. Ignore it in diffs; never stage node_modules changes from that folder.
