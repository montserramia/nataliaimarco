'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Gallery from '@/components/gallery/Gallery';
import { MediaItem } from '@/components/gallery/Gallery';

const PAGE_SIZE = 20;

export default function RefreshableGallery() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Càrrega inicial
  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos?page=1');
      const data = await response.json();
      setPhotos(data.photos || []);
      setPage(1);
      setHasMore(data.pagination?.hasMore ?? false);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Càrrega de la pàgina següent
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const response = await fetch(`/api/photos?page=${nextPage}`);
      const data = await response.json();

      setPhotos(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPhotos = (data.photos || []).filter((p: MediaItem) => !existingIds.has(p.id));
        return [...prev, ...newPhotos];
      });
      setPage(nextPage);
      setHasMore(data.pagination?.hasMore ?? false);
    } catch (error) {
      console.error('Error loading more photos:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  // Actualització local del favorit — sense fer cap fetch addicional
  const handleFavoriteUpdate = useCallback((photoId: string) => {
    setPhotos(prev =>
      prev.map(p =>
        p.id === photoId
          ? { ...p, favoriteCount: p.favoriteCount + 1 }
          : p
      )
    );
  }, []);

  // Càrrega inicial
  useEffect(() => {
    loadPhotos();
  }, []);

  // IntersectionObserver: detecta quan el sentinel és visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  return (
    <>
      <Gallery
        photos={photos}
        loading={loading}
        onFavoriteUpdate={handleFavoriteUpdate}
      />

      {/* Sentinel — element invisible que dispara la càrrega de més fotos */}
      <div ref={sentinelRef} className="h-4" />

      {/* Indicador de càrrega de més fotos */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Carregant més fotos...</span>
          </div>
        </div>
      )}

      {/* Missatge quan ja no hi ha més fotos */}
      {!hasMore && photos.length > PAGE_SIZE && (
        <p className="text-center text-sm text-gray-400 py-8">
          Has vist totes les fotos 🎉
        </p>
      )}
    </>
  );
}