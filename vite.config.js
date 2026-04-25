import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { notifyApiVitePlugin } from "./server/vite-notify-plugin.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
// En dev / preview : POST /api/avant-premiere est géré ici (data/*.json). Plus besoin du port 3001.
// En prod : reverse-proxy /api → `node server/notify-server.mjs` ou autre hébergeur.
export default defineConfig({
  plugins: [react(), tailwindcss(), notifyApiVitePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
