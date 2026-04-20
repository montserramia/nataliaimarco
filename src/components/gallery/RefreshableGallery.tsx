'use client';

import { useState, useEffect } from 'react';
import Gallery from '@/components/gallery/Gallery';
import { MediaItem } from '@/components/gallery/Gallery';

export default function RefreshableGallery() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos');
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar les fotos quan el component es munti
  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <Gallery 
      photos={photos} 
      loading={loading} 
      onRefresh={loadPhotos} 
    />
  );
}