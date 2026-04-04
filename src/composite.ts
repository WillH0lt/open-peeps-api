import { type Category, PARTS, type PartData } from "./manifest";
import {
	ACCESSORY_BASE,
	ACCESSORY_OFFSETS,
	AVATAR_HEIGHT,
	AVATAR_VIEWBOX,
	AVATAR_WIDTH,
	BEARD_BASE,
	BEARD_OFFSETS,
	BODY_TRANSFORM,
	COLOR_PROP_MAP,
	DEFAULT_COLORS,
	FACE_TRANSFORM,
	HEAD_BASE,
	HEAD_GROUP_OFFSETS,
	HEAD_OFFSETS,
} from "./transforms";

export type AvatarParts = {
	head: string;
	face: string;
	body: string;
	"facial-hair"?: string;
	accessories?: string;
};

export type ColorOverrides = Record<string, string>;

function findPart(category: Category, slug: string): PartData | undefined {
	return PARTS[category].find((p) => p.slug === slug);
}

function renderPaths(part: PartData, colors: ColorOverrides): string {
	return part.paths
		.map((p) => {
			// Map React prop name → simplified API param name → user value or default
			const apiParam = COLOR_PROP_MAP[p.colorProp] ?? p.colorProp;
			const color = colors[apiParam] ?? DEFAULT_COLORS[apiParam] ?? "#000";
			return `<path d="${p.d}" fill="${color}" />`;
		})
		.join("\n      ");
}

function getHeadTransform(headSlug: string): string {
	const offset = HEAD_OFFSETS[headSlug] ?? { x: 0, y: 0 };
	return `translate(${HEAD_BASE.x + offset.x}, ${HEAD_BASE.y + offset.y})`;
}

function getHeadGroupTransform(bodySlug: string): string {
	const offset = HEAD_GROUP_OFFSETS[bodySlug] ?? { x: 0, y: 0 };
	return `translate(${offset.x}, ${offset.y})`;
}

function getBeardTransform(beardSlug: string): string {
	const offset = BEARD_OFFSETS[beardSlug];
	if (!offset) {
		return `translate(${BEARD_BASE.x}, ${BEARD_BASE.y})`;
	}
	const x = BEARD_BASE.x + offset.x;
	const y = BEARD_BASE.y + offset.y;
	if (offset.scaleX != null) {
		return `translate(${x}, ${y}) scale(${offset.scaleX}, ${offset.scaleY})`;
	}
	return `translate(${x}, ${y})`;
}

function getAccessoryTransform(accessorySlug: string): string {
	const offset = ACCESSORY_OFFSETS[accessorySlug] ?? { x: 0, y: 0 };
	return `translate(${ACCESSORY_BASE.x + offset.x}, ${ACCESSORY_BASE.y + offset.y})`;
}

export function compositeAvatar(parts: AvatarParts, colors: ColorOverrides): string {
	const bodyPart = findPart("body", parts.body)!;
	const headPart = findPart("head", parts.head)!;
	const facePart = findPart("face", parts.face)!;
	const beardPart = parts["facial-hair"] ? findPart("facial-hair", parts["facial-hair"]) : null;
	const accessoryPart = parts.accessories ? findPart("accessories", parts.accessories) : null;

	const headGroupTransform = getHeadGroupTransform(parts.body);
	const headTransform = getHeadTransform(parts.head);
	const beardTransform = beardPart
		? getBeardTransform(parts["facial-hair"]!)
		: `translate(${BEARD_BASE.x}, ${BEARD_BASE.y})`;
	const accessoryTransform = accessoryPart
		? getAccessoryTransform(parts.accessories!)
		: `translate(${ACCESSORY_BASE.x}, ${ACCESSORY_BASE.y})`;

	const bg = colors.backgroundColor ?? DEFAULT_COLORS.backgroundColor;
	const bgRect = bg !== "transparent" ? `\n    <rect width="100%" height="100%" fill="${bg}" />` : "";

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${AVATAR_VIEWBOX}" width="${AVATAR_WIDTH}" height="${AVATAR_HEIGHT}">${bgRect}
  <g id="bust">
    <g id="body" transform="${BODY_TRANSFORM}">
      ${renderPaths(bodyPart, colors)}
    </g>
    <g id="head-group" transform="${headGroupTransform}">
      <g id="head" transform="${headTransform}">
        ${renderPaths(headPart, colors)}
      </g>
      <g id="face" transform="${FACE_TRANSFORM}">
        ${renderPaths(facePart, colors)}
      </g>
      <g id="facial-hair" transform="${beardTransform}">
        ${beardPart ? renderPaths(beardPart, colors) : ""}
      </g>
      <g id="accessories" transform="${accessoryTransform}">
        ${accessoryPart ? renderPaths(accessoryPart, colors) : ""}
      </g>
    </g>
  </g>
</svg>`;
}
