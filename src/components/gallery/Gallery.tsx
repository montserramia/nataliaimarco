"use client";

import { useState } from "react";
import Image from "next/image";

export interface MediaItem {
  id: string;
  url: string;
  alt?: string;
  type: string; // 'image' or 'video'
  uploadedAt: Date;
}

interface GalleryProps {
  photos: MediaItem[];
  loading?: boolean;
}

export default function Gallery({ photos, loading = false }: GalleryProps) {
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="aspect-square relative rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {photo.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
                <video 
                  src={photo.url} 
                  className="object-cover w-full h-full opacity-80"
                  muted
                  preload="none"
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
              <Image
                src={photo.url}
                alt={photo.alt || "Wedding media"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
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
              />
            ) : (
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt || "Wedding media"}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}