
"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PwaInstallBanner() {
  const { lang, t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <p className="text-sm text-gray-700 mb-3">
          {t("pwa.banner_text")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-[#528185] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4a7378] transition"
          >
            {t("pwa.banner_install")}
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {t("pwa.banner_close")}
          </button>
        </div>
      </div>
    </div>
  );
}
