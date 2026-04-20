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

export async function DELETE(request: Request) {
  try {
    // Comprovar si la clau secreta és correcta
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await pool.connect();
    try {
      // Eliminar totes les fotos
      await client.query('DELETE FROM photos');
      
      return NextResponse.json({
        message: "All photos deleted successfully",
        success: true
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error deleting all photos:", error);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : "Unknown error")
      : "Failed to delete photos";
    
    return NextResponse.json(
      { error: "Failed to delete photos", details: errorMessage },
      { status: 500 }
    );
  }
}