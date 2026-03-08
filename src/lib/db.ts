import { Pool } from 'pg';

// Configurar connexió a Neon PostgreSQL
// IMPORTANT: Treure ?sslmode=require si causa problemes
const getPool = () => {
  let connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
  }
  
  // Assegurar SSL per a producció
  const isProduction = process.env.NODE_ENV === 'production';
  
  return new Pool({
    connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    max: 20, // Max connexions al pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
};

let pool: ReturnType<typeof getPool> | null = null;

function getPoolInstance() {
  if (!pool) {
    pool = getPool();
  }
  return pool;
}

// Inicialitzar la taula de fotos
export async function initDatabase() {
  const client = await getPoolInstance().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        publicUrl TEXT NOT NULL,
        alt TEXT,
        uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved BOOLEAN DEFAULT true
      )
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_photos_uploadedAt 
      ON photos(uploadedAt DESC)
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function insertPhoto(key: string, publicUrl: string, alt?: string) {
  const client = await getPoolInstance().connect();
  try {
    const result = await client.query(
      `INSERT INTO photos (key, publicUrl, alt, approved)
       VALUES ($1, $2, $3, true)
       ON CONFLICT (key) DO NOTHING
       RETURNING *`,
      [key, publicUrl, alt || '']
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting photo:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getAllPhotos() {
  const client = await getPoolInstance().connect();
  try {
    const result = await client.query(
      `SELECT * FROM photos WHERE approved = true ORDER BY uploadedAt DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function photoExists(key: string) {
  const client = await getPoolInstance().connect();
  try {
    const result = await client.query(
      `SELECT COUNT(*) as count FROM photos WHERE key = $1`,
      [key]
    );
    return parseInt(result.rows[0].count) > 0;
  } finally {
    client.release();
  }
}
