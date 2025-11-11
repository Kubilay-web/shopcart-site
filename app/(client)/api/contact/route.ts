import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 🧠 Preflight (OPTIONS) isteğine cevap
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
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

    if (!sanityRes.ok) {
      console.error("Sanity create error:", result);
      return NextResponse.json(
        { success: false, error: "Failed to send message" },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true, result }, { headers: corsHeaders });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
