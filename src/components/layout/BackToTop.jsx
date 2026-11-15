import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 600;

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={t("backToTop.aria")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-4 z-40 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-navy shadow-lg shadow-ink/10 transition-colors hover:bg-navy hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-8 md:right-8"
        >
          <ArrowUp className="size-5" strokeWidth={2.25} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
