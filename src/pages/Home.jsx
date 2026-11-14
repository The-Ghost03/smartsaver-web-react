import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarDays,
  Check,
  Eye,
  Layers,
  MapPin,
  Quote,
  Receipt,
  RefreshCw,
  Scale,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  UserCheck,
  Users,
} from "lucide-react";
import { PAGE_WIDE } from "@/constants/layout";
import { SECTIONS } from "@/constants/routes";
import { STORE_LINKS } from "@/constants/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion-variants";
import heroScreen from "@/assets/connextion.webp";
import { StoreButton } from "@/components/home/StoreButton";

/* ---------- Petites briques ---------- */

function Reveal({ as = "div", className, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </Comp>
  );
}

function SectionIntro({ eyebrow, title, sub, align = "left", tone = "light" }) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal
      className={`space-y-4 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}
    >
      <p className={`ss-eyebrow ${dark ? "!text-white/70" : ""}`}>{eyebrow}</p>
      <h2
        className={`text-3xl sm:text-4xl md:text-[2.75rem] md:leading-[1.08] ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={`text-base md:text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

function Feature({ icon, title, text, tone = "light" }) {
  const Icon = icon;
  const dark = tone === "dark";
  return (
    <motion.li variants={fadeUp} className="flex gap-4">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          dark ? "bg-white/10 text-saffron" : "bg-saffron-soft text-navy"
        }`}
      >
        <Icon className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <div>
        <h3
          className={`font-heading text-base font-semibold ${dark ? "text-white" : "text-foreground"}`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm leading-relaxed md:text-[0.9375rem] ${dark ? "text-white/65" : "text-muted-foreground"}`}
        >
          {text}
        </p>
      </div>
    </motion.li>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  const { t } = useTranslation();
  const trust = [
    { icon: ShieldCheck, label: t("home.trust.t1") },
    { icon: BadgeCheck, label: t("home.trust.t2") },
    { icon: Smartphone, label: t("home.trust.t3") },
    { icon: MapPin, label: t("home.trust.t4") },
  ];

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div
        className="ss-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]"
        aria-hidden
      />
      <div
        className={`relative ${PAGE_WIDE} grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10`}
      >
        <motion.div
          className="space-y-7"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
            {t("home.hero.eyebrow")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
          >
            {t("home.hero.line1")}{" "}
            <span className="ss-highlight">{t("home.hero.highlight")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href={`#${SECTIONS.DOWNLOAD}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("home.hero.ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href={`#${SECTIONS.HOW}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:border-navy/30 hover:bg-sand outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("home.hero.ctaSecondary")}
            </a>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <div className={`relative ${PAGE_WIDE} mt-16 md:mt-24`}>
        <motion.ul
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {trust.map((item) => (
            <motion.li
              key={item.label}
              variants={fadeUp}
              className="flex items-center gap-3 bg-card px-4 py-4 text-sm font-medium text-foreground sm:px-5"
            >
              <item.icon className="size-5 shrink-0 text-navy" strokeWidth={1.75} aria-hidden />
              {item.label}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function HeroVisual() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 pt-10 sm:px-12">
        <div className="ss-dots-light absolute inset-0" aria-hidden />
        <div
          className="absolute -right-20 -top-20 size-72 rounded-full bg-saffron/35 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto w-[min(100%,250px)] translate-y-2 rounded-t-[2.25rem] border-[7px] border-b-0 border-ink bg-ink shadow-2xl">
          <div className="aspect-[9/14] overflow-hidden rounded-t-[1.75rem] bg-paper">
            <img
              src={heroScreen}
              alt={t("home.hero.imgAlt")}
              className="h-full w-full object-cover object-top"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {/* Bulles flottantes */}
      <motion.div
        className="absolute -left-3 top-10 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl shadow-ink/10 sm:-left-8"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="size-5" strokeWidth={2.5} aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-xs text-muted-foreground">
            {t("home.hero.chipPayoutLabel")}
          </span>
          <span className="block font-heading text-base font-semibold tabular-nums">
            {t("home.hero.chipPayoutValue")}
          </span>
        </span>
      </motion.div>

      <motion.div
        className="absolute -right-3 bottom-12 w-48 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl shadow-ink/10 sm:-right-6"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{t("home.hero.chipGoalLabel")}</span>
          <span className="font-semibold text-navy">100 %</span>
        </div>
        <p className="mt-1 font-heading text-base font-semibold tabular-nums">
          {t("home.hero.chipGoalValue")}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-saffron"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    { icon: UserCheck, title: t("home.how.s1Title"), text: t("home.how.s1Text") },
    { icon: Users, title: t("home.how.s2Title"), text: t("home.how.s2Text") },
    { icon: BellRing, title: t("home.how.s3Title"), text: t("home.how.s3Text") },
  ];

  return (
    <section id={SECTIONS.HOW} className="py-24 md:py-32">
      <div className={`${PAGE_WIDE} space-y-14`}>
        <SectionIntro
          eyebrow={t("home.how.eyebrow")}
          title={t("home.how.heading")}
          sub={t("home.how.sub")}
        />
        <motion.ol
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map(({ icon, title, text }, i) => {
            const Icon = icon;
            return (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group relative flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-navy/25"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-heading text-4xl font-semibold text-sand transition-colors group-hover:text-saffron">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-xl">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

function TontineCard() {
  const { t } = useTranslation();
  const members = [
    { rank: 1, name: "Awa D.", status: "received" },
    { rank: 2, name: "Kouamé Y.", status: "current" },
    { rank: 3, name: "Marc E.", status: "upcoming" },
  ];

  return (
    <div className="rounded-[2rem] border border-border bg-card p-2 shadow-xl shadow-ink/[0.06]">
      <div className="rounded-[1.6rem] bg-paper p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-saffron-soft px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
              {t("home.tontine.exampleBadge")}
            </span>
            <h3 className="mt-3 text-xl">{t("home.tontine.cardTitle")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("home.tontine.cardDesc")}
            </p>
          </div>
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
            <Users className="size-5" aria-hidden />
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">{t("home.tontine.pot")}</span>
            <span className="font-heading text-2xl font-semibold tabular-nums">
              50&nbsp;000 F
            </span>
          </div>
          <div className="mt-3 flex gap-1" aria-hidden>
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className={`h-2 flex-1 rounded-full ${i < 3 ? "bg-saffron" : "bg-sand"}`}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 pt-5 sm:px-6">
        <p className="text-sm font-semibold">{t("home.tontine.orderTitle")}</p>
        <ul className="mt-3 divide-y divide-border" aria-label={t("home.tontine.orderTitle")}>
          {members.map((m) => (
            <li key={m.rank} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    m.status === "current" ? "bg-saffron text-navy" : "bg-sand text-muted-foreground"
                  }`}
                >
                  {m.rank}
                </span>
                <span className="truncate font-medium">{m.name}</span>
              </span>
              {m.status === "received" ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-success">
                  <Check className="size-3.5" aria-hidden />
                  {t("home.tontine.received")}
                </span>
              ) : m.status === "current" ? (
                <span className="rounded-full bg-navy px-2.5 py-1 text-[0.7rem] font-semibold text-white">
                  {t("home.tontine.inProgress")}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {t("home.tontine.upcoming")}
                </span>
              )}
            </li>
          ))}
          <li className="py-3 text-center text-xs text-muted-foreground">
            {t("home.tontine.moreMembers")}
          </li>
        </ul>
      </div>

      <dl className="grid grid-cols-3 gap-2 p-2">
        {[
          { icon: CalendarDays, label: t("home.tontine.next"), value: t("home.tontine.nextDate") },
          { icon: RefreshCw, label: t("home.tontine.cycle"), value: t("home.tontine.cycleVal") },
          { icon: Receipt, label: t("home.tontine.contribution"), value: t("home.tontine.contribVal") },
        ].map(({ icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-paper px-3 py-3 text-center">
            <StatIcon icon={icon} className="mx-auto size-4 text-navy/70" aria-hidden />
            <dt className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StatIcon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

function Tontine() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.TONTINE} className="border-t border-border bg-card py-24 md:py-32">
      <div className={`${PAGE_WIDE} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div className="space-y-10">
          <SectionIntro
            eyebrow={t("home.tontine.eyebrow")}
            title={t("home.tontine.heading")}
            sub={t("home.tontine.description")}
          />
          <motion.ul
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Feature icon={CalendarDays} title={t("home.tontine.f1")} text={t("home.tontine.f1Text")} />
            <Feature icon={Scale} title={t("home.tontine.f2")} text={t("home.tontine.f2Text")} />
            <Feature icon={Eye} title={t("home.tontine.f3")} text={t("home.tontine.f3Text")} />
          </motion.ul>
        </div>

        <Reveal className="space-y-3">
          <TontineCard />
          <p className="text-center text-xs text-muted-foreground">{t("home.tontine.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Epargne() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.EPARGNE} className="py-6 md:py-10">
      <div className="mx-auto w-full max-w-[90rem] px-2 sm:px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy py-20 md:py-28">
          <div className="ss-dots-light absolute inset-0 opacity-70" aria-hidden />
          <div
            className="absolute -bottom-32 -left-24 size-96 rounded-full bg-saffron/20 blur-3xl"
            aria-hidden
          />
          <div className={`relative ${PAGE_WIDE} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
            <Reveal className="order-2 lg:order-1">
              <SavingsCard />
            </Reveal>

            <div className="order-1 space-y-10 lg:order-2">
              <SectionIntro
                tone="dark"
                eyebrow={t("home.epargne.eyebrow")}
                title={t("home.epargne.heading")}
                sub={t("home.epargne.description")}
              />
              <motion.ul
                className="space-y-6"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <Feature tone="dark" icon={SlidersHorizontal} title={t("home.epargne.f1")} text={t("home.epargne.f1Text")} />
                <Feature tone="dark" icon={Layers} title={t("home.epargne.f2")} text={t("home.epargne.f2Text")} />
                <Feature tone="dark" icon={Receipt} title={t("home.epargne.f3")} text={t("home.epargne.f3Text")} />
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SavingsCard() {
  const { t } = useTranslation();
  const sprints = [
    { label: "S1", pct: 100 },
    { label: "S2", pct: 100 },
    { label: "S3", pct: 100 },
  ];
  return (
    <div className="mx-auto max-w-md rounded-[2rem] bg-card p-7 text-foreground shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{t("home.epargne.cardTitle")}</h3>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
          <Check className="size-3.5" aria-hidden />
          {t("home.epargne.cardBadge")}
        </span>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{t("home.epargne.cardSprint")}</p>
      <p className="mt-1 font-heading text-5xl font-semibold tabular-nums tracking-tight">
        {t("home.epargne.amount")}
      </p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-sand">
        <motion.div
          className="h-full rounded-full bg-saffron"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className="font-semibold text-navy">{t("home.epargne.goal")}</span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {sprints.map((s) => (
          <div key={s.label} className="rounded-2xl bg-paper p-3 text-center">
            <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
              Sprint {s.label.slice(1)}
            </p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">10&nbsp;000 F</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id={SECTIONS.REVIEWS} className="py-24 md:py-32">
      <div className={`${PAGE_WIDE} space-y-14`}>
        <SectionIntro
          align="center"
          eyebrow={t("home.testimonials.eyebrow")}
          title={t("home.testimonials.heading")}
          sub={t("home.testimonials.sub")}
        />
        <motion.ul
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {list.map((item, i) => (
            <motion.li
              key={item.name}
              variants={fadeUp}
              className={`flex flex-col justify-between gap-8 rounded-3xl p-7 ${
                i === 1 ? "bg-saffron text-navy" : "border border-border bg-card"
              }`}
            >
              <figure className="flex h-full flex-col justify-between gap-8">
                <blockquote>
                  <Quote
                    className={`size-7 ${i === 1 ? "text-navy" : "text-saffron"}`}
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden
                  />
                  <p className="mt-4 font-heading text-lg leading-snug md:text-xl">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-full font-heading text-sm font-semibold ${
                      i === 1 ? "bg-navy text-white" : "bg-sand text-navy"
                    }`}
                    aria-hidden
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span
                      className={`block text-xs ${i === 1 ? "text-navy/70" : "text-muted-foreground"}`}
                    >
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Download() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.DOWNLOAD} className="pb-24 md:pb-32">
      <div className={PAGE_WIDE}>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-saffron">
          <div
            className="absolute inset-0 [background-image:radial-gradient(rgb(26_42_92/0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
            aria-hidden
          />
          <div className="relative grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
            <div className="space-y-7 px-7 py-12 sm:px-12 md:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
                {t("home.download.eyebrow")}
              </p>
              <h2 className="text-4xl text-navy sm:text-5xl md:leading-[1.05]">
                {t("home.download.heading")}
              </h2>
              <p className="max-w-md text-base text-navy/80 md:text-lg">
                {t("home.download.sub")}
              </p>
              <div className="flex flex-wrap gap-3">
                <StoreButton
                  platform="ios"
                  href={STORE_LINKS.ios}
                  small={t("home.download.iosSmall")}
                  label="App Store"
                  soonLabel={t("home.download.soon")}
                />
                <StoreButton
                  platform="android"
                  href={STORE_LINKS.android}
                  small={t("home.download.androidSmall")}
                  label="Android"
                  soonLabel={t("home.download.soon")}
                />
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy/80">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4" aria-hidden />
                  {t("home.download.li1")}
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="size-4" aria-hidden />
                  {t("home.download.li2")}
                </li>
              </ul>
              <p className="max-w-md rounded-2xl bg-navy/[0.07] px-4 py-3 text-xs leading-relaxed text-navy/80">
                <strong className="font-semibold text-navy">{t("home.download.apkTitle")}</strong>{" "}
                {t("home.download.apkText")}
              </p>
            </div>

            <div className="hidden justify-center self-end md:flex" aria-hidden>
              <div className="w-[240px] translate-y-6 rotate-[4deg] rounded-t-[2.25rem] border-[7px] border-b-0 border-ink bg-ink shadow-2xl lg:w-[270px]">
                <div className="aspect-[9/15] overflow-hidden rounded-t-[1.75rem] bg-paper">
                  <img src={heroScreen} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Défile vers l’ancre après une navigation SPA vers « /#section » */
function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);
}

export default function Home() {
  useHashScroll();
  return (
    <>
      <Hero />
      <HowItWorks />
      <Tontine />
      <Epargne />
      <Testimonials />
      <Download />
    </>
  );
}
