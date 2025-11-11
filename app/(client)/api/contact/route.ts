import { NextResponse } from "next/server";

// İzin verilen domain (prod için)
const allowedOrigins = ["*"];

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": allowedOrigins.includes(origin ?? "") ? origin! : "",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

// Preflight OPTIONS isteği
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// POST isteği
export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { name, email, message } = await req.json();

    const sanityRes = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "message",
                name,
                email,
                message,
                date: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    const result = await sanityRes.json();

    return NextResponse.json(
      { success: true, result },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Sanity API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
