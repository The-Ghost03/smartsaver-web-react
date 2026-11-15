import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarDays,
  Check,
  History,
  IdCard,
  Layers,
  ListOrdered,
  Quote,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  UserCheck,
  Users,
} from "lucide-react";
import { PAGE_WIDE } from "@/constants/layout";
import { ROUTES, SECTIONS } from "@/constants/routes";
import { ANDROID_APK_FILENAME, STORE_LINKS } from "@/constants/site";
import heroScreen from "@/assets/connextion.webp";
import { EASE } from "@/lib/motion-variants";
import { StoreButton } from "@/components/home/StoreButton";
import { HeroPhone } from "@/components/home/HeroPhone";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ClipPanel,
  CountUp,
  DrawLine,
  Rise,
  RiseGroup,
  RiseItem,
  WordsReveal,
} from "@/components/motion";

/* ---------- Petites briques ---------- */

function SectionIntro({ eyebrow, title, sub, align = "left", tone = "light" }) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`space-y-4 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <Rise
        as="p"
        className={`flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] ${
          centered ? "justify-center" : ""
        } ${dark ? "text-white/70" : "text-muted-foreground"}`}
      >
        <DrawLine className="h-0.5 w-5 rounded-full bg-saffron" />
        {eyebrow}
      </Rise>
      <WordsReveal
        text={title}
        className={`text-3xl sm:text-4xl md:text-[2.75rem] md:leading-[1.08] ${dark ? "text-white" : "text-foreground"}`}
      />
      {sub ? (
        <Rise
          as="p"
          delay={0.25}
          className={`text-base md:text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}
        >
          {sub}
        </Rise>
      ) : null}
    </div>
  );
}

function Feature({ icon, title, text, tone = "light" }) {
  const Icon = icon;
  const dark = tone === "dark";
  return (
    <RiseItem as="li" className="flex gap-4">
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
    </RiseItem>
  );
}

function StatIcon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

/* ---------- Hero ---------- */

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Fond : trame de points + halo chaud */}
      <div
        className="ss-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_25%_45%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full bg-saffron/15 blur-3xl"
        aria-hidden
      />

      <div
        className={`relative ${PAGE_WIDE} grid items-center gap-16 pb-20 pt-28 md:pt-32 lg:min-h-[min(100svh,58rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-16`}
      >
        <div className="space-y-9">
          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
            <WordsReveal as="span" trigger="mount" text={t("home.hero.line1")} />{" "}
            {/* Mot surligné : le trait jaune se dessine derrière le texte */}
            <span className="relative z-0 inline-block whitespace-nowrap">
              <span
                className="absolute -left-[0.08em] -right-[0.08em] bottom-[0.1em] -z-10 h-[0.36em] -skew-x-[8deg]"
                aria-hidden
              >
                <DrawLine
                  trigger="mount"
                  delay={0.55}
                  className="h-full w-full rounded-[0.2em] bg-saffron"
                />
              </span>
              <WordsReveal
                as="span"
                trigger="mount"
                delay={0.2}
                text={t("home.hero.highlight")}
              />
            </span>
          </h1>

          <motion.p
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
          >
            <div className="flex flex-wrap gap-3">
              <a
                href={`#${SECTIONS.DOWNLOAD}`}
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t("home.hero.ctaPrimary")}
                <span className="flex size-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </a>
              <a
                href={`#${SECTIONS.HOW}`}
                className="inline-flex h-13 items-center rounded-full border border-border bg-card/70 px-6 text-sm font-semibold text-foreground transition-colors hover:bg-sand outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("home.hero.ctaSecondary")}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">{t("home.hero.note")}</p>
          </motion.div>
        </div>

        <HeroPhone />
      </div>
    </section>
  );
}

function TrustStrip() {
  const { t } = useTranslation();
  const trust = [
    { icon: BadgeCheck, label: t("home.trust.t1") },
    { icon: IdCard, label: t("home.trust.t2") },
    { icon: Receipt, label: t("home.trust.t3") },
    { icon: ShieldCheck, label: t("home.trust.t4") },
  ];
  return (
    <div className={PAGE_WIDE}>
      <RiseGroup
        as="ul"
        stagger={0.08}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
      >
        {trust.map((item, i) => (
          <RiseItem
            as="li"
            key={i}
            className="flex items-center gap-3 bg-card px-4 py-4 text-sm font-medium text-foreground sm:px-5"
          >
            <item.icon className="size-5 shrink-0 text-navy" strokeWidth={1.75} aria-hidden />
            {item.label}
          </RiseItem>
        ))}
      </RiseGroup>
    </div>
  );
}

