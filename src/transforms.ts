// Transforms from the React Effigy.tsx component.
// Now using React component path data directly (not flat mono assets),
// so these transforms apply without coordinate compensation.

// Square viewBox centered on head area, showing hair through upper body
export const AVATAR_VIEWBOX = "220 70 800 800";
export const AVATAR_WIDTH = 512;
export const AVATAR_HEIGHT = 512;

// Base transforms (from Effigy.tsx)
export const BODY_TRANSFORM = "translate(147, 639)";
export const HEAD_BASE = { x: 342, y: 190 };
export const FACE_TRANSFORM = "translate(531, 366)";
export const BEARD_BASE = { x: 495, y: 518 };
export const ACCESSORY_BASE = { x: 419, y: 421 };

export const DEFAULT_HEAD = "afro";
export const DEFAULT_BODY = "hoodie";
export const DEFAULT_FACE = "calm";

// Simplified public color API (9 params covering 18 React props)
export const DEFAULT_COLORS: Record<string, string> = {
	outlineColor: "#000",
	skinColor: "#D08B5B",
	topColor: "#FFCF77",
	jacketColor: "#BA98DE",
	hairColor: "#E5E5E5",
	hatColor: "#C93305",
	beardColor: "brown",
	accessoryColor: "#C93305",
	propColor: "silver",
	backgroundColor: "transparent",
};

// Map from React component prop names to our simplified API param names
export const COLOR_PROP_MAP: Record<string, string> = {
	outlineColor: "outlineColor",
	skinColor: "skinColor",
	topColor: "topColor",
	jacketColor: "jacketColor",
	blazerColor: "jacketColor",
	hairColor: "hairColor",
	beanieColor: "hatColor",
	capColor: "hatColor",
	hijabColor: "hatColor",
	turbanColor: "hatColor",
	beardColor: "beardColor",
	frameColor: "accessoryColor",
	clipColor: "accessoryColor",
	cupColor: "propColor",
	computerColor: "propColor",
	paperColor: "propColor",
	pocketColor: "propColor",
	knifeColor: "propColor",
};

// Head-group offset by body type (from Effigy.tsx createHead)
export const HEAD_GROUP_OFFSETS: Record<string, { x: number; y: number }> = {
	explaining: { x: 0, y: 30 },
	"pointing-up": { x: 0, y: 30 },
	"polkadot-jacket": { x: 0, y: 20 },
	killer: { x: 0, y: 10 },
	"stripped-pocket-tee": { x: 250, y: 0 },
	whatever: { x: 90, y: 0 },
};

// Per-type head offsets (from Effigy.tsx createHair)
export const HEAD_OFFSETS: Record<string, { x: number; y: number }> = {
	bald: { x: 50, y: 20 },
	"bangs-two": { x: 20, y: 0 },
	"bantu-knots": { x: 30, y: 0 },
	bear: { x: 20, y: 0 },
	bun: { x: -20, y: -30 },
	beanie: { x: 20, y: 0 },
	"bun-clip": { x: 20, y: -70 },
	"bun-knots": { x: 10, y: -30 },
	"bun-two": { x: -50, y: -90 },
	"color-medium": { x: 30, y: 0 },
	"cornrows-light": { x: -15, y: 0 },
	"dreads-two": { x: 0, y: -15 },
	"flat-top": { x: 50, y: 0 },
	"flat-top-long": { x: 50, y: 0 },
	"gray-short": { x: 40, y: 0 },
	"hat-hip": { x: -30, y: 0 },
	hijab: { x: 50, y: 20 },
	"long-afro": { x: -100, y: -130 },
	"long-bangs": { x: -25, y: 0 },
	"long-curly": { x: -50, y: -40 },
	"long-hair": { x: -50, y: 0 },
	"medium-bangs": { x: -50, y: 0 },
	"medium-bangs-color": { x: -20, y: 0 },
	"medium-bangs-one": { x: 40, y: 10 },
	"medium-one": { x: 40, y: 10 },
	"medium-straight": { x: 40, y: 0 },
	"medium-two": { x: -20, y: 0 },
	mohawk: { x: 40, y: 0 },
	"mohawk-knots": { x: 40, y: 0 },
	"no-hair-three": { x: 30, y: 0 },
	"no-hair-two": { x: 30, y: 0 },
	pomp: { x: 40, y: 0 },
	shaved: { x: 40, y: 0 },
	"shaved-one": { x: 40, y: 0 },
	"shaved-three": { x: 10, y: -20 },
	"short-five": { x: 40, y: -10 },
	"short-four": { x: 40, y: -10 },
	"short-one": { x: 40, y: -10 },
	"short-three": { x: 40, y: 0 },
	"short-two": { x: 40, y: 0 },
	turban: { x: 40, y: 0 },
	twists: { x: 40, y: 0 },
	"twists-two": { x: 40, y: 0 },
	wavy: { x: 40, y: 0 },
};

// Per-type beard offsets (from Effigy.tsx createBeard)
export const BEARD_OFFSETS: Record<string, { x: number; y: number; scaleX?: number; scaleY?: number }> = {
	"full-color": { x: 0, y: -20, scaleX: 0.94, scaleY: 0.97 },
	"full-max": { x: 0, y: -20, scaleX: 0.98, scaleY: 1 },
	"full-medium": { x: 0, y: -10, scaleX: 0.98, scaleY: 1 },
	"mustache-bull": { x: 0, y: -20 },
	"mustache-eight": { x: -240, y: -75 },
};

// Per-type accessory offsets (from Effigy.tsx createAccessory)
export const ACCESSORY_OFFSETS: Record<string, { x: number; y: number }> = {
	eyepatch: { x: 0, y: -60 },
	"sunglasses-two": { x: -10, y: 0 },
};
