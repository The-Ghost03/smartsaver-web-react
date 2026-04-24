import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, Smartphone } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PAGE_WIDE } from "@/constants/layout";
import { fadeUp, listContainer } from "@/lib/motion-variants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function useCountdown(target) {
  const [parts, setParts] = useState(() => getParts(target));

  const tick = useCallback(() => {
    setParts(getParts(target));
  }, [target]);

  useEffect(() => {
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  return parts;
}

function getParts(target) {
  const now = Date.now();
  const diff = Math.max(0, target.getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    ended: diff <= 0,
  };
}

function CountdownBlock({ value, label }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl border border-border/50 bg-card/40 px-2 py-3 shadow-sm backdrop-blur-sm sm:px-4 sm:py-4">
      <span className="font-heading text-2xl font-semibold tabular-nums sm:text-3xl md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function AvantPremiere() {
  const endDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const { days, hours, minutes, seconds, ended } = useCountdown(endDate);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const em = email.trim();
    const ph = phone.replace(/\s/g, "").trim();

    if (!em && !ph) {
      setError("Renseignez une adresse e-mail ou un numéro de téléphone.");
      return;
    }
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (ph && ph.length < 8) {
      setError("Numéro de téléphone trop court.");
      return;
    }

    setSubmitting(true);
    // Branche ici un appel API (newsletter / SMS) quand le backend existera.
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setEmail("");
      setPhone("");
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100dvh-8rem)] overflow-hidden border-b border-border/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(26,42,92,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(247,183,49,0.14),transparent)]" />
        <div className="fx-grid-light absolute inset-0 opacity-[0.35]" />
      </div>

      <div
        className={`relative z-10 ${PAGE_WIDE} flex flex-col gap-12 py-16 md:gap-16 md:py-24`}
      >
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={listContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-4 border-primary/25 bg-primary/5 text-primary"
            >
              <Smartphone className="size-3.5" aria-hidden />
              Application mobile
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Avant-
            <span className="bg-linear-to-r from-[var(--accent)] to-amber-200 bg-clip-text text-transparent">
              première
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-muted-foreground md:text-lg"
          >
            L’application SmartSaver sera disponible dans{" "}
            <strong className="font-medium text-foreground">14 jours</strong>.{" "}
            Soyez averti dès qu’elle est en ligne.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="overflow-hidden rounded-[1.5rem] border-border/50 bg-card/50 shadow-lg shadow-primary/6 ring-1 ring-border/30 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-1 flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Clock className="size-5" aria-hidden />
              </div>
              <CardTitle className="text-lg md:text-xl">
                Compte à rebours
              </CardTitle>
              <CardDescription>
                {ended
                  ? "C’est l’heure de télécharger SmartSaver."
                  : "Temps restant avant la sortie estimée."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ended ? (
                <p className="text-center text-sm text-muted-foreground">
                  Ouvrez la page d’accueil pour le lien de téléchargement.
                </p>
              ) : (
                <div
                  className="flex flex-wrap justify-center gap-2 sm:gap-3"
                  role="timer"
                  aria-label="Temps restant avant le lancement"
                >
                  <CountdownBlock value={days} label="Jours" />
                  <CountdownBlock value={hours} label="Heures" />
                  <CountdownBlock value={minutes} label="Minutes" />
                  <CountdownBlock value={seconds} label="Secondes" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="rounded-[1.5rem] border-border/50">
            <CardHeader>
              <div className="mb-0.5 flex size-9 items-center justify-center rounded-xl bg-(--accent)/15 text-(--accent)">
                <Bell className="size-4" aria-hidden />
              </div>
              <CardTitle className="text-lg">Être prévenu</CardTitle>
              <CardDescription>
                E-mail et/ou téléphone — au moins un des deux. Pas de spam.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div
                  className="flex flex-col items-center gap-3 py-2 text-center"
                  role="status"
                >
                  <CheckCircle2
                    className="size-10 text-emerald-600"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-foreground">
                    Merci ! On vous tient informé dès l’ouverture.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="notify-email">E-mail</Label>
                    <Input
                      id="notify-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Separator className="shrink" />
                    <span className="shrink-0 font-medium">et/ou</span>
                    <Separator className="shrink" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notify-phone">Téléphone</Label>
                    <Input
                      id="notify-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+225 …"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-[var(--accent)] text-[var(--primary)] shadow-[0_0_24px_-8px_var(--accent)] transition-[background-color,box-shadow,filter] hover:bg-[var(--accent-hover)] hover:brightness-[1.03] disabled:opacity-60 cursor-pointer"
                    disabled={submitting}
                  >
                    {submitting ? "Envoi…" : "M’avertir au lancement"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground">
          <Link
            to={ROUTES.HOME}
            className={cn(
              "font-medium text-primary underline-offset-4 hover:underline",
            )}
          >
            Retour à l’accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
