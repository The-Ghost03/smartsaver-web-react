import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { PAGE_WIDE } from "@/constants/layout";
import {
  isEmailJsConfigured,
  sendAvantPremiereLead,
} from "@/lib/emailjs-notify";
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

/** Local midnight — launch / availability date for the avant-première countdown. */
const AVANT_PREMIERE_END = new Date(2026, 4, 1, 0, 0, 0, 0);

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
  const { t } = useTranslation();
  const { days, hours, minutes, seconds, ended } =
    useCountdown(AVANT_PREMIERE_END);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const em = email.trim();
    const ph = phone.replace(/\s/g, "").trim();

    if (!em && !ph) {
      setError(t("avantPremiere.errBoth"));
      return;
    }
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError(t("avantPremiere.errEmail"));
      return;
    }
    if (ph && ph.length < 8) {
      setError(t("avantPremiere.errPhone"));
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading(t("avantPremiere.toastLoadingTitle"), {
      description: t("avantPremiere.toastLoadingDesc"),
    });
    try {
      if (!isEmailJsConfigured()) {
        toast.error(t("avantPremiere.toastErrorTitle"), {
          id: toastId,
          description: t("avantPremiere.toastErrEmailJsConfig"),
        });
        return;
      }
      const res = await sendAvantPremiereLead({ email: em, phone: ph });
      if (res.status !== 200) {
        throw new Error("EMAILJS_STATUS");
      }
      toast.success(t("avantPremiere.toastSuccessTitle"), {
        id: toastId,
        description: t("avantPremiere.toastSuccessDesc"),
      });
      setSent(true);
      setEmail("");
      setPhone("");
    } catch (e) {
      const code = e?.code || e?.message;
      if (code === "EMAILJS_NOT_CONFIGURED") {
        toast.error(t("avantPremiere.toastErrorTitle"), {
          id: toastId,
          description: t("avantPremiere.toastErrEmailJsConfig"),
        });
      } else {
        toast.error(t("avantPremiere.toastErrorTitle"), {
          id: toastId,
          description: t("avantPremiere.toastErrorDesc"),
        });
      }
    } finally {
      setSubmitting(false);
    }
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
              {t("avantPremiere.badge")}
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("avantPremiere.pre")}
            <span className="bg-linear-to-r from-[var(--accent)] to-amber-200 bg-clip-text text-transparent">
              {t("avantPremiere.post")}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-muted-foreground md:text-lg"
          >
            <Trans
              i18nKey="avantPremiere.sub"
              components={[
                <strong className="font-medium text-foreground" key="s0" />,
              ]}
            />
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
                {t("avantPremiere.countdown")}
              </CardTitle>
              <CardDescription>
                {ended
                  ? t("avantPremiere.countdownEnd")
                  : t("avantPremiere.countdownOn")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ended ? (
                <p className="text-center text-sm text-muted-foreground">
                  {t("avantPremiere.countdownDone")}
                </p>
              ) : (
                <div
                  className="flex flex-wrap justify-center gap-2 sm:gap-3"
                  role="timer"
                  aria-label={t("avantPremiere.timerLabel")}
                >
                  <CountdownBlock
                    value={days}
                    label={t("avantPremiere.days")}
                  />
                  <CountdownBlock
                    value={hours}
                    label={t("avantPremiere.hours")}
                  />
                  <CountdownBlock
                    value={minutes}
                    label={t("avantPremiere.minutes")}
                  />
                  <CountdownBlock
                    value={seconds}
                    label={t("avantPremiere.seconds")}
                  />
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
              <CardTitle className="text-lg">
                {t("avantPremiere.notify")}
              </CardTitle>
              <CardDescription>
                {t("avantPremiere.notifyDescription")}
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
                    {t("avantPremiere.success")}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="space-y-4"
                  noValidate
                  aria-busy={submitting}
                >
                  <div className="space-y-2">
                    <Label htmlFor="notify-email">
                      {t("avantPremiere.labelEmail")}
                    </Label>
                    <Input
                      id="notify-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={t("avantPremiere.placeholderEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Separator className="shrink" />
                    <span className="shrink-0 font-medium">
                      {t("avantPremiere.or")}
                    </span>
                    <Separator className="shrink" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notify-phone">
                      {t("avantPremiere.labelPhone")}
                    </Label>
                    <Input
                      id="notify-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={t("avantPremiere.placeholderPhone")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-describedby="notify-phone-hint"
                    />
                    <p
                      id="notify-phone-hint"
                      className="text-xs text-muted-foreground"
                    >
                      {t("avantPremiere.whatsappHint")}
                    </p>
                  </div>
                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full cursor-pointer gap-2 rounded-full bg-[var(--accent)] text-[var(--primary)] shadow-[0_0_24px_-8px_var(--accent)] transition-[background-color,box-shadow,filter] hover:bg-[var(--accent-hover)] hover:brightness-[1.03] disabled:opacity-60"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="size-4 shrink-0 animate-spin"
                          aria-hidden
                        />
                        {t("avantPremiere.submitLoading")}
                      </>
                    ) : (
                      t("avantPremiere.submit")
                    )}
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
            {t("avantPremiere.backHome")}
          </Link>
        </p>
      </div>
    </div>
  );
}