/* ---------- Sections ---------- */

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
        <RiseGroup as="ol" stagger={0.14} className="relative grid gap-4 md:grid-cols-3 md:gap-5">
          {/* Fil qui relie les étapes */}
          <DrawLine
            delay={0.3}
            className="absolute left-7 right-7 top-[3.25rem] hidden h-px bg-navy/15 md:block"
          />
          {steps.map(({ icon, title, text }, i) => (
            <RiseItem
              as="li"
              key={i}
              className="group relative flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-navy/25"
            >
              <div className="flex items-center justify-between">
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                  <StatIcon icon={icon} className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-heading text-4xl font-bold text-navy/15 transition-colors group-hover:text-saffron">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-xl">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </RiseItem>
          ))}
        </RiseGroup>
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
            <CountUp to={50000} suffix=" F" className="font-heading text-2xl font-bold" />
          </div>
          <div className="mt-3 flex gap-1" aria-hidden>
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className={`h-2 flex-1 origin-bottom rounded-full ${i < 3 ? "bg-saffron" : "bg-sand"}`}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, ease: EASE }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 pt-5 sm:px-6">
        <p className="text-sm font-semibold">{t("home.tontine.orderTitle")}</p>
        <RiseGroup
          as="ul"
          stagger={0.12}
          className="mt-3 divide-y divide-border"
          aria-label={t("home.tontine.orderTitle")}
        >
          {members.map((m) => (
            <RiseItem
              as="li"
              key={m.rank}
              className="flex items-center justify-between gap-3 py-3 text-sm"
            >
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
            </RiseItem>
          ))}
          <RiseItem as="li" className="py-3 text-center text-xs text-muted-foreground">
            {t("home.tontine.moreMembers")}
          </RiseItem>
        </RiseGroup>
      </div>

      <dl className="grid grid-cols-3 gap-2 p-2">
        {[
          { icon: CalendarDays, label: t("home.tontine.next"), value: t("home.tontine.nextDate") },
          { icon: RefreshCw, label: t("home.tontine.cycle"), value: t("home.tontine.cycleVal") },
          { icon: Receipt, label: t("home.tontine.contribution"), value: t("home.tontine.contribVal") },
        ].map(({ icon, label, value }, i) => (
          <div key={i} className="rounded-2xl bg-paper px-3 py-3 text-center">
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

/** Carte qui se redresse légèrement pendant le scroll */
function TiltOnScroll({ children, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { rotate, y }}>
      {children}
    </motion.div>
  );
}

function Tontine() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.TONTINE} className="overflow-x-clip bg-sand py-24 md:py-32">
      <div className={`${PAGE_WIDE} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div className="space-y-10">
          <SectionIntro
            eyebrow={t("home.tontine.eyebrow")}
            title={t("home.tontine.heading")}
            sub={t("home.tontine.description")}
          />
          <RiseGroup as="ul" className="space-y-6">
            <Feature icon={ListOrdered} title={t("home.tontine.f1")} text={t("home.tontine.f1Text")} />
            <Feature icon={History} title={t("home.tontine.f2")} text={t("home.tontine.f2Text")} />
            <Feature icon={Receipt} title={t("home.tontine.f3")} text={t("home.tontine.f3Text")} />
          </RiseGroup>
        </div>

        <TiltOnScroll className="space-y-3">
          <TontineCard />
          <p className="text-center text-xs text-muted-foreground">{t("home.tontine.note")}</p>
        </TiltOnScroll>
      </div>
    </section>
  );
}

function SavingsCard() {
  const { t } = useTranslation();
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
      <p className="mt-1 font-heading text-5xl font-bold tracking-tight">
        <CountUp to={30000} suffix=" F" duration={1.6} />
      </p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-sand">
        <motion.div
          className="h-full rounded-full bg-saffron"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className="font-semibold text-navy">{t("home.epargne.goal")}</span>
      </div>
      <RiseGroup className="mt-6 grid grid-cols-3 gap-2" stagger={0.12}>
        {[1, 2, 3].map((n) => (
          <RiseItem key={n} className="rounded-2xl bg-paper p-3 text-center">
            <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
              Sprint {n}
            </p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">10&nbsp;000 F</p>
          </RiseItem>
        ))}
      </RiseGroup>
    </div>
  );
}

function Epargne() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.EPARGNE} className="py-6 md:py-10">
      <div className="mx-auto w-full max-w-[82rem] px-2 sm:px-4">
        <ClipPanel className="relative overflow-hidden bg-navy py-20 md:py-28">
          <div className="ss-dots-light absolute inset-0 opacity-70" aria-hidden />
          <div
            className="absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-navy-soft/70 blur-3xl"
            aria-hidden
          />
          <div className={`relative ${PAGE_WIDE} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
            <Rise className="order-2 lg:order-1">
              <SavingsCard />
            </Rise>

            <div className="order-1 space-y-10 lg:order-2">
              <SectionIntro
                tone="dark"
                eyebrow={t("home.epargne.eyebrow")}
                title={t("home.epargne.heading")}
                sub={t("home.epargne.description")}
              />
              <RiseGroup as="ul" className="space-y-6">
                <Feature tone="dark" icon={SlidersHorizontal} title={t("home.epargne.f1")} text={t("home.epargne.f1Text")} />
                <Feature tone="dark" icon={Layers} title={t("home.epargne.f2")} text={t("home.epargne.f2Text")} />
                <Feature tone="dark" icon={Receipt} title={t("home.epargne.f3")} text={t("home.epargne.f3Text")} />
              </RiseGroup>
            </div>
          </div>
        </ClipPanel>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id={SECTIONS.REVIEWS} className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="ss-dots-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-48 -top-48 size-[36rem] rounded-full bg-navy-soft/40 blur-3xl"
        aria-hidden
      />
      <div className={`relative ${PAGE_WIDE} space-y-14`}>
        <SectionIntro
          tone="dark"
          align="center"
          eyebrow={t("home.testimonials.eyebrow")}
          title={t("home.testimonials.heading")}
          sub={t("home.testimonials.sub")}
        />
        <RiseGroup as="ul" stagger={0.14} className="grid gap-4 md:grid-cols-3 md:gap-5">
          {list.map((item, i) => (
            <RiseItem
              as="li"
              key={i}
              className={`flex flex-col justify-between gap-8 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${
                i === 1 ? "bg-saffron text-navy md:-translate-y-4 md:hover:-translate-y-5" : "border border-white/10 bg-white/[0.06] text-white"
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
                      i === 1 ? "bg-navy text-white" : "bg-saffron text-navy"
                    }`}
                    aria-hidden
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span
                      className={`block text-xs ${i === 1 ? "text-navy/70" : "text-white/60"}`}
                    >
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RiseItem>
          ))}
        </RiseGroup>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useTranslation();
  const items = t("home.faq.items", { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id={SECTIONS.FAQ} className="py-24 md:py-32">
      <div className={`${PAGE_WIDE} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            eyebrow={t("home.faq.eyebrow")}
            title={t("home.faq.heading")}
            sub={t("home.faq.sub")}
          />
          <Rise className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" delay={0.3}>
            <Link to={ROUTES.CGU} className="text-navy underline decoration-saffron decoration-2 underline-offset-4 hover:decoration-navy">
              {t("home.faq.cgu")}
            </Link>
            <Link to={ROUTES.PRIVACY} className="text-navy underline decoration-saffron decoration-2 underline-offset-4 hover:decoration-navy">
              {t("home.faq.privacy")}
            </Link>
          </Rise>
        </div>

        <RiseGroup stagger={0.08}>
          <Accordion type="single" collapsible defaultValue="q-0" className="flex flex-col gap-3">
            {list.map((item, i) => (
              <RiseItem key={i}>
                <AccordionItem
                  value={`q-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 transition-colors data-[state=open]:border-navy/20 data-[state=open]:bg-saffron-soft md:px-6"
                >
                  <AccordionTrigger className="cursor-pointer py-5 text-left font-heading text-base font-semibold text-foreground hover:no-underline md:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </RiseItem>
            ))}
          </Accordion>
        </RiseGroup>
      </div>
    </section>
  );
}

