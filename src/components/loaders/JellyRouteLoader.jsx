import { createElement } from "react";
import { motion } from "framer-motion";
import { jellyRouteFloaters } from "@/constants/marketing-floaters";
import logoImg from "@/assets/logo.png";

/**
 * Loader « jelly ooze » pour Suspense (lazy routes).
 * Filtre SVG : id fixe — une seule instance visible à la fois.
 */
export function JellyRouteLoader() {
  return (
    <div
      className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-2 overflow-hidden bg-background px-4"
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(26,42,92,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_90%,rgba(247,183,49,0.07),transparent)]" />
        {jellyRouteFloaters.map((f, i) => (
          <motion.div
            key={`jelly-float-${i}`}
            className={`absolute ${f.className}`}
            initial={{ x: 0, y: 0 }}
            animate={{ x: f.x, y: f.y }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {createElement(f.Icon, {
              className: f.iconClass,
              strokeWidth: 1.15,
              "aria-hidden": true,
            })}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
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
    </div>
  );
}
