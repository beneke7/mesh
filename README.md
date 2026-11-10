# mesh. website

The complete Mesh redesign: video hero, journal, builds, About and Join pages.
Videos, fonts, logos, photos, grain textures, and article media are included locally.

## Run on localhost

Install Node.js 22.13 or newer (Node 24 recommended), unzip this folder, then open a terminal here:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Stop with Ctrl+C.
No API keys, ChatGPT account, database, or environment file is needed.

## Production preview

```sh
npm run build
npm start
```

Open http://localhost:3000. This is a standard Next.js project, ready for a Node-compatible host or Vercel.

## Put it on GitHub

Create an empty repository on GitHub, then run these commands in this folder, replacing YOUR-USER and YOUR-REPO:

```sh
git init -b main
git add .
git commit -m "Add mesh website"
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```

Alternatively, after the initial commit and signing into GitHub CLI, create a private repository and push in one step:

```sh
gh repo create mesh-website --private --source=. --remote=origin --push
```

Pushing to `main` deploys a static export to GitHub Pages at https://beneke7.github.io/mesh/ (`.github/workflows/pages.yml`, base path set via `PAGES_BASE_PATH`). Link internal pages and media through `u()` from `lib/base.ts` so they work under `/mesh`.

## Edit

- Homepage and About/Join buttons: `app/page.tsx`
- Fonts, spacing, colors, grain: `app/globals.css`
- Posts and article HTML: `content/journal.json`, `content/articles.json`
- About and Join content: `content/pages.json`
- Hero playback: `components/journal/Cover.tsx`
- Build photos and captions: `components/journal/Builds.tsx`
- Footer and social links: `components/journal/Chrome.tsx`
- Media: `public/`

The footer email, X and Instagram links, and build captions remain placeholders.
