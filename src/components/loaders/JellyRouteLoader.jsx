import logoImg from "@/assets/logo.png";

/**
 * Loader « jelly ooze » pour Suspense (lazy routes).
 * Filtre SVG : id fixe — une seule instance visible à la fois.
 */
export function JellyRouteLoader() {
  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center justify-center gap-2 bg-background px-4"
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
    >
      <img
        src={logoImg}
        alt=""
        className="h-10 w-auto md:h-12"
        width={160}
        height={48}
        decoding="async"
      />
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="ss-jelly-ooze-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
      <div className="ss-jelly-loader">
        <div className="ss-jelly-loader__dot" />
        <div className="ss-jelly-loader__dot" />
        <div className="ss-jelly-loader__dot" />
        <div className="ss-jelly-loader__dot" />
        <div className="ss-jelly-loader__dot" />
      </div>
    </div>
  );
}
