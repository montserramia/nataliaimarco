"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Locale, TranslationKey } from "./translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, subkey?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ca");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("wedding-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, subkey?: string): string => {
      const translation = translations[locale][key];
      if (typeof translation === "string") return translation;
      if (subkey && typeof translation === "object") {
        return (translation as Record<string, string>)[subkey] || "";
      }
      return "";
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
