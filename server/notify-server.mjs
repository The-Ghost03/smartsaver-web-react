/**
 * Petit serveur d’enregistrement (emails + téléphones) pour l’avant-première.
 * Fichiers : data/emails.json, data/phones.json (lignes d’objets, dédup par valeur).
 *
 * Démarrage : pnpm run api
 * En dev : pnpm run dev:all (API + Vite) ou 2 terminaux.
 * En production : reverse-proxy /api → ce service (même hôte) ou le port indiqué.
 */
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const EMAILS_FILE = path.join(DATA_DIR, "emails.json");
const PHONES_FILE = path.join(DATA_DIR, "phones.json");

const PORT = Number(process.env.NOTIFY_PORT || 3001);
const MAX_BODY = 8 * 1024;

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  for (const f of [EMAILS_FILE, PHONES_FILE]) {
    try {
      await fs.access(f);
    } catch {
      await fs.writeFile(f, "[]\n", "utf8");
    }
  }
}

async function readJsonList(file) {
  const raw = await fs.readFile(file, "utf8");
  const p = JSON.parse(raw);
  return Array.isArray(p) ? p : [];
}

async function writeJsonList(file, list) {
  await fs.writeFile(file, `${JSON.stringify(list, null, 2)}\n`, "utf8");
}

function sendJson(res, status, body, cors) {
  const h = { "Content-Type": "application/json; charset=utf-8" };
  if (cors) {
    h["Access-Control-Allow-Origin"] = "*";
    h["Access-Control-Allow-Headers"] = "Content-Type";
  }
  res.writeHead(status, h);
  res.end(`${JSON.stringify(body)}\n`);
}

const server = http.createServer((req, res) => {
  (async () => {
    const acao = { "Access-Control-Allow-Origin": "*" };
    if (req.method === "OPTIONS" && req.url === "/api/avant-premiere") {
      res.writeHead(204, {
        ...acao,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      return res.end();
    }

    if (req.url !== "/api/avant-premiere" || req.method !== "POST") {
      res.writeHead(404);
      return res.end();
    }

    if (!req.headers["content-type"]?.toLowerCase().includes("application/json")) {
      return sendJson(res, 415, { error: "unsupported_content_type" }, true);
    }

    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_BODY) {
        return sendJson(res, 413, { error: "body_too_large" }, true);
      }
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString("utf8");

    let data;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      return sendJson(res, 400, { error: "invalid_json" }, true);
    }

    const email = typeof data.email === "string" ? data.email.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.replace(/\s/g, "").trim() : "";

    if (!email && !phone) {
      return sendJson(res, 400, { error: "empty" }, true);
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendJson(res, 400, { error: "invalid_email" }, true);
    }
    if (phone && phone.length < 8) {
      return sendJson(res, 400, { error: "invalid_phone" }, true);
    }

    await ensureDataFiles();
    const at = new Date().toISOString();

    if (email) {
      const list = await readJsonList(EMAILS_FILE);
      if (!list.some((e) => e.email && e.email.toLowerCase() === email.toLowerCase())) {
        list.push({ email, at });
        await writeJsonList(EMAILS_FILE, list);
      }
    }
    if (phone) {
      const list = await readJsonList(PHONES_FILE);
      if (!list.some((e) => e.phone === phone)) {
        list.push({ phone, at });
        await writeJsonList(PHONES_FILE, list);
      }
    }

    return sendJson(res, 200, { ok: true }, true);
  })().catch((err) => {
    console.error(err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ error: "server" }));
  });
});

await ensureDataFiles();
server.listen(PORT, "127.0.0.1", () => {
  console.log(`[notify] http://127.0.0.1:${PORT}  -> data/emails.json, data/phones.json`);
});
