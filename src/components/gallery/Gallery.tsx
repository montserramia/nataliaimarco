"use client";

import { useState } from "react";

export interface MediaItem {
  id: string;
  url: string;
  alt?: string;
  type: string; // 'image' or 'video'
  favoriteCount: number;
  uploadedAt: Date;
}

interface GalleryProps {
  photos: MediaItem[];
  loading?: boolean;
  onRefresh?: () => void;
  onFavoriteUpdate?: (photoId: string) => void;
}

export default function Gallery({ photos, loading = false, onRefresh, onFavoriteUpdate }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg">No hi ha contingut encara</p>
        <p className="text-sm mt-2">Sigues el primer en pujar una foto o vídeo!</p>
      </div>
    );
  }

  const handleFavoriteClick = async (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await fetch(`/api/photos/${photoId}/favorite`, {
        method: 'POST',
      });

      if (response.ok) {
        if (onFavoriteUpdate) {
          onFavoriteUpdate(photoId);
        } else if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  // Amaga el contenidor si la imatge no pot carregar (ex: HEIC en Chrome/Android)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const container = (e.target as HTMLElement).closest(".media-item-container");
    if (container) {
      (container as HTMLElement).style.display = "none";
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="media-item-container aspect-square relative rounded-lg overflow-hidden group hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Botó de favorits */}
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={(e) => handleFavoriteClick(photo.id, e)}
                className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all"
                aria-label="Mark as favorite"
              >
                <svg
                  className={`w-5 h-5 ${photo.favoriteCount > 0 ? 'text-yellow-400 fill-current' : 'text-white'}`}
                  fill={photo.favoriteCount > 0 ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                {photo.favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {photo.favoriteCount}
                  </span>
                )}
              </button>
            </div>

            {/* Element multimèdia */}
            <button
              onClick={() => setSelectedPhoto(photo)}
              className="w-full h-full block grow"
            >
              {photo.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
                  <video
                    src={photo.url}
                    className="object-cover w-full h-full opacity-80"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ) : (
                // img natiu: serveix directament des de Cloudflare R2, sense passar per Vercel
                <img
                  src={photo.url}
                  alt={photo.alt || "Wedding media"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={handleImageError}
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPhoto.type === 'video' ? (
              <video
                src={selectedPhoto.url}
                controls
                className="w-full h-auto max-h-[90vh] object-contain"
                autoPlay
              />
            ) : (
              // img natiu també al lightbox
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.alt || "Wedding media"}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}