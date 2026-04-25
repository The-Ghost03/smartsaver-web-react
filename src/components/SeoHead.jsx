import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL, absoluteUrl } from "@/constants/site";
import { pathnameToSeoKey } from "@/lib/seo-paths";

const OG_IMAGE_PATH = "/og.png";

/**
 * Métas par route : title, description, Open Graph, Twitter, JSON-LD, canonical.
 * Site : https://smartsaver.ci/
 */
export function SeoHead() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const key = pathnameToSeoKey(pathname);

  const { pageTitle, description, robots, ogImage } = useMemo(() => {
    const base = `seo.pages.${key}`;
    return {
      pageTitle: t(`${base}.title`),
      description: t(`${base}.description`),
      robots: key === "notFound" ? t(`${base}.robots`) : undefined,
      ogImage: `${SITE_URL}${OG_IMAGE_PATH}`,
    };
  }, [t, key]);

  const fullUrl = absoluteUrl(pathname);
  const ogLocale = i18n.language === "en" ? "en_US" : "fr_FR";
  const ogLocaleAlt = i18n.language === "en" ? "fr_FR" : "en_US";
  const htmlLang = i18n.language === "en" ? "en" : "fr";

  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: t("seo.siteName"),
        url: `${SITE_URL}/`,
        description: t("seo.orgDescription"),
        logo: `${SITE_URL}${OG_IMAGE_PATH}`,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: t("seo.siteName"),
        url: `${SITE_URL}/`,
        inLanguage: ["fr-CI", "en-CI"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": fullUrl,
        url: fullUrl,
        name: pageTitle,
        description,
        isPartOf: { "@id": siteId },
        inLanguage: htmlLang,
      },
    ],
  };

  return (
    <Helmet
      htmlAttributes={{ lang: htmlLang }}
      defaultTitle={t("seo.defaultTitle")}
    >
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      <link rel="canonical" href={fullUrl} />
      <meta name="theme-color" content={t("seo.themeColor")} />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t("seo.siteName")} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="apple-touch-icon" href={`${SITE_URL}/og.png`} />
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}
