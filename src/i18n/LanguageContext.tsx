"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { translations, Locale, TranslationKey } from "./translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, subkey?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detectar idioma del navegador
function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'ca';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.includes('ca') || browserLang.includes('valencia')) return 'ca';
  if (browserLang.includes('es') || browserLang.includes('spanish')) return 'es';
  if (browserLang.includes('it') || browserLang.includes('italian')) return 'it';
  
  // Default: català
  return 'ca';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ca');
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar idioma guardat o detectar del navegador
  useEffect(() => {
    const savedLocale = localStorage.getItem('wedding-locale') as Locale | null;
    
    if (savedLocale && ['ca', 'es', 'it'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      const browserLocale = getBrowserLocale();
      setLocaleState(browserLocale);
    }
    
    setIsInitialized(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('wedding-locale', newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, subkey?: string): string => {
      const translation = translations[locale][key];
      if (typeof translation === 'string') return translation;
      if (subkey && typeof translation === 'object') {
        return (translation as Record<string, string>)[subkey] || '';
      }
      return '';
    },
    [locale]
  );

  // No renderitzar fins que estigui inicialitzat
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
