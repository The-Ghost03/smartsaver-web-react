/**
 * API HTTP d’enregistrement (prod / dev:all en parallèle de Vite).
 * Démarrage : pnpm run api
 * En local simple : pnpm dev (API intégrée au serveur Vite) suffit.
 */
import http from "node:http";
import { ensureDataFiles, processNotifyPayload } from "./notify-api.mjs";

const PORT = Number(process.env.NOTIFY_PORT || 3001);
const MAX_BODY = 8 * 1024;

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

    const out = await processNotifyPayload(data);
    if (!out.ok) {
      return sendJson(res, out.status, { error: out.error }, true);
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
