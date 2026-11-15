import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Sert les .apk avec le bon type MIME. Sans lui, le navigateur reconnaît
 * une archive ZIP (format interne de l’APK) et enregistre un fichier .zip.
 */
function apkMimeType() {
  const setHeader = (req, res, next) => {
    if (req.url && /\.apk(\?|$)/i.test(decodeURIComponent(req.url))) {
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      res.setHeader("Content-Disposition", 'attachment; filename="SmartSaver-1.9.0.apk"');
    }
    next();
  };
  return {
    name: "apk-mime-type",
    configureServer(server) {
      server.middlewares.use(setHeader);
    },
    configurePreviewServer(server) {
      server.middlewares.use(setHeader);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apkMimeType()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
