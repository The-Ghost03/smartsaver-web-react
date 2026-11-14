import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PAGE_WIDE } from "@/constants/layout";
import { fadeUp, stagger } from "@/lib/motion-variants";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
      <div
        className="ss-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]"
        aria-hidden
      />
      <motion.div
        className={`relative ${PAGE_WIDE} flex flex-col items-center text-center`}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-heading text-[7rem] font-semibold leading-none tracking-tighter text-navy sm:text-[9rem]"
        >
          4<span className="text-saffron">0</span>4
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-6 text-3xl sm:text-4xl">
          {t("notFound.title")}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-md text-muted-foreground">
          {t("notFound.description")}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.HOME}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Home className="size-4" aria-hidden />
            {t("notFound.home")}
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-sand outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("notFound.back")}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
