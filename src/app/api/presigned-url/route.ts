import { NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const { fileName, contentType } = await request.json();

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: "fileName and contentType are required" },
        { status: 400 }
      );
    }

    console.log("Generating presigned URL for:", fileName, contentType);

    // Aquestes línies són per depuració - eliminar en producció si es confirmen com a correctes
    console.log("R2 Endpoint:", process.env.R2_ENDPOINT ? "SET" : "MISSING");
    console.log("R2 Access Key ID:", process.env.R2_ACCESS_KEY_ID ? "SET" : "MISSING");
    console.log("R2 Secret Access Key:", process.env.R2_SECRET_ACCESS_KEY ? "SET" : "MISSING");
    console.log("R2 Bucket Name:", process.env.R2_BUCKET_NAME ? "SET" : "MISSING");
    console.log("R2 Public URL:", process.env.R2_PUBLIC_URL ? "SET" : "MISSING");

    const { url, key, publicUrl } = await generatePresignedUrl(
      fileName,
      contentType
    );

    console.log("Generated presigned URL:", publicUrl);

    return NextResponse.json({
      uploadUrl: url,
      key,
      publicUrl,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Full error details:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL", details: errorMessage },
      { status: 500 }
    );
  }
}