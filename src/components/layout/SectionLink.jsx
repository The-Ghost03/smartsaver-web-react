import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

/**
 * Lien vers une ancre de l’accueil : ancre native sur l’accueil,
 * navigation SPA vers « /#section » depuis les autres pages.
 */
export function SectionLink({ section, children, ...props }) {
  const { pathname } = useLocation();
  if (pathname === ROUTES.HOME) {
    return (
      <a href={`#${section}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={{ pathname: ROUTES.HOME, hash: `#${section}` }} {...props}>
      {children}
    </Link>
  );
}
