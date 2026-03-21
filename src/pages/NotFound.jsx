import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PAGE_WIDE } from "@/constants/layout";
import { notFoundPageFloaters } from "@/constants/marketing-floaters";
import { fadeUp } from "@/lib/motion-variants";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[min(90vh,720px)] overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="fx-grid-light absolute inset-0 opacity-[0.35]" />
        {notFoundPageFloaters.map((f, i) => (
          <motion.div
            key={`notfound-float-${i}`}
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
        className={`relative z-10 ${PAGE_WIDE} flex min-h-[min(75vh,600px)] flex-col items-center justify-center gap-8 text-center`}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          <p className="font-heading text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Page introuvable
          </h1>
          <p className="max-w-md text-muted-foreground">
            Cette adresse ne correspond à aucune page du site. Vérifiez l’URL ou
            revenez à l’accueil.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link to={ROUTES.HOME}>
              <Home className="size-4" aria-hidden />
              Accueil
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Page précédente
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
