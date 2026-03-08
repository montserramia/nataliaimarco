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
    return NextResponse.json(
      { error: "Failed to generate upload URL", details: errorMessage },
      { status: 500 }
    );
  }
}
