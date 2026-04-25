/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origine de l’API (sans slash final), ex. https://smartsaver.exemple */
  readonly VITE_API_BASE_URL?: string
  /** URL publique du site (canonical, OG, sitemap), ex. https://smartsaver.ci */
  readonly VITE_SITE_URL?: string
  /** EmailJS — identifiants publics (dashboard EmailJS) */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
