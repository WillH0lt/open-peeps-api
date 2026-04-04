import type { AvatarParts, ColorOverrides } from "./composite";
import { Accessory, AvatarConfig, Body, Face, FacialHair, Head } from "./proto/avatar";

// Enum value → slug mappings

const HEAD_SLUGS: Record<number, string> = {
	[Head.HEAD_AFRO]: "afro",
	[Head.HEAD_BALD]: "bald",
	[Head.HEAD_BANGS]: "bangs",
	[Head.HEAD_BANGS_TWO]: "bangs-two",
	[Head.HEAD_BANTU_KNOTS]: "bantu-knots",
	[Head.HEAD_BEANIE]: "beanie",
	[Head.HEAD_BEAR]: "bear",
	[Head.HEAD_BUN]: "bun",
	[Head.HEAD_BUN_CLIP]: "bun-clip",
	[Head.HEAD_BUN_KNOTS]: "bun-knots",
	[Head.HEAD_BUN_TWO]: "bun-two",
	[Head.HEAD_COLOR_BUN]: "color-bun",
	[Head.HEAD_COLOR_MEDIUM]: "color-medium",
	[Head.HEAD_CORNROWS]: "cornrows",
	[Head.HEAD_CORNROWS_LIGHT]: "cornrows-light",
	[Head.HEAD_DOC_ONE]: "doc-one",
	[Head.HEAD_DOC_THREE]: "doc-three",
	[Head.HEAD_DOC_TWO]: "doc-two",
	[Head.HEAD_DREADS_ONE]: "dreads-one",
	[Head.HEAD_DREADS_TWO]: "dreads-two",
	[Head.HEAD_FLAT_TOP]: "flat-top",
	[Head.HEAD_FLAT_TOP_LONG]: "flat-top-long",
	[Head.HEAD_GRAY_SHORT]: "gray-short",
	[Head.HEAD_HAT_HIP]: "hat-hip",
	[Head.HEAD_HIJAB]: "hijab",
	[Head.HEAD_LONG_AFRO]: "long-afro",
	[Head.HEAD_LONG_BANGS]: "long-bangs",
	[Head.HEAD_LONG_CURLY]: "long-curly",
	[Head.HEAD_LONG_HAIR]: "long-hair",
	[Head.HEAD_MEDIUM_BANGS]: "medium-bangs",
	[Head.HEAD_MEDIUM_BANGS_COLOR]: "medium-bangs-color",
	[Head.HEAD_MEDIUM_BANGS_ONE]: "medium-bangs-one",
	[Head.HEAD_MEDIUM_ONE]: "medium-one",
	[Head.HEAD_MEDIUM_STRAIGHT]: "medium-straight",
	[Head.HEAD_MEDIUM_THREE]: "medium-three",
	[Head.HEAD_MEDIUM_TWO]: "medium-two",
	[Head.HEAD_MOHAWK]: "mohawk",
	[Head.HEAD_MOHAWK_KNOTS]: "mohawk-knots",
	[Head.HEAD_NO_HAIR_THREE]: "no-hair-three",
	[Head.HEAD_NO_HAIR_TWO]: "no-hair-two",
	[Head.HEAD_POMP]: "pomp",
	[Head.HEAD_SHAVED]: "shaved",
	[Head.HEAD_SHAVED_ONE]: "shaved-one",
	[Head.HEAD_SHAVED_THREE]: "shaved-three",
	[Head.HEAD_SHORT_FIVE]: "short-five",
	[Head.HEAD_SHORT_FOUR]: "short-four",
	[Head.HEAD_SHORT_ONE]: "short-one",
	[Head.HEAD_SHORT_THREE]: "short-three",
	[Head.HEAD_SHORT_TWO]: "short-two",
	[Head.HEAD_TURBAN]: "turban",
	[Head.HEAD_TWISTS]: "twists",
	[Head.HEAD_TWISTS_TWO]: "twists-two",
	[Head.HEAD_WAVY]: "wavy",
};

