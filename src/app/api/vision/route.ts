import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/vision";

export async function POST(request: NextRequest) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const result = await analyzeImage(image);

  return NextResponse.json(result);
}
