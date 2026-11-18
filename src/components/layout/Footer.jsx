import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { ROUTES, SECTIONS } from "@/constants/routes";
import { CONTACT } from "@/constants/site";
import { PAGE_WIDE } from "@/constants/layout";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./LanguageSwitch";
import { SectionLink } from "./SectionLink";

const YEAR = new Date().getFullYear();

const linkClass =
  "group inline-flex items-center gap-1.5 rounded-sm text-sm text-white/65 transition-colors hover:text-saffron outline-none focus-visible:text-saffron focus-visible:ring-2 focus-visible:ring-saffron/50";

const headingClass =
  "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-saffron";

/* ------------------------------------------------------------------ */
/* Anneau de tontine : chaque pastille est un membre, la pastille      */
/* safran fait le tour — c’est le « ramassage » qui passe de main en   */
/* main. Purement décoratif.                                           */
/* ------------------------------------------------------------------ */
const RING_MEMBERS = 10;

function TontineRing({ className }) {
  const r = 42;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="1 3" />
      {Array.from({ length: RING_MEMBERS }, (_, i) => {
        const a = (i / RING_MEMBERS) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={50 + r * Math.cos(a)}
            cy={50 + r * Math.sin(a)}
            r="3.2"
            fill="currentColor"
            fillOpacity="0.22"
          />
        );
      })}
      <g
        className="animate-spin animation-duration-[24s] motion-reduce:animate-none"
        style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}
      >
        <circle cx="50" cy={50 - r} r="9" fill="var(--saffron)" fillOpacity="0.18" />
        <circle cx="50" cy={50 - r} r="5.5" fill="var(--saffron)" />
      </g>
      <circle cx="50" cy="50" r="14" fill="var(--saffron)" fillOpacity="0.08" />
      <circle cx="50" cy="50" r="6" fill="var(--saffron)" fillOpacity="0.5" />
    </svg>
  );
}

function WhatsAppGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44M20.1 3.9A11.32 11.32 0 0 0 12.05.56C5.78.56.67 5.66.67 11.94c0 2 .53 3.96 1.52 5.69L.57 23.5l6.02-1.58a11.36 11.36 0 0 0 5.45 1.39h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.33-8.04" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function CopyEmailButton() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      toast.success(t("footer.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t("footer.copyEmail")}
      title={t("footer.copyEmail")}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-saffron outline-none focus-visible:ring-2 focus-visible:ring-saffron/50"
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
    </button>
  );
}

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Footer() {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/${CONTACT.phone.replace(/\D/g, "")}`;

  const nav = [
    { section: SECTIONS.HOW, label: t("header.nav.how") },
    { section: SECTIONS.TONTINE, label: t("header.nav.tontine") },
    { section: SECTIONS.EPARGNE, label: t("header.nav.epargne") },
    { section: SECTIONS.REVIEWS, label: t("header.nav.temoignages") },
    { section: SECTIONS.FAQ, label: t("header.nav.faq") },
  ];

  const legal = [
    { to: ROUTES.CGU, label: t("footer.cgu") },
    { to: ROUTES.PRIVACY, label: t("footer.privacy") },
    { to: ROUTES.LEGAL, label: t("footer.mentions") },
  ];

  const trust = [
    { icon: ShieldCheck, label: t("footer.trust.kyc") },
    { icon: Lock, label: t("footer.trust.data") },
    { icon: Smartphone, label: t("footer.trust.platforms") },
  ];

  return (
    <footer className="relative z-10 overflow-hidden bg-ink text-white">
      {/* Décor : trame de points + halos */}
      <div className="ss-dots-light pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-128 rounded-full bg-saffron/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-48 left-[-8%] size-112 rounded-full bg-navy-soft/30 blur-3xl" aria-hidden />

      <div className={cn(PAGE_WIDE, "relative pt-14 md:pt-20")}>
        {/* ---------- Bandeau d’appel à l’action ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-navy to-navy-deep p-7 sm:p-10 md:p-12"
        >
          <TontineRing className="pointer-events-none absolute -right-10 -top-10 size-56 text-white sm:size-64 md:right-6 md:top-1/2 md:size-72 md:-translate-y-1/2" />

          <div className="relative max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-saffron">
              <span className="size-1.5 rounded-full bg-saffron" aria-hidden />
              {t("footer.cta.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl md:text-[2.75rem]">
              {t("footer.cta.titleStart")}{" "}
              <span className="text-saffron">{t("footer.cta.titleAccent")}</span>
            </h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/70">
              {t("footer.cta.text")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SectionLink
                section={SECTIONS.DOWNLOAD}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-saffron px-6 text-sm font-semibold text-navy transition-colors hover:bg-white outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <Download className="size-4" aria-hidden />
                {t("header.downloadApp")}
              </SectionLink>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <WhatsAppGlyph className="size-4 text-[#25d366]" />
                {t("footer.cta.whatsapp")}
              </a>
            </div>
          </div>
        </motion.div>

        {/* ---------- Colonnes ---------- */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-[1.5fr_1fr_1.25fr_1fr]">
          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={0}
          >
            <Link
              to={ROUTES.HOME}
              className="inline-block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-saffron/50"
            >
              <img
                src={images.logo}
                alt="SmartSaver"
                className="h-10 w-auto brightness-0 invert"
                width={170}
                height={40}
                loading="lazy"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">{t("footer.blurb")}</p>
            <ul className="flex flex-wrap gap-2">
              {trust.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-white/75"
                  >
                    <Icon className="size-3.5 text-saffron" aria-hidden />
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.nav
            aria-label={t("footer.product")}
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={1}
          >
            <h2 className={headingClass}>{t("footer.product")}</h2>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.section}>
                  <SectionLink section={item.section} className={linkClass}>
                    <span className="h-px w-0 bg-saffron transition-all duration-300 group-hover:w-3" aria-hidden />
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={2}
          >
            <h2 className={headingClass}>{t("footer.contact")}</h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-white/40" aria-hidden />
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
                <CopyEmailButton />
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-white/40" aria-hidden />
                <a href={`tel:${CONTACT.phone}`} className={linkClass}>
                  {CONTACT.phoneLabel}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppGlyph className="size-4 shrink-0 text-white/40" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                  <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-white/40" aria-hidden />
                <span>{t("footer.location")}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={3}
          >
            <h2 className={headingClass}>{t("footer.legal")}</h2>
            <ul className="space-y-2.5" aria-label={t("footer.legal")}>
              {legal.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <span className="h-px w-0 bg-saffron transition-all duration-300 group-hover:w-3" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <p className="mb-2 text-xs text-white/45">{t("common.languageSwitch")}</p>
              <LanguageSwitch tone="dark" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Signature géante ---------- */}
      <div className="relative mt-12 select-none overflow-hidden md:mt-16" aria-hidden>
        <p className="whitespace-nowrap text-center font-heading text-[19vw] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.12)] lg:text-[17vw]">
          Smart<span className="[-webkit-text-stroke:1px_rgb(247_183_49/0.45)]">Saver</span>
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink to-transparent" />
      </div>

      {/* ---------- Barre de bas de page ---------- */}
      <div className="relative border-t border-white/10">
        <div className={cn(PAGE_WIDE, "flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row")}>
          <p className="text-center md:text-left">{t("footer.copyright", { year: YEAR })}</p>

          <p className="inline-flex items-center gap-1.5">
            {t("footer.madeIn.start")}
            <Heart className="size-3.5 fill-saffron text-saffron" aria-label={t("footer.madeIn.love")} />
            {t("footer.madeIn.end")}
            <span className="mx-1.5 text-white/20" aria-hidden>·</span>
            {t("footer.designBy")}{" "}
            <a
              href="https://softskills.ci/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline-offset-4 hover:underline outline-none focus-visible:underline"
            >
              Softskills
            </a>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full text-white/60 transition-colors hover:text-saffron outline-none focus-visible:text-saffron"
          >
            {t("footer.top")}
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-saffron group-hover:bg-saffron group-hover:text-navy">
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
