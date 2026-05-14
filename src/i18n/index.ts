import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en";
import fi from "./locales/fi";
import sv from "./locales/sv";
import de from "./locales/de";
import fr from "./locales/fr";
import it from "./locales/it";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "fi", label: "Suomi", short: "FI" },
  { code: "sv", label: "Svenska", short: "SV" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
] as const;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fi: { translation: fi },
        sv: { translation: sv },
        de: { translation: de },
        fr: { translation: fr },
        it: { translation: it },
      },
      fallbackLng: "en",
      supportedLngs: LANGUAGES.map((l) => l.code),
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "posio-lang",
      },
    });
}

export default i18n;
