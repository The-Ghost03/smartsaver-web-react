import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <Link to={ROUTES.HOME} className="logo-link">
        <img
          src="/src/assets/logo.png"
          alt="SmartSaver Logo"
          className="logo-img"
        />
      </Link>
      <nav className="nav-links">
        <a href="/#tontine">Tontine</a>
        <a href="/#epargne">Épargne</a>
        <a href="/#temoignages">Témoignages</a>
      </nav>
      <a href="/#download" className="btn-primary btn-download-app">
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span className="btn-text">Télécharger l&apos;App</span>
      </a>
    </header>
  );
}
