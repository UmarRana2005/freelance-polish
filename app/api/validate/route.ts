import { NextResponse } from "next/server";

async function listModels(apiKey?: string) {
  if (!apiKey) throw new Error("No API key provided");
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`List models failed: ${res.status} ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text };
  }
}

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "GEMINI_API_KEY is not set" },
        { status: 400 }
      );
    }

    const list = await listModels(apiKey);
    return NextResponse.json({ ok: true, list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}
