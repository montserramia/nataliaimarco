import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configurar client S3 per a Cloudflare R2
function createR2Client() {
  // Validate required environment variables
  if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME || !process.env.R2_PUBLIC_URL) {
    throw new Error("Missing required R2 environment variables. Please check your configuration.");
  }
  
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export async function generatePresignedUrl(
  fileName: string,
  contentType: string,
  expiresIn = 3600
) {
  // Validate inputs
  if (!fileName || !contentType) {
    throw new Error("fileName and contentType are required");
  }
  
  const client = createR2Client();
  const bucket = process.env.R2_BUCKET_NAME!;

  // Generar un nom d'arxiu únic
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  
  // Determinar l'extensió del fitxer basada en el contentType o el nom
  let extension = fileName.split(".").pop()?.toLowerCase() || "";
  if (!extension) {
    // Si no es troba extensió al nom, utilitzar el contentType
    if (contentType.includes('jpeg') || contentType.includes('jpg')) {
      extension = 'jpg';
    } else if (contentType.includes('png')) {
      extension = 'png';
    } else if (contentType.includes('heic')) {
      extension = 'heic';
    } else if (contentType.includes('mp4')) {
      extension = 'mp4';
    } else if (contentType.includes('mov')) {
      extension = 'mov';
    } else if (contentType.includes('video')) {
      extension = 'mp4'; // Utilitzar mp4 com a valor per defecte per vídeos
    } else if (contentType.includes('image')) {
      extension = 'jpg'; // Utilitzar jpg com a valor per defecte per imatges
    } else {
      extension = 'jpg'; // Valor per defecte
    }
  }
  
  const key = `wedding-photos/${timestamp}-${randomString}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn });

  return {
    url: signedUrl,
    key,
    publicUrl: `${process.env.R2_PUBLIC_URL}/${key}`,
  };
}