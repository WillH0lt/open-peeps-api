# Open Peeps Builder

A browser-based avatar builder for [Open Peeps](https://www.openpeeps.com/), powered by the Open Peeps Worker API.

Pick a hairstyle, face, outfit, facial hair, and accessories, tweak the colors, and get a shareable SVG link or download.

## Setup

```bash
pnpm install
```

## Development

The builder expects the Open Peeps Worker API to be running locally:

```bash
# In the root of the repo
pnpm dev

# In the builder directory
pnpm dev
```

The dev server points to `http://localhost:8787` for the API by default.
