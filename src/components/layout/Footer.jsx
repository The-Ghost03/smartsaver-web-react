import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="border-t border-[#eaeaea] bg-[var(--bg-light)] px-[5%] pb-8 pt-20">
      <div className="mb-16 flex flex-wrap items-start justify-between gap-8 max-lg:flex-col max-lg:items-center max-lg:text-center">
        <div className="flex min-w-[250px] max-w-[350px] flex-1 flex-col max-lg:items-center">
          <img
            src="/src/assets/logo.png"
            alt="SmartSaver Logo"
            className="mb-6 h-[70px] w-fit"
          />
          <p className="text-base text-[color:var(--text-muted)]">
            La plateforme intelligente pour gérer vos tontines et vos épargnes
            en toute simplicité.
          </p>
        </div>

        <div className="flex min-w-[250px] flex-1 flex-col items-center text-center">
          <h4 className="mb-6 text-xl font-bold text-[var(--primary)]">
            Contactez-nous
          </h4>
          <ul className="flex list-none flex-col items-center">
            <li className="mb-4 flex items-center gap-3 text-[color:var(--text-muted)]">
              <span className="flex text-[var(--accent)] [&_svg]:stroke-[var(--accent)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <a
                href="mailto:info@smartsaver.ci"
                className="font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                info@smartsaver.ci
              </a>
            </li>
            <li className="mb-4 flex items-center gap-3 text-[color:var(--text-muted)]">
              <span className="flex text-[var(--accent)] [&_svg]:stroke-[var(--accent)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <a
                href="tel:+2250153333076"
                className="font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                +225 01 53 33 30 76
              </a>
            </li>
            <li className="mb-4 flex items-center gap-3 text-[color:var(--text-muted)]">
              <span className="flex text-[var(--accent)] [&_svg]:stroke-[var(--accent)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <span>Abidjan, Côte d&apos;Ivoire</span>
            </li>
          </ul>
        </div>

        <div className="flex min-w-[250px] flex-1 flex-col items-end text-right max-lg:items-center max-lg:text-center">
          <h4 className="mb-6 text-xl font-bold text-[var(--primary)]">
            Informations Légales
          </h4>
          <ul className="flex list-none flex-col">
            <li className="mb-4">
              <Link
                to={ROUTES.CGU}
                onClick={scrollToTop}
                className="font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                Conditions Générales d&apos;Utilisation
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to={ROUTES.PRIVACY}
                onClick={scrollToTop}
                className="font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to={ROUTES.LEGAL}
                onClick={scrollToTop}
                className="font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                Mentions Légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between gap-4 border-t border-[#ddd] pt-8 text-sm text-[color:var(--text-muted)] max-md:flex-col max-md:items-center max-md:text-center">
        <div>Copyright &copy; 2026 Tous droits réservés | SmartSaver</div>
        <div>
          Designed by{" "}
          <a href="#">
            <em>Softskills</em>
          </a>
        </div>
      </div>
    </footer>
  );
}
