import androidApkUrl from "@/assets/smart_sever_version_1.9.0+28.apk?url";

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
 * Liens de téléchargement de l’application :
 *   VITE_APP_STORE_URL=https://apps.apple.com/...
 *   VITE_ANDROID_URL=https://play.google.com/... (remplace l’APK embarqué)
 * Sans VITE_ANDROID_URL, Android pointe vers l’APK de src/assets.
 * Un lien vide affiche le bouton en « Bientôt disponible ».
 */
export const STORE_LINKS = {
  ios: import.meta.env.VITE_APP_STORE_URL || "",
  android: import.meta.env.VITE_ANDROID_URL || androidApkUrl,
};

/** Nom proposé au téléchargement quand Android pointe vers l’APK embarqué */
export const ANDROID_APK_FILENAME = import.meta.env.VITE_ANDROID_URL
  ? null
  : "SmartSaver-1.9.0.apk";

export const CONTACT = {
  email: "info@smartsaver.ci",
  phone: "+2250153333076",
  phoneLabel: "+225 01 53 33 30 76",
};
