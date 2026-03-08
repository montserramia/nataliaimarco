"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Locale } from "@/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "ca", label: "Català", flag: "🇪🇸" },
    { code: "es", label: "Castellà", flag: "🇪🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">
        {languages.find((l) => l.code === locale)?.flag}
      </span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-transparent text-sm text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
