import { exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { Accessory, AvatarConfig, Body, Face, FacialHair, Head } from "../src/proto/avatar";

const fetch = (path: string) => exports.default.fetch(new Request(`http://localhost${path}`));

function encodeToken(config: Partial<AvatarConfig>): string {
	const full: AvatarConfig = {
		head: 0,
		body: 0,
		face: 0,
		facialHair: 0,
		accessory: 0,
		...config,
	};
	const bytes = AvatarConfig.encode(full).finish();
	return btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

describe("GET /v1/:token.svg", () => {
	it("returns SVG for a minimal token", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			face: Face.FACE_CALM,
		});
		const res = await fetch(`/v1/${token}.svg`);
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toBe("image/svg+xml");

		const svg = await res.text();
		expect(svg).toContain("<svg");
		expect(svg).toContain("</svg>");
		expect(svg).toContain('width="512"');
		expect(svg).toContain('height="512"');
	});

	it("uses defaults when only some fields are set", async () => {
		// Only set head — body and face should use defaults
		const token = encodeToken({ head: Head.HEAD_HIJAB });
		const res = await fetch(`/v1/${token}.svg`);
		expect(res.status).toBe(200);
		const svg = await res.text();
		expect(svg).toContain("<svg");
		expect(svg).toContain('id="head"');
		expect(svg).toContain('id="body"');
	});

	it("applies custom skin color", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			skinColor: "#FF0000",
		});
		const res = await fetch(`/v1/${token}.svg`);
		const svg = await res.text();
		expect(svg).toContain('fill="#FF0000"');
	});

	it("applies background color", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			backgroundColor: "#f0e6d3",
		});
		const res = await fetch(`/v1/${token}.svg`);
		const svg = await res.text();
		expect(svg).toContain('fill="#f0e6d3"');
		expect(svg).toContain("<rect");
	});

	it("omits background rect when no backgroundColor", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
		});
		const res = await fetch(`/v1/${token}.svg`);
		const svg = await res.text();
		expect(svg).not.toContain("<rect");
	});

	it("includes facial hair when specified", async () => {
		const withBeard = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			facialHair: FacialHair.FACIAL_HAIR_FULL,
		});
		const without = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
		});
		const svgWith = await (await fetch(`/v1/${withBeard}.svg`)).text();
		const svgWithout = await (await fetch(`/v1/${without}.svg`)).text();
		expect(svgWith.length).toBeGreaterThan(svgWithout.length);
	});

	it("includes accessories when specified", async () => {
		const withGlasses = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			accessory: Accessory.ACCESSORY_GLASSES,
		});
		const without = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
		});
		const svgWith = await (await fetch(`/v1/${withGlasses}.svg`)).text();
		const svgWithout = await (await fetch(`/v1/${without}.svg`)).text();
		expect(svgWith.length).toBeGreaterThan(svgWithout.length);
	});

	it("returns 400 for non-base64 characters in token", async () => {
		// Special chars that aren't valid base64url — the route still matches
		// but atob will throw when decoding
		const res = await fetch("/v1/!!!invalid!!!.svg");
		expect(res.status).toBe(400);
	});

	it("returns 404 for paths without .svg extension", async () => {
		const res = await fetch("/v1/CAEQChgG");
		expect(res.status).toBe(404);
	});

	it("produces deterministic output (same token = same SVG)", async () => {
		const token = encodeToken({
			head: Head.HEAD_BANGS,
			body: Body.BODY_EXPLAINING,
			face: Face.FACE_SMILE,
			skinColor: "#FFDBB4",
		});
		const svg1 = await (await fetch(`/v1/${token}.svg`)).text();
		const svg2 = await (await fetch(`/v1/${token}.svg`)).text();
		expect(svg1).toBe(svg2);
	});

	it("sets immutable cache headers", async () => {
		const token = encodeToken({ head: Head.HEAD_AFRO, body: Body.BODY_HOODIE });
		const res = await fetch(`/v1/${token}.svg`);
		expect(res.headers.get("cache-control")).toContain("immutable");
		expect(res.headers.get("cache-control")).toContain("max-age=31536000");
	});
});

describe("token encoding/decoding roundtrip", () => {
	it("encodes all enum values correctly", async () => {
		// Test a few different heads to ensure enum mapping works
		const heads = [Head.HEAD_AFRO, Head.HEAD_HIJAB, Head.HEAD_WAVY, Head.HEAD_MOHAWK];
		for (const head of heads) {
			const token = encodeToken({ head, body: Body.BODY_TEE, face: Face.FACE_CALM });
			const res = await fetch(`/v1/${token}.svg`);
			expect(res.status).toBe(200);
		}
	});

	it("encodes all body types correctly", async () => {
		const bodies = [Body.BODY_HOODIE, Body.BODY_EXPLAINING, Body.BODY_WHATEVER, Body.BODY_DRESS];
		for (const body of bodies) {
			const token = encodeToken({ head: Head.HEAD_AFRO, body, face: Face.FACE_CALM });
			const res = await fetch(`/v1/${token}.svg`);
			expect(res.status).toBe(200);
		}
	});
});

describe("SVG structure", () => {
	it("has correct group hierarchy", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_HOODIE,
			face: Face.FACE_CALM,
			facialHair: FacialHair.FACIAL_HAIR_FULL,
			accessory: Accessory.ACCESSORY_GLASSES,
		});
		const svg = await (await fetch(`/v1/${token}.svg`)).text();

		expect(svg).toContain('id="bust"');
		expect(svg).toContain('id="body"');
		expect(svg).toContain('id="head-group"');
		expect(svg).toContain('id="head"');
		expect(svg).toContain('id="face"');
		expect(svg).toContain('id="facial-hair"');
		expect(svg).toContain('id="accessories"');
	});

	it("applies head-group offset for explaining body", async () => {
		const token = encodeToken({
			head: Head.HEAD_AFRO,
			body: Body.BODY_EXPLAINING,
		});
		const svg = await (await fetch(`/v1/${token}.svg`)).text();
		// Explaining body has head-group offset translate(0, 30)
		expect(svg).toContain('id="head-group" transform="translate(0, 30)"');
	});

	it("applies per-type head offset", async () => {
		const token = encodeToken({
			head: Head.HEAD_HIJAB,
			body: Body.BODY_HOODIE,
		});
		const svg = await (await fetch(`/v1/${token}.svg`)).text();
		// Hijab has offset (50, 20) from base (342, 190) = (392, 210)
		expect(svg).toContain('id="head" transform="translate(392, 210)"');
	});
});
