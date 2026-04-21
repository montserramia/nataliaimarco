'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function PWAGuideBanner() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    
    // Afegir event listener per a l'event 'beforeinstallprompt'
    window.addEventListener("beforeinstallprompt", handler);
    
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Mostrar el prompt d'instal·lació
    (deferredPrompt as any).prompt();
    
    const { outcome } = await (deferredPrompt as any).userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-wedding-secondary p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 flex-1 max-w-2xl">
            {t("pwa", "banner_text")}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-wedding-primary text-white rounded-lg text-sm font-medium hover:bg-[#4a7378] transition"
            >
              {t("pwa", "banner_install")}
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              {t("pwa", "banner_close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}