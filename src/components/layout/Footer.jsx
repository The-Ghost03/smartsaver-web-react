import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ROUTES, SECTIONS } from "@/constants/routes";
import { CONTACT } from "@/constants/site";
import { PAGE_WIDE } from "@/constants/layout";
import { images } from "@/lib/images";
import { SectionLink } from "./SectionLink";

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 border-t border-border bg-card">
      <div className={`${PAGE_WIDE} py-14 md:py-16`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link to={ROUTES.HOME} className="inline-block">
              <img
                src={images.logo}
                alt="SmartSaver"
                className="h-10 w-auto"
                width={170}
                height={40}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.blurb")}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              {t("footer.product")}
            </h2>
            <ul className="space-y-2.5">
              <li>
                <SectionLink section={SECTIONS.TONTINE} className={linkClass}>
                  {t("header.nav.tontine")}
                </SectionLink>
              </li>
              <li>
                <SectionLink section={SECTIONS.EPARGNE} className={linkClass}>
                  {t("header.nav.epargne")}
                </SectionLink>
              </li>
              <li>
                <SectionLink section={SECTIONS.DOWNLOAD} className={linkClass}>
                  {t("header.downloadApp")}
                </SectionLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              {t("footer.contact")}
            </h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-navy" aria-hidden />
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-navy" aria-hidden />
                <a href={`tel:${CONTACT.phone}`} className={linkClass}>
                  {CONTACT.phoneLabel}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-navy" aria-hidden />
                <span>{t("footer.location")}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              {t("footer.legal")}
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link to={ROUTES.CGU} className={linkClass}>
                  {t("footer.cgu")}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRIVACY} className={linkClass}>
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.LEGAL} className={linkClass}>
                  {t("footer.mentions")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{t("footer.copyright")}</p>
          <p>
            {t("footer.designBy")}{" "}
            <a
              href="https://softskills.ci/"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Softskills
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
