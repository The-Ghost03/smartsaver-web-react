import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <img
            src="/src/assets/logo.png"
            alt="SmartSaver Logo"
            className="logo-img-footer"
          />
          <p>
            La plateforme intelligente pour gérer vos tontines et vos épargnes
            en toute simplicité.
          </p>
        </div>

        <div className="footer-contact">
          <h4>Contactez-nous</h4>
          <ul>
            <li>
              <span className="icon">
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
              <a href="mailto:info@smartsaver.ci">info@smartsaver.ci</a>
            </li>
            <li>
              <span className="icon">
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
              <a href="tel:+2250153333076">+225 01 53 33 30 76</a>
            </li>
            <li>
              <span className="icon">
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

        <div className="footer-links">
          <h4>Informations Légales</h4>
          <ul>
            <li>
              <Link to={ROUTES.CGU} onClick={scrollToTop}>
                Conditions Générales d&apos;Utilisation
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PRIVACY} onClick={scrollToTop}>
                Politique de Confidentialité
              </Link>
            </li>
            <li>
              <Link to={ROUTES.LEGAL} onClick={scrollToTop}>
                Mentions Légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-left">
          Copyright &copy; 2026 Tous droits réservés | SmartSaver
        </div>
        <div className="footer-right">
          Designed by{" "}
          <a href="#">
            <em>Softskills</em>
          </a>
        </div>
      </div>
    </footer>
  );
}
