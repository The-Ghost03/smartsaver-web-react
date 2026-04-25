/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origine de l’API (sans slash final), ex. https://smartsaver.exemple */
  readonly VITE_API_BASE_URL?: string
  /** URL publique du site (canonical, OG, sitemap), ex. https://smartsaver.ci */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
