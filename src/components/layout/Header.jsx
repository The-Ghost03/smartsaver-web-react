import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Menu } from "lucide-react";
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

const navLinkClass =
  "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <a href="/#tontine" className={navLinkClass}>
        Tontine
      </a>
      <a href="/#epargne" className={navLinkClass}>
        Épargne
      </a>
      <a href="/#temoignages" className={navLinkClass}>
        Témoignages
      </a>
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

        <nav className="hidden items-center gap-5 lg:flex">{links}</nav>

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
                <Button variant="ghost" asChild className="justify-start">
                  <a href="/#tontine">Tontine</a>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <a href="/#epargne">Épargne</a>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <a href="/#temoignages">Témoignages</a>
                </Button>
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
              className="hidden rounded-full bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent-hover)] sm:inline-flex h-8"
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
