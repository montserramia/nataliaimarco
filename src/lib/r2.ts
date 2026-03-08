import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configurar client S3 per a Cloudflare R2
function createR2Client() {
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
  const client = createR2Client();
  const bucket = process.env.R2_BUCKET_NAME!;

  // Generar un nom d'arxiu únic
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = fileName.split(".").pop() || "jpg";
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
