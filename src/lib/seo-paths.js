import { ROUTES } from "@/constants/routes";

/**
 * @param {string} pathname
 * @returns {"home"|"avantPremiere"|"cgu"|"policy"|"legal"|"notFound"}
 */
export function pathnameToSeoKey(pathname) {
  if (pathname === ROUTES.HOME) return "home";
  if (pathname === ROUTES.AVANT_PREMIERE) return "avantPremiere";
  if (pathname === ROUTES.CGU) return "cgu";
  if (pathname === ROUTES.PRIVACY) return "policy";
  if (pathname === ROUTES.LEGAL) return "legal";
  return "notFound";
}
