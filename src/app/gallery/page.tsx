import RefreshableGallery from '@/components/gallery/RefreshableGallery';

export default function GalleryPage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Galeria
        </h1>
        <p className="text-xl text-gray-600">
          Compartiu moments únics del gran dia
        </p>
      </div>

      <RefreshableGallery />
    </div>
  );
}