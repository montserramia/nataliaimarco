"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import UploadDropzone from "@/components/upload/UploadDropzone";

export default function UploadPage() {
  const { t } = useLanguage();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleUpload = async (files: File[]) => {
    setUploadStatus("uploading");

    try {
      for (const file of files) {
        console.log("Uploading file:", file.name, file.type);

        // Step 1: Get presigned URL
        const presignedResponse = await fetch("/api/presigned-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
          }),
        });

        console.log("Presigned URL response status:", presignedResponse.status);

        if (!presignedResponse.ok) {
          const errorData = await presignedResponse.json().catch(() => ({}));
          console.error("Presigned URL error:", errorData);
          throw new Error(`Failed to get upload URL: ${presignedResponse.status} ${JSON.stringify(errorData)}`);
        }

        const { uploadUrl, publicUrl, key } = await presignedResponse.json();
        console.log("Got presigned URL:", uploadUrl.substring(0, 50) + "...");

        // Step 2: Upload file to R2 using presigned URL
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        console.log("R2 upload response status:", uploadResponse.status);

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("R2 upload error:", errorText);
          throw new Error(`Failed to upload file: ${uploadResponse.status} - ${errorText}`);
        }

        console.log("File uploaded successfully to:", publicUrl);

        // Step 3: Save metadata to database
        const metadataResponse = await fetch("/api/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
            publicUrl,
            alt: file.name,
          }),
        });

        console.log("Metadata save response:", metadataResponse.status);
      }

      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
      throw error; // Re-throw to show error in UI
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("upload", "title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("upload", "subtitle")}
          </p>
        </div>

        {/* Upload Dropzone */}
        <UploadDropzone onUpload={handleUpload} />

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center text-green-700">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t("upload", "success")}
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t("upload", "error")}
          </div>
        )}

        {/* Info */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Comparteix els teus moments</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Pots pujar múltiples fotos alhora
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Formats suportats: JPG, PNG, HEIC
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mida màxima: 10MB per foto
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
