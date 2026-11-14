import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import { ROUTES, SECTIONS } from "@/constants/routes";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitch } from "./LanguageSwitch";
import { SectionLink } from "./SectionLink";

/** Section active : la dernière dont le haut a dépassé la ligne sous le header */
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}

export default function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === ROUTES.HOME;

  const navItems = useMemo(
    () => [
      { id: SECTIONS.HOW, label: t("header.nav.how") },
      { id: SECTIONS.TONTINE, label: t("header.nav.tontine") },
      { id: SECTIONS.EPARGNE, label: t("header.nav.epargne") },
      { id: SECTIONS.REVIEWS, label: t("header.nav.temoignages") },
    ],
    [t],
  );
  const ids = useMemo(() => navItems.map((n) => n.id), [navItems]);
  const active = useActiveSection(ids, isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 shadow-[0_1px_0_rgb(14_23_51/0.02)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-18 lg:px-8">
        <Link
          to={ROUTES.HOME}
          className="shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={images.logo}
            alt="SmartSaver"
            className="h-9 w-auto md:h-11"
            width={150}
            height={36}
          />
        </Link>

        <nav
          aria-label={t("header.navLabel")}
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <SectionLink
                key={item.id}
                section={item.id}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-navy/[0.07] text-navy"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
              </SectionLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch className="hidden sm:inline-flex" />
          <SectionLink
            section={SECTIONS.DOWNLOAD}
            className="hidden h-10 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            {t("header.downloadApp")}
            <ArrowRight className="size-4" aria-hidden />
          </SectionLink>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label={t("header.openMenu")}
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,22rem)] gap-0 border-l border-border bg-background p-0"
            >
              <SheetHeader className="border-b border-border px-6 pb-5 pt-6">
                <SheetTitle className="font-heading text-xl">
                  {t("header.menuTitle")}
                </SheetTitle>
                <SheetDescription>{t("header.menuDescription")}</SheetDescription>
              </SheetHeader>

              <nav
                aria-label={t("header.navLabel")}
                className="flex flex-col px-3 py-4"
              >
                {navItems.map((item, i) => (
                  <SheetClose asChild key={item.id}>
                    <SectionLink
                      section={item.id}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3.5 font-heading text-lg font-medium transition-colors hover:bg-sand",
                        active === item.id ? "text-navy" : "text-foreground/80",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        0{i + 1}
                      </span>
                    </SectionLink>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-4 border-t border-border px-6 py-6">
                <LanguageSwitch />
                <SheetClose asChild>
                  <SectionLink
                    section={SECTIONS.DOWNLOAD}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy text-sm font-semibold text-white transition-colors hover:bg-ink"
                  >
                    {t("header.downloadApp")}
                    <ArrowRight className="size-4" aria-hidden />
                  </SectionLink>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
