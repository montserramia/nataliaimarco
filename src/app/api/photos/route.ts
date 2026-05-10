import { NextResponse } from "next/server";
import { insertPhoto, getAllPhotos, photoExists, initDatabase, incrementFavoriteCount } from "@/lib/db";

// Inicialitzar la base de dades al primer request
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }
}

export async function POST(request: Request) {
  try {
    await ensureDbInitialized();
    
    const { key, publicUrl, alt, mediaType } = await request.json();

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

    // Determine media type based on URL or provided type
    const type = mediaType || (publicUrl.includes('.mp4') || publicUrl.includes('.mov') ? 'video' : 'image');

    // Save to database
    await insertPhoto(key, publicUrl, alt || "", type);
    console.log("Media saved to database:", publicUrl);

    return NextResponse.json({
      success: true,
      data: { key, publicUrl },
    });
  } catch (error) {
    console.error("Error recording photo:", error);
    
    // Don't expose sensitive information in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: "Failed to save media metadata" },
        { status: 500 }
      );
    } else {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "Failed to record photo metadata", details: errorMessage },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    await ensureDbInitialized();

    const photos = await getAllPhotos();

    return NextResponse.json({
      photos: photos.map((photo) => ({
        id: photo.id.toString(),
        url: photo.publicurl || photo.publicUrl,
        alt: photo.alt || "Wedding media",
        type: photo.mediatype || 'image', // Return media type
        favoriteCount: photo.favoritecount || 0, // Add favorite count
        uploadedAt: new Date(photo.uploadedAt || Date.now()),
      })),
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    
    // Don't expose sensitive information in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: "Failed to fetch photos" },
        { status: 500 }
      );
    } else {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "Failed to fetch photos", details: errorMessage },
        { status: 500 }
      );
    }
  }
}