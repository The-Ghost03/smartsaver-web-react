import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Quote, Star } from "lucide-react";
import { PAGE_WIDE } from "@/constants/layout";
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

const LINK_ANDROID = "lien_vers_votre_apk_ou_play_store_ici";
const LINK_IOS = "lien_vers_votre_app_store_ici";

function getInitialOsData() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return {
      text: "Télécharger pour Android",
      link: LINK_ANDROID,
      isIos: false,
    };
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return {
      text: "Télécharger sur l’App Store",
      link: LINK_IOS,
      isIos: true,
    };
  }
  return {
    text: "Obtenir l’app",
    link: "#download",
    isIos: false,
  };
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

function TestimonialCard({ quote, name, role, fallback, fallbackClass }) {
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
            aria-label="5 sur 5 étoiles"
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
  const [osData] = useState(getInitialOsData);

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
                Application mobile
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.08]"
            >
              Gérez votre argent,{" "}
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
                simplement.
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg"
            >
              Tontines sécurisées et épargne flexible. Téléchargez SmartSaver et
              gardez le contrôle de vos finances.
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
                  className="rounded-full bg-[var(--accent)] px-6 text-[var(--primary)] shadow-[0_0_32px_-8px_var(--accent)] transition-shadow hover:bg-[var(--accent-hover)] hover:shadow-[0_0_40px_-6px_var(--accent)]"
                >
                  <a href={osData.link} className="gap-2">
                    <Download className="size-4" />
                    {osData.text}
                  </a>
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
                  <a href="#tontine">Découvrir</a>
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
                    alt="Aperçu de l’application SmartSaver"
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
                Tontine
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              La force du collectif pour vos projets.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground md:text-lg"
            >
              Cotisations régulières, ramassages transparents et notifications à
              chaque étape — le principe de la tontine, version numérique.
            </motion.p>
            <motion.ul
              className="space-y-4 pt-2 text-left"
              variants={listContainer}
            >
              <FeatureBullet>
                <strong className="text-foreground">Gains réguliers</strong> —
                Chaque cycle, un participant reçoit la cagnotte selon les règles
                du groupe.
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">Équité</strong> — Tours de
                ramassage clairs pour tous les membres.
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">Transparence</strong> —
                Suivi et alertes sur chaque versement.
              </FeatureBullet>
            </motion.ul>
          </motion.div>

          <motion.div
            className="w-full max-w-md flex-1"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Card className="border-border/80 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Exemple — Tontine 1&nbsp;000&nbsp;F</CardTitle>
                <CardDescription>
                  10 participants · ramassage groupé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                >
                  <Progress
                    value={100}
                    className="h-2 bg-muted [&_[data-slot=progress-indicator]]:bg-[var(--accent)] [&_[data-slot=progress-indicator]]:shadow-[0_0_12px_var(--accent)]"
                  />
                </motion.div>
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>10 participants</span>
                  <span>50&nbsp;000 FCFA / ramassage</span>
                </div>
              </CardContent>
            </Card>
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
              <Card className="border-0 bg-gradient-to-br from-primary to-[#111b3d] text-primary-foreground shadow-[0_24px_48px_-12px_rgba(26,42,92,0.35)] ring-1 ring-white/10">
                <CardHeader>
                  <CardTitle className="text-[var(--accent)]">
                    Mon épargne
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/70">
                    Objectif atteint
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pb-8 text-center">
                  <p className="text-4xl font-semibold tracking-tight md:text-5xl">
                    30&nbsp;000 FCFA
                  </p>
                  <p className="text-sm text-primary-foreground/75">
                    100&nbsp;%
                  </p>
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
                Épargne
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              À votre rythme, sans pression.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground md:text-lg"
            >
              Montant fixe ou libre, organisation par sprints et frais de
              retrait affichés clairement.
            </motion.p>
            <motion.ul
              className="space-y-4 pt-2 text-left"
              variants={listContainer}
            >
              <FeatureBullet>
                <strong className="text-foreground">Fixe ou libre</strong> —
                Vous choisissez comment épargner.
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">Sprints</strong> — Cycles
                avec possibilité de retrait en fin de période.
              </FeatureBullet>
              <FeatureBullet>
                <strong className="text-foreground">Frais clairs</strong> — Pas
                de mauvaise surprise au déblocage.
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
              Ils nous font confiance
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Retours d’utilisateurs SmartSaver.
            </p>
          </motion.div>

          <motion.div
            className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div
              variants={fadeUp}
              className="flex h-full min-h-0 w-full"
            >
              <TestimonialCard
                quote="Fini les disputes sur la tontine : notifications à chaque ramassage, tout est clair."
                name="Awa D."
                role="Commerçante"
                fallback="A"
                fallbackClass="bg-[#f7b731] text-[var(--primary)]"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex h-full min-h-0 w-full"
            >
              <TestimonialCard
                quote="L’épargne libre me convient : je dépose quand je peux et je récupère à la fin du sprint."
                name="Kouamé Y."
                role="Étudiant"
                fallback="K"
                fallbackClass="bg-[#1a2a5c]"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex h-full min-h-0 w-full"
            >
              <TestimonialCard
                quote="La validation des versements par l’admin rassure tout le groupe."
                name="Marc E."
                role="Entrepreneur"
                fallback="M"
                fallbackClass="bg-emerald-600"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Download */}
      <section
        id="download"
        className="relative bg-gradient-to-b from-muted/30 to-background px-4 py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(247,183,49,0.08),transparent)]" />
        <motion.div
          className={`relative z-10 ${PAGE_WIDE}`}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Card className="mx-auto max-w-2xl overflow-hidden border-0 bg-gradient-to-br from-primary via-primary to-[#0f1838] text-primary-foreground shadow-[0_32px_64px_-20px_rgba(26,42,92,0.45)] ring-1 ring-white/10">
            <CardContent className="space-y-6 p-8 text-center md:p-10">
              <motion.h2
                className="text-2xl font-semibold tracking-tight md:text-3xl"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                Prêt à commencer ?
              </motion.h2>
              <p className="text-sm text-primary-foreground/80 md:text-base">
                Rejoignez la communauté SmartSaver sur mobile.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[var(--accent)] text-[var(--primary)] shadow-[0_0_28px_-6px_var(--accent)] hover:bg-[var(--accent-hover)]"
                >
                  <a href={osData.link} className="gap-2">
                    <Download className="size-4" />
                    Télécharger SmartSaver
                  </a>
                </Button>
              </motion.div>
              {!osData.isIos && (
                <>
                  <Separator className="bg-primary-foreground/15" />
                  <p className="text-xs text-primary-foreground/65">
                    Fichier APK : autorisez l’installation depuis des sources
                    inconnues si votre appareil le demande.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
