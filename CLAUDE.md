# CLAUDE.md

Personal website for Marc Torrelles — [marctorrelles.com](https://marctorrelles.com).

## Stack

- **Next.js 16** (Pages Router), **React 19**, TypeScript
- **styled-components** 6 for styling (SSR via `pages/_document.tsx`)
- **framer-motion** for page/font transitions
- Content authored as Markdown (`gray-matter` frontmatter, `raw-loader` for `.md` imports)
- Fully static (SSG) — no API routes, no server data fetching, no runtime bindings
- Package manager: **yarn**
- Deployed to **Cloudflare Workers** via `@opennextjs/cloudflare` (see Deployment)

## Layout

```
pages/            Routes (Pages Router)
  index.tsx         About (home)
  experience.tsx    Experience
  projects.tsx      Projects
  photos.tsx        Photo album index
  photos/[slug].tsx Single album (getStaticPaths + getStaticProps)
  _app.tsx          Providers, layout shell, transitions
  _document.tsx     styled-components SSR wiring
components/       Reusable UI (Name, Nav, sidebars, FadeInImage, ...)
styles/           Theme + providers (Theme/Font/Nav), fonts, GlobalStyle
lib/              getSortedPhotos (build-time fs reads), date helpers
photos/           Album markdown (frontmatter: title, author, date, path, cover)
public/           Images, fonts, favicon; photo/project assets
```

Albums are Markdown files in `photos/`. Frontmatter `path` points at a folder
under `public/`; `getSortedPhotos` reads that folder at **build time** to list
the images. `hidden: true` frontmatter hides an album outside `development`.

## Commands

```bash
yarn dev        # local dev (next dev)
yarn build      # next build
yarn preview    # opennext build + local Cloudflare Workers preview
yarn deploy     # opennext build + deploy to Cloudflare (needs CLOUDFLARE_API_TOKEN)
```

## Deployment

Migrated off Vercel. GitHub Actions deploys to **Cloudflare Workers** on every
push to `main` (`.github/workflows/deploy.yml`), using
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) — the same setup
as `caliu/apps/web`.

- `wrangler.toml` — Worker name `marctorrelles`; serves `.open-next/assets` as
  static assets and `.open-next/worker.js` as the handler.
- `open-next.config.ts` — `defineCloudflareConfig()` (defaults; no bindings).
- Build artifacts (`.open-next/`, `.wrangler/`) are gitignored.

The workflow only needs the `CLOUDFLARE_API_TOKEN` repo secret. The custom
domain is attached in the Cloudflare dashboard once DNS is moved off Vercel.
