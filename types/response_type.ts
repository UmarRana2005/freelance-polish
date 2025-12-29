// Types for Context Engineering API responses

export type Mode = "reply" | "understand";

export interface Analysis {
  current_tone: string;
  problem: string;
  fix: string;
}

export interface OptionItem {
  style: string;
  msg: string;
  exp_ur: string;
}

export interface ReplyResponse {
  mode: "reply";
  analysis: Analysis;
  options: OptionItem[];
}

// Also include the "understand" shape for completeness
export interface UnderstandResponse {
  mode: "understand";
  trans_ur: string;
  trans_roman: string;
  client_mood: string[];
  meaning_roman: string;
}

export type ContextEngineResponse = ReplyResponse | UnderstandResponse;

// Type guard helpers
export function isReplyResponse(x: unknown): x is ReplyResponse {
  if (typeof x !== "object" || x === null) return false;
  const r = x as Record<string, unknown>;
  return (
    r.mode === "reply" &&
    typeof r.analysis === "object" &&
    Array.isArray(r.options)
  );
}

export function isUnderstandResponse(x: unknown): x is UnderstandResponse {
  if (typeof x !== "object" || x === null) return false;
  const r = x as Record<string, unknown>;
  return (
    r.mode === "understand" &&
    typeof r.trans_ur === "string" &&
    typeof r.trans_roman === "string"
  );
}

/**
 * Safely parse an unknown API response into one of the known response shapes.
 * Returns the narrowed object or `null` if the payload doesn't match.
 */
export function parseContextEngineResponse(
  x: unknown
): ContextEngineResponse | null {
  if (isReplyResponse(x)) return x;
  if (isUnderstandResponse(x)) return x;
  return null;
}

/**
 * Assert that the value is a valid response and return it typed, or throw.
 * Useful when you want a hard failure for invalid payloads.
 */
export function assertContextEngineResponse(x: unknown): ContextEngineResponse {
  const parsed = parseContextEngineResponse(x);
  if (!parsed) {
    throw new Error("Invalid ContextEngineResponse payload");
  }
  return parsed;
}
