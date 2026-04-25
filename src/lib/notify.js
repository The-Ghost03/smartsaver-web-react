/**
 * Base URL de l’API (optionnel). Ex. prod : VITE_API_BASE_URL=https://ton-domaine.com
 * Si absent : `fetch("/api/avant-premiere")` — en local, le plugin Vite écrit dans `data/`;
 * en production, Nginx (ou autre) doit rediriger /api vers `node server/notify-server.mjs`.
 * Si tu définis VITE_API_BASE_URL, les fichiers JSON ne sont plus créés sur ta machine
 * (la requête part vers ce domaine).
 */
export function getAvantPremiereNotifyUrl() {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (base && String(base).trim()) {
    return `${String(base).replace(/\/$/, "")}/api/avant-premiere`;
  }
  return "/api/avant-premiere";
}
