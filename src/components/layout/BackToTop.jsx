import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Distance de défilement (px) avant d’afficher le bouton */
const SHOW_AFTER_PX = 480;

function scrollToTop() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

export function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    scrollToTop();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="pointer-events-none fixed bottom-6 right-4 z-40 md:bottom-8 md:right-8"
        >
          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={handleClick}
            className="pointer-events-auto relative h-12 w-12 rounded-full border border-(--accent)/40 bg-primary p-0 text-accent shadow-[0_10px_36px_-12px_rgba(26,42,92,0.55),0_0_0_1px_rgba(247,183,49,0.12),0_0_28px_-12px_rgba(247,183,49,0.2)] transition-[transform,box-shadow,background-color,border-color,color] duration-300 hover:border-(--accent)/70 hover:bg-(--primary-light) hover:text-accent hover:shadow-[0_16px_44px_-14px_rgba(26,42,92,0.5),0_0_40px_-10px_rgba(247,183,49,0.35)] focus-visible:ring-2 focus-visible:ring-(--accent)/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            aria-label={t("backToTop.aria")}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/12 to-transparent opacity-80"
              aria-hidden
            />
            <ArrowUp
              className="relative z-10 size-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              strokeWidth={2.5}
            />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
