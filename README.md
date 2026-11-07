# Every Light Leads Me to You — A Diwali experience for Pari

A mobile-first, single-page Diwali microsite with a pastel scrapbook / hand-illustrated feel. It uses the real photographs supplied in `Pari.zip`, a continuous scroll narrative, gentle motion, a photo lightbox, a fireworks canvas, and nine interactive diyas that reveal personal messages.

## Project contents

- `index.html` — all story chapters and content
- `styles.css` — responsive pastel / hand-drawn visual system
- `script.js` — scroll reveals, mobile navigation, photo lightbox, fireworks, and diya interactions
- `assets/photos/` — 17 selected and optimised photographs from the supplied archive
- `vercel.json` — static-site routing settings

## Run locally

No build step or package installation is needed. The site is plain HTML, CSS, and JavaScript.

With Python installed:

```bash
cd pari-diwali-site
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub + Vercel

1. Create a new empty repository on GitHub (for example, `pari-diwali`).
2. Open Terminal in this folder and run:

```bash
git init
git add .
git commit -m "Create Diwali surprise for Pari"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pari-diwali.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and use the repository URL GitHub gives you.

3. In Vercel, choose **Add New → Project**, import the `pari-diwali` GitHub repository, and use:
   - Framework Preset: **Other**
   - Build Command: leave blank
   - Output Directory: `.`
   - Install Command: leave blank
4. Click **Deploy**. Later edits pushed to the `main` branch will redeploy automatically.

You can also deploy from this folder with the Vercel CLI:

```bash
npx vercel
npx vercel --prod
```

## Personalise before sending

- The current final portrait uses `yellow-twirl.webp`, one of Pari's yellow-saree photographs. Change the image path in the final `<img>` inside `index.html` if you prefer another ethnic portrait.
- The diya messages live near the top of `script.js` in the `diyaMessages` array. Edit the wording there without changing the rest of the interaction.
- All photo captions and alt text are editable directly in `index.html`.

## Privacy note

The deployed website is publicly reachable by anyone who has its URL. The URL may be unlisted, but it is not password-protected by this project. Only deploy the photographs if you are comfortable with anyone possessing the link being able to view them. Do not add personal addresses, phone numbers, or other sensitive details.

## Immersive visual update

The visual environment is built from four local vector illustrations in `assets/illustrations/`:

- `dusk-neighbourhood.svg` — the warm evening homes, lit windows, balconies and doorstep details.
- `festive-home.svg` — fairy lights, floral torans and decorated-home details behind the memory gallery.
- `midnight-town.svg` — the violet night skyline and firework backdrop.
- `lantern-midnight.svg` — the quieter starry sky, floating lanterns and distant glowing homes.

These are local SVG assets; the site does not need a separate image service or build step. The visual update changes the page backgrounds and decorative environments only. The supplied `index.html`, `script.js`, 17 selected WebP photographs, their captions, the nine diya messages and the final letter remain unchanged.


## Final Diwali environment pass

The illustrated environments are full-bleed, opaque local SVG scenes for dusk neighbourhoods, decorated homes, fireworks, a lantern-filled midnight sky, and the diya courtyard. The website still uses the original 17 selected photographs and original story copy. Photo assets load eagerly so the gallery does not leave blank placeholders during quick scrolling.
