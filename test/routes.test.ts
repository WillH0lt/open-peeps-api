import { exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";

const fetch = (path: string) => exports.default.fetch(new Request(`http://localhost${path}`));

describe("root", () => {
	it("returns API info", async () => {
		const res = await fetch("/");
		expect(res.status).toBe(200);
		const json = await res.json();
		expect(json.name).toBe("open-peeps-api");
		expect(json.endpoints.avatar).toBe("/v1/:token.svg");
	});
});

describe("404", () => {
	it("returns not found for unknown routes", async () => {
		const res = await fetch("/unknown");
		expect(res.status).toBe(404);
	});
});

describe("CORS", () => {
	it("includes CORS headers on responses", async () => {
		const res = await fetch("/");
		expect(res.headers.get("access-control-allow-origin")).toBe("*");
	});

	it("handles OPTIONS preflight", async () => {
		const res = await exports.default.fetch(new Request("http://localhost/", { method: "OPTIONS" }));
		expect(res.status).toBe(204);
		expect(res.headers.get("access-control-allow-methods")).toContain("GET");
	});

	it("rejects non-GET methods", async () => {
		const res = await exports.default.fetch(new Request("http://localhost/", { method: "POST" }));
		expect(res.status).toBe(405);
	});
});
