/**
 * Base URL de l’API (optionnel). Ex. en prod : VITE_API_BASE_URL=https://ton-domaine.com
 * Si absent, requêtes same-origin : /api/avant-premiere (proxy Nginx → notify-server).
 */
export function getAvantPremiereNotifyUrl() {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (base && String(base).trim()) {
    return `${String(base).replace(/\/$/, "")}/api/avant-premiere`;
  }
  return "/api/avant-premiere";
}
