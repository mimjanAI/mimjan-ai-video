import { NextRequest, NextResponse } from "next/server";

const REPLICATE_API_URL = "https://api.replicate.com/v1";

export async function POST(request: NextRequest) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${REPLICATE_API_URL}/models/bytedance/seedance-1-lite/predictions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt: prompt.trim(),
            duration: 5,
            resolution: "720p",
            aspect_ratio: "16:9",
            fps: 24,
            camera_fixed: false,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.detail || data?.error || "Replicate API request failed.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      output: data.output ?? null,
    });
  } catch (error) {
    console.error("Prediction creation error:", error);

    return NextResponse.json(
      { error: "Failed to create video prediction." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is not configured." },
        { status: 500 }
      );
    }

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Prediction ID is required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${REPLICATE_API_URL}/predictions/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.detail || data?.error || "Failed to get prediction.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      output: data.output ?? null,
      error: data.error ?? null,
    });
  } catch (error) {
    console.error("Prediction status error:", error);

    return NextResponse.json(
      { error: "Failed to check prediction status." },
      { status: 500 }
    );
  }
}