const FACE_SLUGS: Record<number, string> = {
	[Face.FACE_ANGRY]: "angry",
	[Face.FACE_ANGRY_FANG]: "angry-fang",
	[Face.FACE_AWE]: "awe",
	[Face.FACE_BIG_SMILE]: "big-smile",
	[Face.FACE_BLANK]: "blank",
	[Face.FACE_CALM]: "calm",
	[Face.FACE_CALM_WITH_MASK]: "calm-with-mask",
	[Face.FACE_CHEEKY]: "cheeky",
	[Face.FACE_CHEERS_WITH_MASK]: "cheers-with-mask",
	[Face.FACE_CONCERNED]: "concerned",
	[Face.FACE_CONCERNED_FEAR]: "concerned-fear",
	[Face.FACE_CONTEMPT]: "contempt",
	[Face.FACE_CUTE]: "cute",
	[Face.FACE_CYCLOPS]: "cyclops",
	[Face.FACE_DRIVEN]: "driven",
	[Face.FACE_EATING_HAPPY]: "eating-happy",
	[Face.FACE_EXPLAINING]: "explaining",
	[Face.FACE_EYES_CLOSED]: "eyes-closed",
	[Face.FACE_FEAR]: "fear",
	[Face.FACE_HECTIC]: "hectic",
	[Face.FACE_LOVE_GRIN_TEETH]: "love-grin-teeth",
	[Face.FACE_LOVE_GRIN_TONGUE]: "love-grin-tongue",
	[Face.FACE_MONSTER]: "monster",
	[Face.FACE_OLD]: "old",
	[Face.FACE_RAGE]: "rage",
	[Face.FACE_SERIOUS]: "serious",
	[Face.FACE_SMILE]: "smile",
	[Face.FACE_SMILE_LOL]: "smile-lol",
	[Face.FACE_SMILE_TEETH]: "smile-teeth",
	[Face.FACE_SMILE_WITH_MASK]: "smile-with-mask",
	[Face.FACE_SOLEMN]: "solemn",
	[Face.FACE_SUSPICIOUS]: "suspicious",
	[Face.FACE_TIRED]: "tired",
};

const BODY_SLUGS: Record<number, string> = {
	[Body.BODY_BLAZER_BLACK_TEE]: "blazer-black-tee",
	[Body.BODY_BUTTON_POCKET_SHIRT]: "button-pocket-shirt",
	[Body.BODY_BUTTON_SHIRT]: "button-shirt",
	[Body.BODY_COFFEE]: "coffee",
	[Body.BODY_COMPUTER]: "computer",
	[Body.BODY_DRESS]: "dress",
	[Body.BODY_EXPLAINING]: "explaining",
	[Body.BODY_GAMING]: "gaming",
	[Body.BODY_GYM_SHIRT]: "gym-shirt",
	[Body.BODY_HOODIE]: "hoodie",
	[Body.BODY_JACKET]: "jacket",
	[Body.BODY_KILLER]: "killer",
	[Body.BODY_PAPER]: "paper",
	[Body.BODY_POINTING_UP]: "pointing-up",
	[Body.BODY_POLKADOT_JACKET]: "polkadot-jacket",
	[Body.BODY_POLO_SWEATER]: "polo-sweater",
	[Body.BODY_SHIRT_COAT]: "shirt-coat",
	[Body.BODY_SPORTY_TEE]: "sporty-tee",
	[Body.BODY_STRIPED_TEE]: "striped-tee",
	[Body.BODY_STRIPPED_POCKET_TEE]: "stripped-pocket-tee",
	[Body.BODY_SWEATER_DOTS]: "sweater-dots",
	[Body.BODY_TEE]: "tee",
	[Body.BODY_TEE_ARMS_CROSSED]: "tee-arms-crossed",
	[Body.BODY_TEE_SELENA]: "tee-selena",
	[Body.BODY_THUNDER_TEE]: "thunder-tee",
	[Body.BODY_TURTLENECK]: "turtleneck",
	[Body.BODY_WHATEVER]: "whatever",
};

