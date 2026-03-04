# MAI Website (GitHub Pages)

Static business website scaffold ready for GitHub Pages.

## Development

1. Install dependencies:
   - `npm install`
2. Build CSS once:
   - `npm run build:css`
3. Watch Tailwind while editing:
   - `npm run watch:css`

`styles.css` is generated from `input.css` + `tailwind.config.js` and is safe to commit for GitHub Pages.

## Local preview

Open `index.html` directly in your browser, or serve with any static server.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Save and wait for deployment.
5. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

## Files

- `index.html` – page structure and content
- `input.css` – Tailwind source styles
- `styles.css` – compiled output used by the site
- `tailwind.config.js` – design tokens/theme
- `script.js` – mobile menu + dynamic year
