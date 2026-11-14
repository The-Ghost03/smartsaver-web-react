/**
 * URL publique du site (SEO, canonical, Open Graph, sitemap).
 * Surchargable : VITE_SITE_URL=https://smartsaver.ci
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://smartsaver.ci"
).replace(/\/$/, "");

export function absoluteUrl(pathname) {
  if (!pathname || pathname === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/**
 * Liens de téléchargement de l’application (fichier .env) :
 *   VITE_APP_STORE_URL=https://apps.apple.com/...
 *   VITE_ANDROID_URL=https://play.google.com/... (ou lien vers l’APK)
 * Un lien vide affiche le bouton en « Bientôt disponible ».
 */
export const STORE_LINKS = {
  ios: import.meta.env.VITE_APP_STORE_URL || "",
  android: import.meta.env.VITE_ANDROID_URL || "",
};

export const CONTACT = {
  email: "info@smartsaver.ci",
  phone: "+2250153333076",
  phoneLabel: "+225 01 53 33 30 76",
};