const FACIAL_HAIR_SLUGS: Record<number, string> = {
	[FacialHair.FACIAL_HAIR_CHIN]: "chin",
	[FacialHair.FACIAL_HAIR_FULL]: "full",
	[FacialHair.FACIAL_HAIR_FULL_COLOR]: "full-color",
	[FacialHair.FACIAL_HAIR_FULL_MAX]: "full-max",
	[FacialHair.FACIAL_HAIR_FULL_MEDIUM]: "full-medium",
	[FacialHair.FACIAL_HAIR_GOATEE]: "goatee",
	[FacialHair.FACIAL_HAIR_GOATEE_FULL]: "goatee-full",
	[FacialHair.FACIAL_HAIR_MUSTACHE_BULL]: "mustache-bull",
	[FacialHair.FACIAL_HAIR_MUSTACHE_EIGHT]: "mustache-eight",
	[FacialHair.FACIAL_HAIR_MUSTACHE_FIVE]: "mustache-five",
	[FacialHair.FACIAL_HAIR_MUSTACHE_NINE]: "mustache-nine",
	[FacialHair.FACIAL_HAIR_MUSTACHE_SEVEN]: "mustache-seven",
	[FacialHair.FACIAL_HAIR_MUSTACHE_SIX]: "mustache-six",
	[FacialHair.FACIAL_HAIR_MUSTACHE_THIN]: "mustache-thin",
	[FacialHair.FACIAL_HAIR_MUSTACHE_THIN_BULL]: "mustache-thin-bull",
	[FacialHair.FACIAL_HAIR_MUSTACHE_YOSEMITE]: "mustache-yosemite",
};

const ACCESSORY_SLUGS: Record<number, string> = {
	[Accessory.ACCESSORY_EYEPATCH]: "eyepatch",
	[Accessory.ACCESSORY_GLASSES]: "glasses",
	[Accessory.ACCESSORY_GLASSES_FIVE]: "glasses-five",
	[Accessory.ACCESSORY_GLASSES_FOUR]: "glasses-four",
	[Accessory.ACCESSORY_GLASSES_SIX]: "glasses-six",
	[Accessory.ACCESSORY_GLASSES_THREE]: "glasses-three",
	[Accessory.ACCESSORY_GLASSES_TWO]: "glasses-two",
	[Accessory.ACCESSORY_SUNGLASSES]: "sunglasses",
	[Accessory.ACCESSORY_SUNGLASSES_TWO]: "sunglasses-two",
};

function base64urlToBytes(b64: string): Uint8Array {
	let base64 = b64.replace(/-/g, "+").replace(/_/g, "/");
	while (base64.length % 4) base64 += "=";
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

export function decodeToken(token: string): { parts: AvatarParts; colors: ColorOverrides } | string {
	let config: AvatarConfig;
	try {
		const bytes = base64urlToBytes(token);
		config = AvatarConfig.decode(bytes);
	} catch {
		return "Invalid token: failed to decode";
	}

	const head = HEAD_SLUGS[config.head] ?? "afro";
	const body = BODY_SLUGS[config.body] ?? "hoodie";
	const face = FACE_SLUGS[config.face] ?? "calm";

	const facialHair = config.facialHair ? FACIAL_HAIR_SLUGS[config.facialHair] : undefined;
	const accessory = config.accessory ? ACCESSORY_SLUGS[config.accessory] : undefined;

	const parts: AvatarParts = {
		head,
		face,
		body,
		"facial-hair": facialHair,
		accessories: accessory,
	};

	const colors: ColorOverrides = {};
	if (config.skinColor) colors.skinColor = config.skinColor;
	if (config.outlineColor) colors.outlineColor = config.outlineColor;
	if (config.topColor) colors.topColor = config.topColor;
	if (config.jacketColor) colors.jacketColor = config.jacketColor;
	if (config.hairColor) colors.hairColor = config.hairColor;
	if (config.hatColor) colors.hatColor = config.hatColor;
	if (config.beardColor) colors.beardColor = config.beardColor;
	if (config.accessoryColor) colors.accessoryColor = config.accessoryColor;
	if (config.propColor) colors.propColor = config.propColor;
	if (config.backgroundColor) colors.backgroundColor = config.backgroundColor;

	return { parts, colors };
}