function Download() {
  const { t } = useTranslation();
  return (
    <section id={SECTIONS.DOWNLOAD} className="pb-24 md:pb-32">
      <div className={PAGE_WIDE}>
        <ClipPanel className="relative overflow-hidden bg-saffron">
          <div
            className="absolute inset-0 [background-image:radial-gradient(rgb(26_42_92/0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
            aria-hidden
          />
          <div className="relative grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
            <div className="space-y-7 px-7 py-12 sm:px-12 md:py-16">
              <Rise as="p" className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-navy/70">
                {t("home.download.eyebrow")}
              </Rise>
              <WordsReveal
                text={t("home.download.heading")}
                className="font-heading text-4xl font-bold uppercase leading-[1] tracking-[-0.02em] text-navy sm:text-5xl"
              />
              <Rise as="p" delay={0.2} className="max-w-md text-base text-navy/80 md:text-lg">
                {t("home.download.sub")}
              </Rise>
              <RiseGroup className="flex flex-wrap gap-3" stagger={0.1}>
                <RiseItem>
                  <StoreButton
                    platform="ios"
                    href={STORE_LINKS.ios}
                    small={t("home.download.iosSmall")}
                    label="App Store"
                    soonLabel={t("home.download.soon")}
                  />
                </RiseItem>
                <RiseItem>
                  <StoreButton
                    platform="android"
                    href={STORE_LINKS.android}
                    download={ANDROID_APK_FILENAME}
                    small={t(ANDROID_APK_FILENAME ? "home.download.apkSmall" : "home.download.androidSmall")}
                    label="Android"
                    soonLabel={t("home.download.soon")}
                  />
                </RiseItem>
              </RiseGroup>
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
              <motion.div
                className="w-[15rem] rounded-t-[2.25rem] border-[7px] border-b-0 border-ink bg-ink shadow-2xl lg:w-[17rem]"
                initial={{ y: 160, rotate: 10 }}
                whileInView={{ y: 24, rotate: 4 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <div className="aspect-[9/15] overflow-hidden rounded-t-[1.75rem] bg-paper">
                  <img src={heroScreen} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                </div>
              </motion.div>
            </div>
          </div>
        </ClipPanel>
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
      <TrustStrip />
      <HowItWorks />
      <Tontine />
      <Epargne />
      <Testimonials />
      <Faq />
      <Download />
    </>
  );
}
