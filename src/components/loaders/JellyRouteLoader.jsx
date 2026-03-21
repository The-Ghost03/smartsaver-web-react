import { createElement } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  CircleDollarSign,
  Landmark,
  PiggyBank,
  Users,
  Wallet,
} from "lucide-react";
import logoImg from "@/assets/logo.png";

const FLOATERS = [
  {
    Icon: Wallet,
    className: "left-[5%] top-[14%] text-primary/18",
    iconClass: "size-11 max-md:size-9",
    x: [0, 70, 40, -25, 0],
    y: [0, -30, 38, 18, 0],
    duration: 44,
  },
  {
    Icon: PiggyBank,
    className: "right-[7%] top-[20%] text-primary/14",
    iconClass: "size-12 max-md:size-10",
    x: [0, -65, -25, 45, 0],
    y: [0, 35, -22, 28, 0],
    duration: 38,
  },
  {
    Icon: Users,
    className: "left-[42%] top-[8%] text-primary/12 max-md:left-[48%]",
    iconClass: "size-9 max-md:size-7",
    x: [0, -50, 28, 35, 0],
    y: [0, 45, 22, -30, 0],
    duration: 50,
  },
  {
    Icon: Landmark,
    className: "left-[10%] bottom-[16%] text-primary/14",
    iconClass: "size-10 max-md:size-8",
    x: [0, 55, -48, 25, 0],
    y: [0, 28, -35, -12, 0],
    duration: 42,
  },
  {
    Icon: CircleDollarSign,
    className: "right-[5%] bottom-[14%] text-primary/15",
    iconClass: "size-11 max-md:size-9",
    x: [0, -80, -35, 55, 0],
    y: [0, -22, 32, -18, 0],
    duration: 46,
  },
  {
    Icon: Banknote,
    className: "left-[48%] top-[38%] text-primary/10 max-md:hidden",
    iconClass: "size-9",
    x: [0, 40, -55, 12, 0],
    y: [0, -35, 18, 30, 0],
    duration: 48,
  },
];

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
        {FLOATERS.map((f, i) => (
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
