/**
 * Example: Generate an avatar URL from a typed config.
 *
 * Usage:
 *   npx tsx examples/generate-url.ts
 *
 * Edit the `config` object below to customize your avatar.
 * All fields use real TypeScript enums — your editor will autocomplete them.
 */
import { Accessory, AvatarConfig, Body, Face, FacialHair, Head } from "../src/proto/avatar";

// ── Avatar config ──────────────────────────────────────────────
// All fields are optional. Omit any field to use the server default.

const config: Partial<AvatarConfig> = {
	head: Head.HEAD_BANGS,
	body: Body.BODY_HOODIE,
	face: Face.FACE_SMILE,
	facialHair: FacialHair.FACIAL_HAIR_FULL,
	accessory: Accessory.ACCESSORY_GLASSES,

	// Colors (optional – omit to use defaults)
	skinColor: "#FFDBB4",
	topColor: "#3498db",
	hairColor: "#4A312C",
	// outlineColor: "#000",
	// jacketColor: "#BA98DE",
	// hatColor: "#C93305",
	// beardColor: "brown",
	// accessoryColor: "#C93305",
	// propColor: "silver",
	// backgroundColor: "#f0e6d3",
};

// ── Generate URL ───────────────────────────────────────────────

const BASE_URL = "http://localhost:8787";

const bytes = AvatarConfig.encode(config as AvatarConfig).finish();

// base64url encode (no padding)
const token = btoa(String.fromCharCode(...bytes))
	.replace(/\+/g, "-")
	.replace(/\//g, "_")
	.replace(/=+$/, "");

console.log("Config:", JSON.stringify(config, null, 2));
console.log("");
console.log(`Binary size: ${bytes.length} bytes`);
console.log(`Token: ${token}`);
console.log(`Token length: ${token.length} chars`);
console.log("");
console.log(`URL: ${BASE_URL}/v1/${token}.svg`);
