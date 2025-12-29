import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import {
  parseContextEngineResponse,
  ContextEngineResponse,
} from "@/types/response_type";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_INSTRUCTION = `
You are an empathetic and professional Business Communication Coach for freelancers. 
Your users speak Roman Urdu, Urdu, or Broken English. 
Your goal is to help them communicate effectively with international clients.

Output Rule: You must output ONLY valid JSON. Do not add markdown formatting (like \`\`\`json) outside the structure.

---

### MODE 1: REPLY MODE (When the freelancer wants to send a message)
If the user provides a draft to send to a client, analyze it and return this JSON structure:

{
  "mode": "reply",
  "analysis": {
    "current_tone": "String (e.g., Too casual, Aggressive, Confused)",
    "problem": "String (Briefly explain what is wrong with their draft)",
    "fix": "String (How to correct it professionally)"
  },
  "options": [
    {
      "style": "String (e.g., Professional, Friendly, Firm)",
      "msg": "String (The English message to copy-paste)",
      "exp_ur": "String (Explanation in Roman Urdu why this option is good)"
    },
    {
      "style": "String",
      "msg": "String",
      "exp_ur": "String"
    },
    {
      "style": "String",
      "msg": "String",
      "exp_ur": "String"
    }
  ]
}

---

### MODE 2: UNDERSTAND MODE (Interpretation/Translation)
If the user provides a client's message to understand, interpret the hidden meaning/idioms and return this JSON structure:

{
  "mode": "understand",
  "trans_ur": "String (Urdu Script translation)",
  "trans_roman": "String (Roman Urdu translation)",
  "client_mood": ["String", "String"],
  "meaning_roman": "String (Deep explanation of context, idioms, or hidden sarcasm in Roman Urdu)"
}

---

### Guidelines:
1. Tone: Be encouraging but strict about business standards.
2. Language: Explanations (\`exp_ur\`, \`meaning_roman\`) should be in natural, conversational Roman Urdu.
3. Clarity: English options (\`msg\`) must be grammatically perfect and idiomatic.
`;

export async function POST(req: Request) {
  try {
    // Read raw body for robust parsing and debugging
    const bodyText = await req.text();
    console.log("/api/freelauncer_helper body:", bodyText);

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body", raw: bodyText },
        { status: 400 }
      );
    }

    const { message, mode } = parsedBody as {
      message: string;
      mode: "reply" | "understand";
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // Pick preferred model (allow override via env var); if unavailable we'll attempt a fallback.
    let chosenModelName = "gemini-3-flash-preview";
    console.log("Using model:", chosenModelName);
    let model = genAI.getGenerativeModel({
      model: chosenModelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Clear, strict prompt asking for JSON only matching the schema
    let prompt = "";

    if (mode === "reply") {
      prompt = `MODE: REPLY
The freelancer wants to say this to the client: "${message}"`;
    } else {
      prompt = `MODE: UNDERSTAND
The client sent this message: "${message}"`;
    }

    // Try generate, with a graceful fallback if model isn't available
    type GenModel = {
      generateContent: (
        prompt: string
      ) => Promise<{ response: { text: () => Promise<string> | string } }>;
    };

    let result: unknown;
    try {
      result = await (model as unknown as GenModel).generateContent(prompt);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      // If model not found for this API version, try a standard fallback
      if (errMsg.toLowerCase().includes("not found")) {
        console.warn(
          "Model not found for chosen model. Original error:",
          errMsg
        );

        // Try fallback model once
        try {
          chosenModelName = "text-bison-001";
          model = genAI.getGenerativeModel({
            model: chosenModelName,
            systemInstruction: SYSTEM_INSTRUCTION,
          });
          result = await (model as unknown as GenModel).generateContent(prompt);
        } catch {
          // If fallback also fails, fetch list of available models and attempt auto-discovery
          try {
            const apiKey = process.env.GEMINI_API_KEY;
            const listRes = await fetch(
              "https://generativelanguage.googleapis.com/v1/models",
              {
                headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
              }
            );
            const listText = await listRes.text();

            // Parse list and try a few candidate models heuristically
            try {
              const parsed = (() => {
                try {
                  return JSON.parse(listText) as unknown;
                } catch {
                  return null as null;
                }
              })();
              const parsedRec = parsed as Record<string, unknown> | null;
              const modelsArr: unknown[] = Array.isArray(parsedRec?.["models"])
                ? (parsedRec!["models"] as unknown[])
                : Array.isArray(parsedRec?.["model"])
                ? (parsedRec!["model"] as unknown[])
                : [];
              const names: string[] = modelsArr
                .map((m) => {
                  if (m && typeof m === "object") {
                    const rec = m as Record<string, unknown>;
                    return (rec.name || rec.model || rec.id) as
                      | string
                      | undefined;
                  }
                  return undefined;
                })
                .filter(Boolean) as string[];

              const candidates = names
                .filter((n) => /gemini|bison|text|chat/i.test(n))
                .slice(0, 5);

              for (const cand of candidates) {
                try {
                  console.log("Trying candidate model:", cand);
                  model = genAI.getGenerativeModel({
                    model: cand,
                    systemInstruction: SYSTEM_INSTRUCTION,
                  });
                  const r = await (
                    model as unknown as GenModel
                  ).generateContent(prompt);
                  // Success
                  result = r;
                  break;
                } catch {
                  // try next candidate
                  continue;
                }
              }

              if (!result) {
                throw new Error(
                  `Model not found and auto-discovery failed. Tried: ${candidates.join(
                    ","
                  )}. Full models list: ${listRes.status} ${listText}`
                );
              }
            } catch {
              throw new Error(
                `Model not found and fallback failed. Models list response: ${listRes.status} ${listText}`
              );
            }
          } catch (listErr: unknown) {
            const listMsg =
              listErr instanceof Error ? listErr.message : String(listErr);
            throw new Error(
              `Model not found and fallback failed. Unable to retrieve models list: ${listMsg}`
            );
          }
        }
      } else {
        throw err;
      }
    }

    const modelResp = (result as { response?: unknown }).response;
    let raw: string;
    if (
      modelResp &&
      typeof modelResp === "object" &&
      typeof (modelResp as { text?: unknown }).text === "function"
    ) {
      const t = (modelResp as { text: () => Promise<string> | string }).text();
      raw = typeof t === "string" ? t : await t;
    } else {
      raw = String(result);
    }

    // Try to parse JSON directly
    let parsed: ContextEngineResponse | null = null;

    try {
      const json = JSON.parse(raw);
      parsed = parseContextEngineResponse(json);
    } catch {
      // If direct parse failed, try to extract JSON substring from the response
      const match = raw.match(/\{[\s\S]*\}$/);
      if (match) {
        try {
          const json = JSON.parse(match[0]);
          parsed = parseContextEngineResponse(json);
        } catch (parseErr) {
          console.warn(
            "Failed to parse JSON substring from model output:",
            parseErr
          );
          parsed = null;
        }
      }
    }

    if (!parsed) {
      // Return raw text for debugging, but with 502 status
      return NextResponse.json(
        { error: "Model output couldn't be parsed as expected", raw },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    // Log error for debugging
    console.error("/api/freelauncer_helper error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: msg || "Failed to process" },
      { status: 500 }
    );
  }
}
