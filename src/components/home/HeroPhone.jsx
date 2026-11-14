import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, CalendarDays, Check, Users } from "lucide-react";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion-variants";

/** Durée d’affichage de chaque étape (ms) */
const STEP_MS = 5000;

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/70 py-2.5 text-[0.8rem]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function ScreenPay() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs text-muted-foreground">{t("home.hero.screens.week")}</p>
      <p className="mt-1 font-heading text-4xl font-bold tracking-tight">5&nbsp;000 F</p>
      <div className="mt-5">
        <Row label={t("home.hero.screens.due")} value={t("home.tontine.nextDate")} />
        <Row label={t("home.hero.screens.members")} value="10" />
        <Row label={t("home.tontine.cycle")} value={t("home.tontine.cycleVal")} />
      </div>
      <div className="mt-auto rounded-xl bg-saffron py-3 text-center text-sm font-semibold text-navy">
        {t("home.hero.screens.pay")}
      </div>
    </div>
  );
}

function ScreenTrack() {
  const { t } = useTranslation();
  const members = [
    { rank: 1, name: "Awa D.", status: "received" },
    { rank: 2, name: "Kouamé Y.", status: "current" },
    { rank: 3, name: "Marc E.", status: "upcoming" },
    { rank: 4, name: "Fatou K.", status: "upcoming" },
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs text-muted-foreground">{t("home.tontine.orderTitle")}</p>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full", i < 3 ? "bg-saffron" : "bg-sand")}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {members.map((m, i) => (
          <motion.li
            key={m.rank}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.8rem]",
              m.status === "current" ? "bg-navy text-white" : "bg-paper",
            )}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, ease: EASE }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-[0.7rem] font-semibold",
                  m.status === "current" ? "bg-saffron text-navy" : "bg-sand text-muted-foreground",
                )}
              >
                {m.rank}
              </span>
              <span className="font-medium">{m.name}</span>
            </span>
            <span
              className={cn(
                "text-[0.7rem] font-semibold",
                m.status === "received" && "text-success",
                m.status === "upcoming" && "text-muted-foreground",
              )}
            >
              {m.status === "received"
                ? t("home.tontine.received")
                : m.status === "current"
                  ? t("home.tontine.inProgress")
                  : t("home.tontine.upcoming")}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ScreenReceive() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="relative flex size-20 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-success/15"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.25, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.span
          className="relative flex size-14 items-center justify-center rounded-full bg-success text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 }}
        >
          <Check className="size-7" strokeWidth={3} aria-hidden />
        </motion.span>
      </span>
      <p className="mt-5 text-sm text-muted-foreground">{t("home.hero.screens.received")}</p>
      <p className="mt-1 font-heading text-4xl font-bold tracking-tight text-navy">
        +50&nbsp;000 F
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("home.tontine.cycle")} {t("home.tontine.cycleVal")}
      </p>
      <div className="mt-8 flex w-full items-center gap-2.5 rounded-xl bg-paper px-3 py-2.5 text-left text-[0.75rem]">
        <Bell className="size-4 shrink-0 text-navy" aria-hidden />
        {t("home.hero.screens.notified")}
      </div>
    </div>
  );
}

const SCREENS = [ScreenPay, ScreenTrack, ScreenReceive];
const STEP_ICONS = [CalendarDays, Users, Check];

/**
 * Téléphone du hero : stepper 3 étapes à progression automatique,
 * l’écran change à chaque étape. Cliquer une étape y saute directement.
 */
export function HeroPhone() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const labels = [t("home.hero.steps.s1"), t("home.hero.steps.s2"), t("home.hero.steps.s3")];

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % 3), STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, reduce]);

  const Screen = SCREENS[step];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Stepper */}
      <div className="mb-8 grid grid-cols-3 gap-3" role="tablist" aria-label={t("home.hero.steps.label")}>
        {labels.map((label, i) => {
          const Icon = STEP_ICONS[i];
          const done = i < step;
          const active = i === step;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setStep(i)}
              className="group cursor-pointer text-left outline-none"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-border">
                {active ? (
                  <motion.span
                    key={`fill-${step}`}
                    className="block h-full origin-left rounded-full bg-navy"
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                ) : (
                  <span
                    className={cn(
                      "block h-full origin-left rounded-full bg-navy/40 transition-transform duration-300",
                      done ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                )}
              </span>
              <span
                className={cn(
                  "mt-2.5 flex items-center gap-1.5 text-xs font-medium transition-colors group-focus-visible:underline",
                  active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                {i + 1}. {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-saffron/25 blur-3xl"
        aria-hidden
      />

      {/* Téléphone */}
      <motion.div
        className="relative mx-auto w-[16.5rem] sm:w-[17.5rem]"
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        aria-hidden
      >
        <div className="relative aspect-[9/18.5] rounded-[2.75rem] border-[10px] border-ink bg-white shadow-[0_50px_90px_-35px_rgb(14_23_51/0.55)]">
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
          <div className="flex h-full flex-col overflow-hidden rounded-[2rem] px-5 pb-6 pt-12">
            <div className="mb-5 flex items-center justify-between">
              <img src={images.logo} alt="" className="h-5 w-auto" />
              <span className="rounded-md bg-saffron-soft px-2 py-0.5 text-[0.65rem] font-semibold text-navy">
                {t("home.tontine.cardTitle")}
              </span>
            </div>
            <div className="relative flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
