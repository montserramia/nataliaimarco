"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import Gallery, { Photo } from "@/components/gallery/Gallery";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();

    // Auto-refresh every 10 seconds during the event
    const interval = setInterval(fetchPhotos, 10000);
    return () => clearInterval(interval);
  }, [fetchPhotos]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("gallery", "title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("gallery", "subtitle")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            🔄 La galeria s'actualitza automàticament cada 10 segons
          </p>
        </div>

        {/* Gallery */}
        <Gallery photos={photos} loading={loading} />
      </div>
    </div>
  );
}
