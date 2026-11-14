import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PAGE_NARROW } from "@/constants/layout";
import { fadeUp } from "@/lib/motion-variants";

export function LegalDocumentLayout({ title, description, badge, children }) {
  const { t } = useTranslation();
  const resolvedBadge = badge === undefined ? t("documentBadge") : badge;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          className="ss-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_20%,black,transparent)]"
          aria-hidden
        />
        <motion.header
          className={`relative ${PAGE_NARROW} space-y-5`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("notFound.home")}
          </Link>
          {resolvedBadge ? <p className="ss-eyebrow">{resolvedBadge}</p> : null}
          <h1 className="text-4xl md:text-5xl">{title}</h1>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </motion.header>
      </section>

      <section className="bg-card py-12 md:py-16">
        <div
          className={`${PAGE_NARROW} text-[0.9375rem] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2:first-child]:mt-0 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground`}
        >
          {children}
        </div>
      </section>
    </>
  );
}
