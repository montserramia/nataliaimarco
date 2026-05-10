import { NextResponse } from "next/server";
import { insertPhoto, getAllPhotos, photoExists, initDatabase } from "@/lib/db";

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

const PAGE_SIZE = 20;

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

export async function GET(request: Request) {
  try {
    await ensureDbInitialized();

    // Llegir el paràmetre de pàgina de la URL (?page=1)
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const offset = (page - 1) * PAGE_SIZE;

    const { Pool } = await import('pg');
    const pool = new (Pool as any)({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    const client = await pool.connect();
    try {
      // Total de fotos per saber si hi ha més pàgines
      const countResult = await client.query(
        `SELECT COUNT(*) as total FROM photos WHERE approved = true`
      );
      const total = parseInt(countResult.rows[0].total, 10);

      // Fotos de la pàgina actual
      const result = await client.query(
        `SELECT * FROM photos WHERE approved = true ORDER BY uploadedAt DESC LIMIT $1 OFFSET $2`,
        [PAGE_SIZE, offset]
      );

      return NextResponse.json({
        photos: result.rows.map((photo: any) => ({
          id: photo.id.toString(),
          url: photo.publicurl || photo.publicUrl,
          alt: photo.alt || "Wedding media",
          type: photo.mediatype || 'image',
          favoriteCount: photo.favoritecount || 0,
          uploadedAt: new Date(photo.uploadedat || Date.now()),
        })),
        pagination: {
          page,
          pageSize: PAGE_SIZE,
          total,
          hasMore: offset + PAGE_SIZE < total,
        },
      });
    } finally {
      client.release();
      await pool.end();
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    
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