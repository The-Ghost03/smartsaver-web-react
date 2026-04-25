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
