import { processNotifyPayload } from "./notify-api.mjs";

const MAX_BODY = 8 * 1024;

/**
 * Gère POST /api/avant-premiere directement dans Vite (dev + preview)
 * pour que `data/emails.json` et `data/phones.json` soient créés sans lancer le port 3001.
 */
function addNotifyMiddleware(server) {
  server.middlewares.use((req, res, next) => {
    const p = req.url?.split("?")[0] ?? "";
    if (p !== "/api/avant-premiere") {
      return next();
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      return res.end();
    }

    if (req.method !== "POST") {
      return next();
    }

    (async () => {
      if (!req.headers["content-type"]?.toLowerCase().includes("application/json")) {
        res.writeHead(415, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "unsupported_content_type" }));
      }
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > MAX_BODY) {
          res.writeHead(413, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "body_too_large" }));
        }
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString("utf8");
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "invalid_json" }));
      }
      const out = await processNotifyPayload(data);
      if (!out.ok) {
        res.writeHead(out.status, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: out.error }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ ok: true }));
    })().catch((err) => {
      console.error("[notify-api]", err);
      if (res.headersSent) return;
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "server" }));
    });
  });
}

export function notifyApiVitePlugin() {
  return {
    name: "notify-api-avant-premiere",
    configureServer(server) {
      addNotifyMiddleware(server);
    },
    configurePreviewServer(server) {
      addNotifyMiddleware(server);
    },
  };
}
