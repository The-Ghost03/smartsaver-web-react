/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origine de l’API (sans slash final), ex. https://smartsaver.exemple */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
