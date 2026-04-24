import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className, layout = "horizontal" }) {
  const { t, i18n } = useTranslation();
  const id = useId();
  const isEn = i18n.language === "en";
  const isVertical = layout === "vertical";

  return (
    <div
      className={cn(
        isVertical
          ? "flex flex-col items-center gap-1.5"
          : "flex items-center gap-1.5 sm:gap-2",
        className
      )}
    >
      <span
        className={cn(
          "text-[0.65rem] font-semibold uppercase tracking-wider sm:text-xs",
          !isEn ? "text-foreground" : "text-muted-foreground"
        )}
        aria-hidden
      >
        {t("common.fr")}
      </span>
      <div
        className={cn(
          "flex items-center justify-center",
          isVertical && "py-0.5"
        )}
      >
        <Label htmlFor={id} className="sr-only">
          {t("common.languageSwitch")}
        </Label>
        <Switch
          id={id}
          checked={isEn}
          onCheckedChange={(on) => {
            void i18n.changeLanguage(on ? "en" : "fr");
          }}
        />
      </div>
      <span
        className={cn(
          "text-[0.65rem] font-semibold uppercase tracking-wider sm:text-xs",
          isEn ? "text-foreground" : "text-muted-foreground"
        )}
        aria-hidden
      >
        {t("common.en")}
      </span>
    </div>
  );
}
