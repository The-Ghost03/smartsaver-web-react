import { useTranslation } from "react-i18next";
import { images } from "@/lib/images";

/** Écran de chargement des routes (Suspense / lazy) */
export function RouteLoader() {
  const { t } = useTranslation();
  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 bg-background px-4"
      role="status"
      aria-live="polite"
      aria-label={t("common.pageLoadingAria")}
    >
      <img
        src={images.logo}
        alt=""
        className="h-9 w-auto"
        width={150}
        height={36}
        decoding="async"
      />
      <div className="ss-loader" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <span className="sr-only">{t("common.pageLoading")}</span>
    </div>
  );
}
