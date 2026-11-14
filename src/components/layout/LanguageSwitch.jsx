import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const LANGS = [
  { code: "fr", short: "common.frShort", long: "common.fr" },
  { code: "en", short: "common.enShort", long: "common.en" },
];

/** Bascule FR / EN compacte */
export function LanguageSwitch({ className }) {
  const { t, i18n } = useTranslation();
  const current = i18n.language === "en" ? "en" : "fr";

  return (
    <div
      role="group"
      aria-label={t("common.languageSwitch")}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card p-0.5",
        className,
      )}
    >
      {LANGS.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            aria-pressed={active}
            title={t(lang.long)}
            onClick={() => void i18n.changeLanguage(lang.code)}
            className={cn(
              "h-7 min-w-9 cursor-pointer rounded-full px-2 text-xs font-semibold tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-navy text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="sr-only">{t(lang.long)}</span>
            <span aria-hidden>{t(lang.short)}</span>
          </button>
        );
      })}
    </div>
  );
}
