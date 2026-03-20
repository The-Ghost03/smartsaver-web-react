import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Menu, PiggyBank, Quote, Users } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { fadeUp } from "@/lib/motion-variants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { sectionId: "tontine", href: "/#tontine", label: "Tontine", icon: Users },
  {
    sectionId: "epargne",
    href: "/#epargne",
    label: "Épargne",
    icon: PiggyBank,
  },
  {
    sectionId: "temoignages",
    href: "/#temoignages",
    label: "Témoignages",
    icon: Quote,
  },
];

/** Ligne de référence sous le header flottant (px depuis le haut du viewport) */
const SECTION_SPY_OFFSET_PX = 96;

const navLinkBaseClass =
  "group relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium outline-none transition-[color,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const navLinkInactiveClass =
  "text-foreground/70 hover:bg-primary/[0.07] hover:text-primary";

const navLinkActiveClass = "bg-primary/[0.1] text-primary";

const navLinkUnderline =
  "after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-(--accent) after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100";

const iconInactiveClass =
  "size-3.5 shrink-0 text-foreground/45 transition-colors duration-200 group-hover:text-(--accent)";

const iconActiveClass = "size-3.5 shrink-0 text-(--accent)";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  /** Incrémenté au scroll / resize / navigation pour recalculer la section active (DOM) */
  const [layoutTick, setLayoutTick] = useState(0);

  const isHome = location.pathname === ROUTES.HOME || location.pathname === "";

  const bumpLayout = useCallback(() => {
    setLayoutTick((n) => n + 1);
  }, []);

  const activeSectionId = useMemo(() => {
    void layoutTick;
    void location.pathname;
    void location.hash;
    if (!isHome || typeof document === "undefined") return null;
    let current = null;
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.sectionId);
      if (!el) continue;
      const { top } = el.getBoundingClientRect();
      if (top <= SECTION_SPY_OFFSET_PX) current = item.sectionId;
    }
    return current;
  }, [isHome, layoutTick, location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) bumpLayout();
    });
    const retryId = window.setTimeout(() => {
      if (!cancelled) bumpLayout();
    }, 150);
    window.addEventListener("scroll", bumpLayout, { passive: true });
    window.addEventListener("resize", bumpLayout);
    return () => {
      cancelled = true;
      window.clearTimeout(retryId);
      window.removeEventListener("scroll", bumpLayout);
      window.removeEventListener("resize", bumpLayout);
    };
  }, [isHome, bumpLayout, location.pathname, location.hash]);

  const links = (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = activeSectionId === item.sectionId;
        return (
          <a
            key={item.href}
            href={item.href}
            className={`${navLinkBaseClass} ${isActive ? navLinkActiveClass : navLinkInactiveClass} ${navLinkUnderline}`}
            aria-current={isActive ? "location" : undefined}
          >
            {createElement(item.icon, {
              className: isActive ? iconActiveClass : iconInactiveClass,
              strokeWidth: 2,
              "aria-hidden": true,
            })}
            {item.label}
          </a>
        );
      })}
    </>
  );

  return (
    <motion.header
      id="header"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed top-0 z-50 w-full pt-3 px-3 sm:pt-4 sm:px-4 lg:px-6"
    >
      <div
        className={`pointer-events-auto mx-auto flex h-12 w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-3 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 sm:gap-3 sm:px-4 md:h-14 md:px-5 ${
          scrolled
            ? "border-border/70 bg-background/85 shadow-md shadow-primary/6"
            : "border-border/40 bg-background/70 shadow-sm shadow-black/3"
        }`}
      >
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Link to={ROUTES.HOME} className="block">
            <img
              src="/src/assets/logo.png"
              alt="SmartSaver"
              className="h-8 w-auto md:h-11"
            />
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-2 lg:flex">{links}</nav>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSectionId === item.sectionId;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      asChild
                      className={`h-11 justify-start gap-2 rounded-xl px-3 transition-colors ${
                        isActive
                          ? "bg-primary/[0.1] text-primary hover:bg-primary/[0.12] hover:text-primary"
                          : "text-foreground/80 hover:bg-primary/[0.08] hover:text-primary"
                      }`}
                    >
                      <a
                        href={item.href}
                        className="gap-2"
                        aria-current={isActive ? "location" : undefined}
                      >
                        {createElement(item.icon, {
                          className: isActive
                            ? "size-4 shrink-0 text-(--accent)"
                            : "size-4 shrink-0 text-muted-foreground",
                          strokeWidth: 2,
                          "aria-hidden": true,
                        })}
                        {item.label}
                      </a>
                    </Button>
                  );
                })}
                <Separator className="my-4" />
                <Button
                  asChild
                  className="rounded-full bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent-hover)]"
                >
                  <a href="/#download">
                    <Download className="size-4" />
                    Télécharger
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              size="sm"
              className="hidden h-8 rounded-full bg-[var(--accent)] text-[var(--primary)] transition-[background-color,box-shadow] duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_20px_-6px_rgba(247,183,49,0.45)] sm:inline-flex"
            >
              <a href="/#download" className="gap-2">
                <Download className="size-4" />
                <span className="hidden md:inline">Télécharger l&apos;app</span>
                <span className="md:hidden">App</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
