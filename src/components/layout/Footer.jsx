import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PAGE_WIDE } from "@/constants/layout";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion-variants";
import { Separator } from "@/components/ui/separator";
import { images } from "@/lib/images";

function legalNavClassName({ isActive }) {
  return cn(
    "inline-flex items-center gap-1.5 text-sm transition-colors",
    isActive
      ? "font-medium text-primary"
      : "text-muted-foreground hover:text-foreground",
  );
}

function LegalNavLink({ to, onClick, children }) {
  return (
    <NavLink to={to} onClick={onClick} className={legalNavClassName}>
      {({ isActive }) => (
        <>
          {isActive ? (
            <ChevronRight
              className="size-3.5 shrink-0 text-(--accent)"
              strokeWidth={2.25}
              aria-hidden
            />
          ) : null}
          {children}
        </>
      )}
    </NavLink>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <motion.footer
      className="relative z-10 border-t bg-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(26,42,92,0.04),transparent)]" />
      <div className={`relative z-10 ${PAGE_WIDE} py-14 md:py-16`}>
        <motion.div
          className="grid gap-12 md:grid-cols-3 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="space-y-4" variants={fadeUp}>
            <a href="/">
              <img src={images.logo} alt="SmartSaver" className="h-16 w-fit" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.blurb")}
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeUp}>
            <h4 className="text-sm font-semibold text-foreground">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[var(--accent)]" />
                <a
                  href="mailto:info@smartsaver.ci"
                  className="transition-colors hover:text-foreground"
                >
                  info@smartsaver.ci
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[var(--accent)]" />
                <a
                  href="tel:+2250153333076"
                  className="transition-colors hover:text-foreground"
                >
                  +225 01 53 33 30 76
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-[var(--accent)]" />
                <span>{t("footer.location")}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="space-y-4 md:text-right" variants={fadeUp}>
            <h4 className="text-sm font-semibold text-foreground">
              {t("footer.legal")}
            </h4>
            <ul className="flex flex-col gap-2 text-sm md:items-end">
              <li>
                <LegalNavLink to={ROUTES.CGU} onClick={scrollToTop}>
                  {t("footer.cgu")}
                </LegalNavLink>
              </li>
              <li>
                <LegalNavLink to={ROUTES.PRIVACY} onClick={scrollToTop}>
                  {t("footer.privacy")}
                </LegalNavLink>
              </li>
              <li>
                <LegalNavLink to={ROUTES.LEGAL} onClick={scrollToTop}>
                  {t("footer.mentions")}
                </LegalNavLink>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <Separator className="my-10" />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left"
        >
          <p>{t("footer.copyright")}</p>
          <p>
            {t("footer.designBy")}{" "}
            <a
              href="https://softskills.ci/"
              className="underline-offset-4 hover:underline"
            >
              Softskills
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
