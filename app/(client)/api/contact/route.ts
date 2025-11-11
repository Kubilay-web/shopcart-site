import { NextResponse } from "next/server";

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
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Sanity API error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
