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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeftIcon } from "../ui/align-left";

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
                variant="outline"
                size="icon-sm"
                className="border-border/60 bg-background/80 lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <AlignLeftIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton
              className="gap-0 border-l border-border/50 bg-linear-to-b from-background via-background to-muted/35 p-0 shadow-2xl shadow-primary/10 sm:max-w-[22rem] rounded-l-3xl"
            >
              <div className="h-1 w-full shrink-0" aria-hidden />
              <SheetHeader className="space-y-1.5 border-b border-border/50 px-5 pb-4 pt-5 pr-14">
                <SheetTitle className="font-heading text-xl font-semibold tracking-tight">
                  Menu
                </SheetTitle>
                <SheetDescription className="text-[0.8125rem] leading-relaxed">
                  Accédez aux sections et téléchargez l’application.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSectionId === item.sectionId;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      asChild
                      className={`h-auto min-h-12 justify-start gap-3 rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] ${
                        isActive
                          ? "border-(--accent)/30 bg-primary/[0.08] text-primary shadow-sm shadow-primary/5 hover:bg-primary/[0.1] hover:text-primary"
                          : "border-border/40 bg-card/40 text-foreground/85 hover:border-border hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <a
                        href={item.href}
                        className="flex w-full items-center gap-3"
                        aria-current={isActive ? "location" : undefined}
                      >
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                            isActive
                              ? "bg-(--accent)/20 text-(--accent)"
                              : "bg-muted/80 text-muted-foreground"
                          }`}
                        >
                          {createElement(item.icon, {
                            className: "size-[1.125rem]",
                            strokeWidth: 2,
                            "aria-hidden": true,
                          })}
                        </span>
                        <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
                          {item.label}
                        </span>
                      </a>
                    </Button>
                  );
                })}
              </nav>

              <SheetFooter className="mt-auto gap-3 border-t border-border/50 bg-muted/25 px-4 py-5">
                <p className="text-center text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                  Application mobile
                </p>
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full bg-[var(--accent)] text-[var(--primary)] shadow-[0_0_24px_-8px_var(--accent)] transition-[background-color,box-shadow,filter] duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_32px_-6px_rgba(247,183,49,0.45)] hover:brightness-[1.03] hover:text-[var(--accent)]"
                >
                  <a href="/#download" className="gap-2">
                    <Download className="size-4 shrink-0" />
                    Télécharger l&apos;app
                  </a>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              size="sm"
              className="hidden h-8 rounded-full bg-[var(--accent)] text-[var(--primary)] transition-[background-color,box-shadow,filter] duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_20px_-6px_rgba(247,183,49,0.45)] hover:brightness-[1.03] sm:inline-flex hover:text-[var(--accent)]"
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
