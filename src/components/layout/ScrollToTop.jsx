import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remonte le scroll en tête de document à chaque changement de route
 * (sans réagir au seul #hash, pour conserver l’ancrage in-page sur l’accueil).
 */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "instant" });
  }, [pathname, search]);

  return null;
}
