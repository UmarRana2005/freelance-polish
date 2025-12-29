const fs = require("fs");
const path = require("path");

async function main() {
  const p = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(p)) {
    console.error(".env.local not found");
    process.exit(1);
  }
  const txt = fs.readFileSync(p, "utf8");
  const m = txt.match(/GEMINI_API_KEY=(.*)/);
  if (!m) {
    console.error("GEMINI_API_KEY not found in .env.local");
    process.exit(1);
  }
  const key = m[1].trim();
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      { headers: { Authorization: `Bearer ${key}` } }
    );
    console.log("STATUS", res.status);
    const t = await res.text();
    console.log(t);
  } catch (e) {
    console.error("ERR", e && e.message ? e.message : e);
  }
}

main();
