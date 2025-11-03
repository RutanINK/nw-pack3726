# Pack 3726 Website (Ready-to-Deploy)

## What you got
- Multi-page static site with header/footer partials
- Google Calendar **Upcoming Highlight + next 3** (needs your API key)
- Netlify form on **leaders.html** → posts to **thanks.html**
- Security headers via `_headers` (and optional `netlify.toml`)

## Quick start (drag-and-drop)
1. Unzip `cubscouts_site.zip`.
2. Open the **cubscouts_site** folder.
3. Drop **the contents** (not the folder) into Netlify Deploy Drop.
4. Done.

## Quick start (GitHub + Netlify)
1. `git init && git add . && git commit -m "init"`
2. Create a GitHub repo and push (`main` branch).
3. In Netlify: Import from Git → choose repo.
4. Publish directory: **/** (repo root).

## Google Calendar API
Edit `/assets/events.js`:
- Set `API_KEY` to your **restricted** key (HTTP referrers: `localhost:5500`, your Netlify domain).
- Keep `CAL_ID` as provided (your Pack calendar).

## Local test
Use VS Code Live Server or any static server. Open `calendar.html` to see the upcoming highlight + list.

## Headers
- `_headers` file at root configures security + caching.
- `netlify.toml` is included too. Use one or both (Netlify merges, but prefer one).
