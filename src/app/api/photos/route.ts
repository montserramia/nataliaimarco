import { NextResponse } from "next/server";
import { insertPhoto, getAllPhotos, photoExists, initDatabase } from "@/lib/db";

// Inicialitzar la base de dades al primer request
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export async function POST(request: Request) {
  try {
    await ensureDbInitialized();
    
    const { key, publicUrl, alt } = await request.json();

    if (!key || !publicUrl) {
      return NextResponse.json(
        { error: "key and publicUrl are required" },
        { status: 400 }
      );
    }

    // Check if photo already exists
    if (await photoExists(key)) {
      console.log("Photo already exists:", key);
      return NextResponse.json({
        success: true,
        data: { key, publicUrl },
        message: "Photo already exists",
      });
    }

    // Save to database
    await insertPhoto(key, publicUrl, alt || "");
    console.log("Photo saved to database:", publicUrl);

    return NextResponse.json({
      success: true,
      data: { key, publicUrl },
    });
  } catch (error) {
    console.error("Error recording photo:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to record photo metadata", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensureDbInitialized();
    
    const photos = await getAllPhotos();
    
    return NextResponse.json({
      photos: photos.map((photo) => ({
        id: photo.id.toString(),
        url: photo.publicUrl,
        alt: photo.alt || "Wedding photo",
        uploadedAt: new Date(photo.uploadedAt || Date.now()),
      })),
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
