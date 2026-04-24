import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Download,
  Quote,
  ShieldCheck,
  Smartphone,
  Star,
} from "lucide-react";
import { PAGE_WIDE } from "@/constants/layout";
import { ROUTES } from "@/constants/routes";
import { heroMarketingFloaters } from "@/constants/marketing-floaters";
import {
  fadeUp,
  listContainer,
  scaleIn,
  slideRight,
  stagger,
  viewportOnce,
} from "@/lib/motion-variants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function getOsCta(t) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return { text: t("home.download.android"), isIos: false };
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return { text: t("home.download.ios"), isIos: true };
  }
  return { text: t("home.download.default"), isIos: false };
}

function FeatureBullet({ children }) {
  return (
    <motion.li
      variants={fadeUp}
      className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
    >
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-[var(--primary)] shadow-[0_0_20px_-4px_var(--accent)]">
        ✓
      </span>
      <span>{children}</span>
    </motion.li>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  fallback,
  fallbackClass,
  starsLabel,
}) {
  return (
    <Card className="group relative flex h-full min-h-0 w-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card via-card to-muted/30 py-0 shadow-md shadow-primary/[0.04] ring-1 ring-primary/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-lg hover:shadow-primary/[0.08]">
      {/* Guillemet décoratif arrière-plan */}
      <Quote
        className="pointer-events-none absolute -right-3 top-4 size-[7.5rem] -rotate-6 text-primary/[0.06] transition-all duration-500 group-hover:scale-105 group-hover:text-primary/[0.09]"
        strokeWidth={1}
        aria-hidden
      />
      <CardContent className="relative z-10 flex min-h-0 flex-1 flex-col gap-5 p-6 md:gap-6 md:p-8">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div
            className="flex gap-0.5 text-[var(--accent)]"
            role="img"
            aria-label={starsLabel}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={`star-${name}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 400,
                }}
              >
                <Star
                  className="size-4 fill-current drop-shadow-[0_0_8px_rgba(247,183,49,0.35)]"
                  aria-hidden
                />
              </motion.span>
            ))}
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] shadow-inner ring-1 ring-[var(--accent)]/25">
            <Quote className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
        </div>

        <blockquote className="flex min-h-0 flex-1 gap-3.5">
          <Quote
            className="mt-0.5 size-5 shrink-0 text-[var(--accent)]"
            strokeWidth={2.25}
            aria-hidden
          />
          <p className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-foreground/90 md:text-base">
            {quote}
          </p>
        </blockquote>

        <div className="mt-auto flex shrink-0 items-center gap-4 border-t border-border/60 pt-5">
          <Avatar
            size="lg"
            className="ring-2 ring-background ring-offset-2 ring-offset-card"
          >
            <AvatarFallback
              className={`text-sm font-semibold text-white ${fallbackClass}`}
            >
              {fallback}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const osData = useMemo(() => getOsCta(t), [t]);
  const testimonials = useMemo(
    () => [
      {
        quote: t("home.testimonial1.quote"),
        name: t("home.testimonial1.name"),
        role: t("home.testimonial1.role"),
        fallback: "A",
        fallbackClass: "bg-[#f7b731] text-[var(--primary)]",
      },
      {
        quote: t("home.testimonial2.quote"),
        name: t("home.testimonial2.name"),
        role: t("home.testimonial2.role"),
        fallback: "K",
        fallbackClass: "bg-[#1a2a5c]",
      },
      {
        quote: t("home.testimonial3.quote"),
        name: t("home.testimonial3.name"),
        role: t("home.testimonial3.role"),
        fallback: "M",
        fallbackClass: "bg-emerald-600",
      },
    ],
    [t]
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-primary via-[#15224d] to-[#0f1838] text-primary-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-25%,rgba(247,183,49,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_60%,rgba(96,165,250,0.12),transparent_45%)]" />
          <div className="fx-grid-dark absolute inset-0 opacity-40" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          aria-hidden
        >
          {heroMarketingFloaters.map((f, i) => (
            <motion.div
              key={`hero-float-${i}`}
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
              <f.Icon className={f.iconClass} strokeWidth={1.15} />
            </motion.div>
          ))}
        </div>

        <div
          className={`relative z-10 ${PAGE_WIDE} flex flex-col gap-12 pb-20 pt-28 md:flex-row md:items-center md:gap-16 md:pb-28 md:pt-32`}
        >
          <motion.div
            className="max-w-xl flex-1 space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant="outline"
                className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm"
              >
                {t("home.hero.badge")}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.08]"
            >
              {t("home.hero.line1")}{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-[var(--accent)] to-amber-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t("home.titleHighlight")}
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-xl"
            >
              {t("home.hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[var(--accent)] px-6 text-[var(--primary)] shadow-[0_0_32px_-8px_var(--accent)] transition-[background-color,box-shadow,filter] duration-300 ease-out hover:bg-[var(--accent-hover)] hover:shadow-[0_0_48px_-8px_rgba(247,183,49,0.55)] hover:text-[var(--accent)] hover:brightness-[1.04]"
                >
                  <Link
                    to={ROUTES.AVANT_PREMIERE}
                    className="gap-2"
                  >
                    <Download className="size-4" />
                    {osData.text}
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary-foreground/35 bg-primary-foreground/5 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/15"
                >
                    <a href="#tontine" className="gap-2">
                    {t("home.hero.discover")}
                    <ArrowRight
                      className="size-4 shrink-0"
                      strokeWidth={2.25}
                    />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-1 justify-center md:justify-end"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card className="gap-0 overflow-hidden rounded-[2.5rem] border-[10px] border-white/10 bg-muted/90 p-0 py-0 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-white/20 backdrop-blur-sm">
                <div className="aspect-[9/19] w-[min(100%,280px)] overflow-hidden md:w-[300px]">
                  <img
                    src="/src/assets/image_411d1e.jpg"
                    alt={t("home.hero.imgAlt")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tontine */}
      <section
        id="tontine"
        className="relative scroll-mt-20 border-b bg-background py-20 md:py-28"
      >
        <div className="fx-grid-light pointer-events-none absolute inset-0 opacity-60" />
        <div
          className={`relative z-10 ${PAGE_WIDE} flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-between`}
        >
          <motion.div
            className="max-w-lg flex-1 space-y-5 text-center lg:text-left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="font-medium">
                {t("home.tontine.badge")}
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              {t("home.tontine.heading")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground md:text-lg"
            >
              {t("home.tontine.description")}
            </motion.p>
            <motion.ul
              className="space-y-4 pt-2 text-left"
              variants={listContainer}
            >
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.tontine.f1")}
                </strong>{" "}
                {t("home.tontine.f1Text")}
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.tontine.f2")}
                </strong>{" "}
                {t("home.tontine.f2Text")}
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.tontine.f3")}
                </strong>{" "}
                {t("home.tontine.f3Text")}
              </FeatureBullet>
            </motion.ul>
          </motion.div>

          <motion.div
            className="flex w-full max-w-md flex-1 flex-col gap-4"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-primary/[0.04] ring-1 ring-primary/5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/[0.06] hover:ring-primary/10">
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-(--accent)/35 bg-(--accent)/10 text-[0.65rem] font-semibold uppercase tracking-wider text-(--accent)"
                  >
                    {t("home.tontine.exampleBadge")}
                  </Badge>
                  <CardTitle className="font-heading text-lg tracking-tight">
                    {t("home.tontine.cardTitle")}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {t("home.tontine.cardDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                >
                  <Progress
                    value={100}
                    className="h-2.5 rounded-full bg-muted [&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-(--accent) [&_[data-slot=progress-indicator]]:shadow-[0_0_14px_var(--accent)]"
                  />
                </motion.div>
                <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
                  <span>{t("home.tontine.row10")}</span>
                  <span className="tabular-nums">50&nbsp;000 FCFA</span>
                </div>
              </CardContent>

              <Separator className="bg-border/60" />

              <CardHeader className="space-y-1 pb-2 pt-5">
                <CardTitle className="font-heading text-sm font-semibold tracking-tight">
                  {t("home.tontine.orderTitle")}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t("home.tontine.orderDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 pb-4">
                <ul className="space-y-2" aria-label={t("home.tontine.orderDesc")}>
                  <li className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-muted/25 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        1
                      </span>
                      <span className="truncate font-medium text-foreground">
                        Awa D.
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <Check className="size-3.5" aria-hidden />
                      {t("home.tontine.received")}
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg border border-(--accent)/30 bg-(--accent)/8 px-3 py-2 text-sm ring-1 ring-(--accent)/15">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--accent)/20 text-xs font-semibold text-(--accent)">
                        2
                      </span>
                      <span className="truncate font-medium text-foreground">
                        Kouamé Y.
                      </span>
                    </span>
                    <Badge
                      variant="secondary"
                      className="shrink-0 border-(--accent)/25 bg-(--accent)/15 text-[0.65rem] text-(--accent)"
                    >
                      {t("home.tontine.inProgress")}
                    </Badge>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-muted/25 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        3
                      </span>
                      <span className="truncate font-medium text-foreground">
                        Marc E.
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {t("home.tontine.upcoming")}
                    </span>
                  </li>
                  <li className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/15 px-3 py-2 text-xs text-muted-foreground">
                    {t("home.tontine.moreMembers")}
                  </li>
                </ul>
              </CardContent>

              <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-muted/20">
                <div className="flex flex-col items-center gap-1 px-2 py-3 text-center sm:px-3">
                  <Calendar
                    className="size-4 text-primary/70"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {t("home.tontine.next")}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-foreground">
                    {t("home.tontine.nextDate")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-2 py-3 text-center sm:px-3">
                  <Clock
                    className="size-4 text-primary/70"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {t("home.tontine.cycle")}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-foreground">
                    {t("home.tontine.cycleVal")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-2 py-3 text-center sm:px-3">
                  <ShieldCheck
                    className="size-4 text-primary/70"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {t("home.tontine.contribution")}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-foreground">
                    {t("home.tontine.contribVal")}
                  </span>
                </div>
              </div>
            </Card>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center text-xs text-muted-foreground lg:text-left"
            >
              {t("home.tontine.note")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Épargne */}
      <section
        id="epargne"
        className="relative scroll-mt-20 border-b bg-muted/25 py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(26,42,92,0.06),transparent)]" />
        <div
          className={`relative z-10 ${PAGE_WIDE} flex flex-col-reverse items-center gap-14 lg:flex-row lg:justify-between`}
        >
          <motion.div
            className="w-full max-w-md flex-1"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="relative overflow-hidden rounded-2xl border-0 bg-linear-to-br from-primary via-[#15224d] to-[#0c1430] text-primary-foreground shadow-[0_28px_56px_-16px_rgba(26,42,92,0.45)] ring-1 ring-white/10">
                <div className="h-1 w-full" aria-hidden />
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-(--accent)/15 blur-2xl" />
                <CardHeader className="relative z-10 space-y-2 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="font-heading text-lg tracking-tight text-(--accent)">
                      {t("home.epargne.cardTitle")}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="border-(--accent)/50 bg-(--accent)/20 px-2 py-0.5 text-[0.65rem] font-semibold text-(--accent)"
                    >
                      {t("home.epargne.cardBadge")}
                    </Badge>
                  </div>
                  <CardDescription className="text-primary-foreground/65">
                    {t("home.epargne.cardSprint")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-3 pb-8 pt-4 text-center">
                  <p className="font-heading text-4xl font-bold tabular-nums tracking-tight text-primary-foreground md:text-5xl md:tracking-tighter">
                    {t("home.epargne.amount")}
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-primary-foreground/90">
                    <span className="size-2 rounded-full bg-(--accent)" />
                    {t("home.epargne.cardFooter")}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-lg flex-1 space-y-5 text-center lg:text-left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="font-medium">
                {t("home.epargne.badge")}
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              {t("home.epargne.heading")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground md:text-lg"
            >
              {t("home.epargne.description")}
            </motion.p>
            <motion.ul
              className="space-y-4 pt-2 text-left"
              variants={listContainer}
            >
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.epargne.f1")}
                </strong>{" "}
                {t("home.epargne.f1Text")}
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.epargne.f2")}
                </strong>{" "}
                {t("home.epargne.f2Text")}
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">
                  {t("home.epargne.f3")}
                </strong>{" "}
                {t("home.epargne.f3Text")}
              </FeatureBullet>
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* Témoignages */}
      <section
        id="temoignages"
        className="relative scroll-mt-20 bg-background py-20 md:py-28"
      >
        <div className="fx-grid-light pointer-events-none absolute inset-0 opacity-50" />
        <div className={`relative z-10 ${PAGE_WIDE} space-y-12`}>
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("home.testimonials.heading")}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {t("home.testimonials.sub")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-6xl px-12 md:px-14"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {testimonials.map((x) => (
                  <CarouselItem
                    key={x.name}
                    className="basis-full pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <div className="flex h-full min-h-0 min-w-0 max-w-md mx-auto py-1">
                      <TestimonialCard
                        quote={x.quote}
                        name={x.name}
                        role={x.role}
                        fallback={x.fallback}
                        fallbackClass={x.fallbackClass}
                        starsLabel={t("common.stars5")}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="left-0 rounded-full border-border/80 shadow-sm md:-left-2"
              />
              <CarouselNext
                variant="outline"
                size="icon"
                className="right-0 rounded-full border-border/80 shadow-sm md:-right-2"
              />
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Download */}
      <section
        id="download"
        className="relative overflow-hidden border-t border-border/50 bg-linear-to-b from-background via-muted/25 to-muted/40 py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_-10%,rgba(26,42,92,0.07),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_100%,rgba(247,183,49,0.11),transparent)]" />
          <div className="fx-grid-light absolute inset-0 opacity-[0.4]" />
        </div>
        <motion.div
          className={`relative z-10 w-full ${PAGE_WIDE}`}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Card className="relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-primary/20 bg-linear-to-br from-primary via-[#1e3270] to-[#0a1028] text-primary-foreground shadow-[0_32px_80px_-28px_rgba(26,42,92,0.55)] ring-1 ring-white/10">
            <CardContent className="relative z-10 grid gap-10 p-8 md:grid-cols-[1fr_minmax(0,11rem)] md:items-center md:gap-12 lg:grid-cols-[1fr_minmax(0,13rem)]">
              <motion.div
                className="space-y-6 text-center md:text-left"
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.h2
                  variants={fadeUp}
                  className="font-heading text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl"
                >
                  {t("home.downloadSection.cta1")}{" "}
                  <span className="bg-linear-to-r from-(--accent) to-amber-200 bg-clip-text text-transparent">
                    {t("home.downloadSection.cta2")}
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="mx-auto max-w-lg text-base leading-relaxed text-primary-foreground/78 md:mx-0 md:text-lg"
                >
                  {t("home.downloadSection.sub")}
                </motion.p>
                <motion.ul
                  variants={fadeUp}
                  className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-foreground/60 md:justify-start md:text-sm"
                >
                  <li className="flex items-center gap-2">
                    <ShieldCheck
                      className="size-4 shrink-0 text-(--accent)"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t("home.downloadSection.li1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone
                      className="size-4 shrink-0 text-(--accent)"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t("home.downloadSection.li2")}
                  </li>
                </motion.ul>
                <motion.div
                  variants={fadeUp}
                  className="flex justify-center md:justify-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-[var(--accent)] px-7 text-[var(--primary)] shadow-[0_0_32px_-8px_var(--accent)] transition-[background-color,box-shadow,filter] duration-300 ease-out hover:bg-[var(--accent-hover)] hover:shadow-[0_0_48px_-8px_rgba(247,183,49,0.5)] hover:brightness-[1.04] hover:text-[var(--accent)]"
                    >
                      <Link
                        to={ROUTES.AVANT_PREMIERE}
                        className="gap-2"
                      >
                        <Download className="size-4" />
                        {t("home.downloadSection.btn")}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                {!osData.isIos ? (
                  <motion.div variants={fadeUp} className="pt-1">
                    <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-left text-xs leading-relaxed text-primary-foreground/70 backdrop-blur-sm md:text-[0.8125rem]">
                      <span className="font-medium text-primary-foreground/85">
                        {t("home.downloadSection.apkTitle")}
                      </span>
                      <span className="mt-1 block text-primary-foreground/65">
                        {t("home.downloadSection.apkText")}
                      </span>
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>

              <motion.div
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="hidden justify-center md:flex"
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-[1.75rem] bg-(--accent)/20 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative flex aspect-square w-full max-w-[11rem] items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md lg:max-w-[13rem]">
                    <Smartphone
                      className="size-[42%] max-w-[5rem] text-(--accent)"
                      strokeWidth={1.15}
                      aria-hidden
                    />
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
