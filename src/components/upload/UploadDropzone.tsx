"use client";

import { useState, useCallback, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface UploadDropzoneProps {
  onUpload: (files: File[]) => Promise<void>;
}

export default function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length === 0) return;

      setIsUploading(true);
      try {
        await onUpload(imageFiles);
        setUploadedCount(imageFiles.length);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      setIsDragging(true);
    },
    [handleDrag]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      setIsDragging(false);
    },
    [handleDrag]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      handleDrag(e);
      setIsDragging(false);

      if (e.dataTransfer.files) {
        await handleFiles(e.dataTransfer.files);
      }
    },
    [handleDrag, handleFiles]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-200 cursor-pointer
          ${
            isDragging
              ? "border-rose-500 bg-rose-50"
              : "border-gray-300 hover:border-rose-400 hover:bg-gray-50"
          }
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-rose-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Text */}
        <p className="text-lg text-gray-700 mb-2">
          {isUploading ? t("upload", "uploading") : t("upload", "dropzone")}
        </p>
        <p className="text-sm text-gray-500">
          JPG, PNG, HEIC • Max 10MB per foto
        </p>
      </div>

      {/* Upload status */}
      {isUploading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-rose-600">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{t("upload", "uploading")}</span>
          </div>
        </div>
      )}

      {/* Success message */}
      {uploadedCount > 0 && !isUploading && (
        <div className="mt-4 text-center text-green-600">
          <p>✓ {t("upload", "success")} ({uploadedCount} {uploadedCount === 1 ? "foto" : "fotos"})</p>
        </div>
      )}
    </div>
  );
}
