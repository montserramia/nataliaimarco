  const handleUpload = async (files: File[]) => {
    setUploadStatus("uploading");

    try {
      for (const file of files) {
        console.log("Uploading file:", file.name, file.type);

        // Validació de tipus i mida
        if (file.type.startsWith('video/')) {
          if (file.size > 50 * 1024 * 1024) { // 50MB
            throw new Error(t("upload", "video_too_large"));
          }
        } else if (file.type.startsWith('image/')) {
          if (file.size > 10 * 1024 * 1024) { // 10MB
            throw new Error(t("upload", "image_too_large"));
          }
        } else {
          throw new Error(t("upload", "invalid_file_type"));
        }

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
          throw new Error(t("upload", "failed_presigned_url"));
        }

        const { uploadUrl, publicUrl, key } = await presignedResponse.json();
        console.log("Got presigned URL:", uploadUrl.substring(0, 50) + "...");

        // Step 2: Upload file to R2 using presigned URL
        let uploadResponse;
        try {
          uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
        } catch (error) {
          console.error("Network error during upload to R2:", error);
          // Només mostrar detalls específics en entorn de desenvolupament
          if (process.env.NODE_ENV === 'development') {
            alert("There was an error connecting to the file storage service. Please make sure your environment variables are correctly configured.\n\nError: " + (error instanceof Error ? error.message : String(error)));
          } else {
            alert("There was an error connecting to the file storage service. Please try again later.");
          }
          throw new Error(`Network error during upload: ${error instanceof Error ? error.message : String(error)}`);
        }

        console.log("R2 upload response status:", uploadResponse.status);

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text().catch(() => "Unknown error");
          console.error("R2 upload error:", errorText);
          console.error("R2 upload response status:", uploadResponse.status);
          throw new Error(`R2 upload failed with status ${uploadResponse.status}: ${errorText}`);
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
            mediaType: file.type.startsWith('video/') ? 'video' : 'image', // Afegir tipus de mitjà
          }),
        });

        console.log("Metadata save response:", metadataResponse.status);
        
        if (!metadataResponse.ok) {
          const errorData = await metadataResponse.json();
          console.error("Metadata save error:", errorData);
          throw new Error(t("upload", "failed_metadata_save"));
        }
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