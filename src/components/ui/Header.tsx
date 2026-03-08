"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { t, locale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#C2D9D1]/30">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link 
            href="/" 
            className="text-2xl font-semibold transition-colors"
            style={{ 
              fontFamily: 'var(--font-great-vibes)',
              color: '#528185'
            }}
          >
            Natàlia & Marco
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm transition-colors hover:text-[#528185]"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em',
                color: '#171717'
              }}
            >
              {t("nav", "home")}
            </Link>
            <Link
              href="/gallery"
              className="text-sm transition-colors hover:text-[#528185]"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em',
                color: '#171717'
              }}
            >
              {t("nav", "gallery")}
            </Link>
            <Link
              href="/upload"
              className="px-6 py-2 rounded-full text-sm transition-all hover:shadow-md"
              style={{ 
                backgroundColor: '#528185',
                color: '#FEFEFE',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em'
              }}
            >
              {t("nav", "upload")}
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: '#528185' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-[#C2D9D1]/30 pt-4">
            <Link
              href="/"
              className="text-sm py-2 transition-colors hover:text-[#528185]"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav", "home")}
            </Link>
            <Link
              href="/gallery"
              className="text-sm py-2 transition-colors hover:text-[#528185]"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav", "gallery")}
            </Link>
            <Link
              href="/upload"
              className="px-6 py-3 rounded-full text-sm text-center transition-all"
              style={{ 
                backgroundColor: '#528185',
                color: '#FEFEFE',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.1em'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav", "upload")}
            </Link>
            
            <div className="pt-4 border-t border-[#C2D9D1]/30">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages: { code: string; label: string; flag: string }[] = [
    { code: "ca", label: "CA", flag: "🇪🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "it", label: "IT", flag: "🇮🇹" },
  ];

  return (
    <div className="flex items-center gap-2">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        className="text-xs rounded-full border border-[#C2D9D1] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#528185]/50 transition-all"
        style={{ 
          fontFamily: 'var(--font-cinzel)',
          letterSpacing: '0.05em',
          backgroundColor: '#FEFEFE'
        }}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
