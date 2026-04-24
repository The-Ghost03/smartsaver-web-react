import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "@/locales/fr.js";
import en from "@/locales/en.js";

const STORAGE_KEY = "smartsaver_i18n_lang";

function readStoredLanguage() {
  if (typeof localStorage === "undefined") return "fr";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "en" || v === "fr") return v;
  return "fr";
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: readStoredLanguage(),
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lng);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "en" ? "en" : "fr";
  }
});

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language === "en" ? "en" : "fr";
}

export default i18n;
