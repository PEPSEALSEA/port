# Agent instructions

## Stack

- React + Vite portfolio app (`src/`, `index.html`, `vite.config.js`)
- Routes:
  - `/` — intro home (brand hero, work gallery placeholders, about strip)
  - `/projects` — GitHub repos dashboard
- Animation / UX plugins: `motion`, `gsap` + `@gsap/react`, `lenis`, `react-router-dom`
- Static build output: `dist/` (includes `404.html` copy of `index.html` for GitHub Pages SPA fallback)
- Deploy target: GitHub Pages at `https://pepsealsea.github.io/port/`
- Vite `base` must stay `/port/` so assets and router `basename` resolve under the repo path

## Placeholder content

- Profile copy: `src/data/profile.js`
- Work gallery items: `src/data/work.js`
- Future photos: drop into `public/work/` and wire paths in `work.js` / about photo

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy (GitHub Pages)

Deploy is automated by `.github/workflows/deploy.yml` on every push to `main` (and via `workflow_dispatch`).

1. Build job: `npm ci` → `npm run build` → upload `dist` as Pages artifact
2. Deploy job: `actions/deploy-pages` publishes the artifact
3. Build emits `dist/404.html` so deep links like `/port/projects` refresh correctly

One-time GitHub setup (repo Settings → Pages):

1. Source: **GitHub Actions** (not "Deploy from a branch")
2. After the first successful workflow run, the site is at `https://pepsealsea.github.io/port/`

Do not commit `dist/`, `node_modules/`, or local env files. CI builds from source.

If the repo is renamed, update `base` in `vite.config.js` to match `/<repo-name>/`.

## Commit and push (always)

After finishing a change set in this repo, **always `git commit` and `git push` to GitHub without asking**. Do not wait for the user to request it.

1. Run project checks first (`npm run build`, plus lint/typecheck if present).
2. Fix any real errors that would break the site or CI.
3. Do **not** commit or push while known errors remain.
4. Stage relevant files, commit with a clear message, then `git push` to `origin` on the current branch.
5. Never commit secrets, `dist/`, or `node_modules/`.

## Ignore what should not be committed

When files appear that should not be in git (secrets, local env, OS junk, build/cache output, editor junk):

1. Add them to `.gitignore` (create the file if missing).
2. Never commit secrets (`.env`, credentials, tokens, private keys).
3. Prefer ignoring generated/local-only artifacts over committing them.
