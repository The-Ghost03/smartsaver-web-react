import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { scaleIn, viewportOnce } from "@/lib/motion-variants";

export function LegalDocumentLayout({ title, description, badge, children }) {
  const { t } = useTranslation();
  const resolvedBadge = badge === undefined ? t("documentBadge") : badge;
  return (
    <section className="relative border-b bg-background pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="fx-grid-light pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.article
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <header className="space-y-4 pb-10">
            {resolvedBadge ? (
              <Badge
                variant="outline"
                className="w-fit border-border/60 font-medium text-muted-foreground"
              >
                {resolvedBadge}
              </Badge>
            ) : null}
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}
          </header>
          <div className="text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:font-medium [&_strong]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:my-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
