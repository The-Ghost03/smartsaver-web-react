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
    <header
      id="header"
      className={`fixed top-0 z-[1000] flex w-full items-center justify-between bg-[var(--bg-white)] px-[5%] py-4 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.05)]" : ""
      }`}
    >
      <Link to={ROUTES.HOME} className="block">
        <img
          src="/src/assets/logo.png"
          alt="SmartSaver Logo"
          className="block h-[45px] w-auto"
        />
      </Link>
      <nav className="hidden gap-10 lg:flex">
        <a
          href="/#tontine"
          className="relative font-semibold text-[color:var(--text-main)] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"
        >
          Tontine
        </a>
        <a
          href="/#epargne"
          className="relative font-semibold text-[color:var(--text-main)] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"
        >
          Épargne
        </a>
        <a
          href="/#temoignages"
          className="relative font-semibold text-[color:var(--text-main)] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"
        >
          Témoignages
        </a>
      </nav>
      <a
        href="/#download"
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-semibold text-[var(--primary)] shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent-hover)] hover:shadow-[0_10px_20px_rgba(247,183,49,0.3)]"
      >
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
        <span>Télécharger l&apos;App</span>
      </a>
    </header>
  );
}
