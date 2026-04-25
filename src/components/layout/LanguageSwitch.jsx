import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

function LangOption({ active, shortLabel, longLabel, onSelect, vertical }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={longLabel}
      title={longLabel}
      onClick={onSelect}
      className={cn(
        "relative flex h-9 flex-1 items-center justify-center rounded-xl px-2 outline-none sm:h-10",
        "font-heading text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.72rem]",
        "transition-[color] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        vertical ? "w-full min-w-[2.75rem]" : "min-w-[3rem]",
        active ? "text-foreground" : "text-foreground/55 hover:text-foreground/85",
      )}
    >
      {active ? (
        <motion.div
          layoutId="ss-lang-pill"
          className="absolute inset-0 rounded-[11px] bg-background shadow-[0_3px_10px_-4px_rgba(15,31,61,0.2)] ring-1 ring-foreground/[0.12] dark:bg-card dark:shadow-[0_2px_14px_-4px_rgba(0,0,0,0.45)] dark:ring-white/[0.14]"
          transition={{ type: "spring", stiffness: 480, damping: 35 }}
        />
      ) : null}
      <span className="relative z-10 tabular-nums">{shortLabel}</span>
    </button>
  );
}

export function LanguageSwitch({ className, layout = "horizontal" }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const vertical = layout === "vertical";

  return (
    <div
      role="group"
      aria-label={t("common.languageSwitch")}
      className={cn(
        "flex gap-1 rounded-[14px] bg-foreground/[0.05] p-1 ring-1 ring-inset ring-foreground/[0.12] dark:bg-muted/25 dark:ring-white/[0.1]",
        vertical ? "flex-col" : "flex-row items-stretch",
        className,
      )}
    >
      <LangOption
        active={!isEn}
        shortLabel={t("common.frShort")}
        longLabel={t("common.fr")}
        vertical={vertical}
        onSelect={() => void i18n.changeLanguage("fr")}
      />
      <LangOption
        active={isEn}
        shortLabel={t("common.enShort")}
        longLabel={t("common.en")}
        vertical={vertical}
        onSelect={() => void i18n.changeLanguage("en")}
      />
    </div>
  );
}
