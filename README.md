# Open Peeps Avatar Worker

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/willwhiteneck/open-peeps-api)

A Cloudflare Worker that generates customizable [Open Peeps](https://www.openpeeps.com/) avatars as SVGs. Mix and match heads, faces, bodies, facial hair, and accessories with full color control. Avatars are encoded as compact URL tokens using Protocol Buffers.

```
https://your-worker.dev/v1/CAEQChgG.svg
```

## Quick Start

```bash
npm install
npm run dev              # starts local server at http://localhost:8787
```

Generate a test avatar URL:

```bash
npx tsx utils/generate-url.ts
```

Open the printed URL in your browser to see the avatar.

## API

### `GET /v1/:token.svg`

Returns a 512x512 SVG avatar. The token is a base64url-encoded protobuf message (see [Token Format](#token-format) below).

```html
<img src="https://your-worker.dev/v1/CAEQChgG.svg" alt="avatar" />
```

Responses are cached with `Cache-Control: public, max-age=31536000, immutable` since the same token always produces the same image.

## Token Format

Avatars are encoded using [Protocol Buffers](https://protobuf.dev/). The schema is in [`proto/avatar.proto`](proto/avatar.proto).

```protobuf
message AvatarConfig {
  Head head = 1;           // enum — e.g., HEAD_AFRO
  Body body = 2;           // enum — e.g., BODY_HOODIE
  Face face = 3;           // enum — e.g., FACE_CALM
  FacialHair facial_hair = 4;  // optional enum
  Accessory accessory = 5;     // optional enum
  optional string skin_color = 10;
  optional string top_color = 12;
  // ... (see avatar.proto for all fields)
}
```

All fields are optional. Omitted fields use defaults (head=afro, body=hoodie, face=calm, default colors).

### Generating a token (TypeScript)

```typescript
import protobuf from "protobufjs";

const root = await protobuf.load("proto/avatar.proto");
const AvatarConfig = root.lookupType("avatar.AvatarConfig");

const config = AvatarConfig.create({
  head: 1,   // HEAD_AFRO
  body: 10,  // BODY_HOODIE
  face: 27,  // FACE_SMILE
  skinColor: "#FFDBB4",
  topColor: "#3498db",
});

const bytes = AvatarConfig.encode(config).finish();
const token = btoa(String.fromCharCode(...bytes))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const url = `https://your-worker.dev/v1/${token}.svg`;
```

See [`utils/generate-url.ts`](utils/generate-url.ts) for a complete working example.

### Token size

| Config | Binary | Token | Example |
|--------|--------|-------|---------|
| Minimal (3 parts, default colors) | 3 bytes | 8 chars | `CAEQChgG` |
| With custom colors | ~30 bytes | ~45 chars | `CAEQChgGUgcjRkZEQkI0...` |
| Full (5 parts + colors) | ~37 bytes | ~50 chars | `CAMQChgbIAIoAlIH...` |

## Colors

10 color params, simplified from the 18 used internally:

| Param | Default | Controls |
|-------|---------|----------|
| `skinColor` | `#D08B5B` | Skin tone |
| `outlineColor` | `#000` | Line art |
| `topColor` | `#FFCF77` | Shirt/clothing |
| `jacketColor` | `#BA98DE` | Jacket, blazer, coat |
| `hairColor` | `#E5E5E5` | Hair color (select styles) |
| `hatColor` | `#C93305` | Beanie, cap, hijab, turban |
| `accessoryColor` | `#C93305` | Glasses frames, hair clips |
| `propColor` | `silver` | Held objects (cup, laptop, paper) |
| `backgroundColor` | `transparent` | Background fill |

Only include colors you want to override. Omitted colors use the defaults above.

## Available Parts

| Category | Count | Default |
|----------|-------|---------|
| Head | 53 | `afro` |
| Face | 33 | `calm` |
| Body | 27 | `hoodie` |
| Facial Hair | 16 | none |
| Accessories | 9 | none |

Call `GET /v1/parts` for the full list of slugs per category.

## Development

### Prerequisites

- Node.js 18+
- npm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (included as dev dependency)

### Commands

```bash
npm run dev                # Local dev server (http://localhost:8787)
npm run build              # Build and validate (dry-run deploy)
npm run deploy             # Deploy to Cloudflare Workers
npm test                   # Run tests
```

### Testing locally

```bash
npm run dev
npx tsx utils/generate-url.ts   # prints a URL you can open in browser
```

Or test directly with curl:

```bash
curl -o avatar.svg http://localhost:8787/v1/CAEQChgG.svg
```

## Deploying

```bash
npm run deploy
```

This deploys to Cloudflare Workers. You'll need to be logged in via `npx wrangler login`. The worker name is configured in `wrangler.jsonc` as `open-peeps-api`.

After deploying, your avatars are available at:

```
https://open-peeps-api.<your-subdomain>.workers.dev/v1/<token>.svg
```

## License

MIT License - Will Holt

Avatar artwork: [Open Peeps](https://www.openpeeps.com/) by Pablo Stanley (CC0).
