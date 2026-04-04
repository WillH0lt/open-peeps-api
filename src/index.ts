import { compositeAvatar } from "./composite";
import { decodeToken } from "./token";

interface Env {
	CORS_ORIGINS?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		const allowedOrigin = getCorsOrigin(request, env.CORS_ORIGINS ?? "*");
		const corsHeaders: Record<string, string> = {
			"Access-Control-Allow-Origin": allowedOrigin,
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		if (request.method !== "GET") {
			return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
		}

		// Route: GET /v1/:token.svg (protobuf-encoded avatar config)
		const tokenMatch = path.match(/^\/v1\/(.+)\.svg$/);
		if (tokenMatch) {
			return handleSvgToken(tokenMatch[1], corsHeaders);
		}

		if (path === "/") {
			return jsonResponse(
				{
					name: "open-peeps-api",
					version: "1.0.0",
					endpoint: "/v1/:token.svg",
					proto: "See proto/avatar.proto for the schema",
				},
				200,
				corsHeaders,
			);
		}

		return jsonResponse({ error: "Not found" }, 404, corsHeaders);
	},
};

function handleSvgToken(token: string, corsHeaders: Record<string, string>): Response {
	const result = decodeToken(token);
	if (typeof result === "string") {
		return jsonResponse({ error: result }, 400, corsHeaders);
	}

	const svg = compositeAvatar(result.parts, result.colors);

	return new Response(svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=31536000, immutable",
			"Cache-Tag": "avatar-svg",
			...corsHeaders,
		},
	});
}

function getCorsOrigin(request: Request, corsOrigins: string): string {
	if (corsOrigins === "*") return "*";
	const origin = request.headers.get("Origin") ?? "";
	const allowed = corsOrigins.split(",").map((s) => s.trim());
	return allowed.includes(origin) ? origin : allowed[0];
}

function jsonResponse(
	data: unknown,
	status: number,
	corsHeaders: Record<string, string>,
	extraHeaders?: Record<string, string>,
): Response {
	return new Response(JSON.stringify(data, null, 2), {
		status,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders,
			...extraHeaders,
		},
	});
}
