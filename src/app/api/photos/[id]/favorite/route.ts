import { NextResponse } from "next/server";
import { Pool } from 'pg';

// Crear connexió a la base de dades
const getPool = () => {
  let connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('DATABASE_URL is not configured');
    throw new Error('Database connection failed: missing configuration');
  }
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  return new Pool({
    connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
};

const pool = getPool();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const photoId = params.id;

    if (!photoId) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    // Incrementar el comptador de favorits
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE photos 
         SET favoriteCount = favoriteCount + 1 
         WHERE id = $1 
         RETURNING id, favoriteCount`,
        [photoId]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "Photo not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        favoriteCount: result.rows[0].favoritecount,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error updating favorite:", error);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : "Unknown error")
      : "Failed to update favorite";
    
    return NextResponse.json(
      { error: "Failed to update favorite", details: errorMessage },
      { status: 500 }
    );
  }
}