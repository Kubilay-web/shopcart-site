import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // ✅ sadece bu domain erişebilir
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 🧠 Preflight (OPTIONS) isteklerini yakala
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400, headers: corsHeaders }
      );
    }

    const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const sanityVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
    const token = process.env.SANITY_API_WRITE_TOKEN;

    // 🔍 1. E-posta zaten var mı kontrol et
    const query = `*[_type == "newsletter" && email == "${email}"][0]`;
    const checkRes = await fetch(
      `https://${sanityProjectId}.api.sanity.io/v${sanityVersion}/data/query/${sanityDataset}?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const checkData = await checkRes.json();
    const existing = checkData.result;

    if (existing) {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed." },
        { status: 409, headers: corsHeaders }
      );
    }

    // ✍️ 2. Yeni kayıt oluştur
    const createRes = await fetch(
      `https://${sanityProjectId}.api.sanity.io/v${sanityVersion}/data/mutate/${sanityDataset}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "newsletter",
                email,
                subscribedAt: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    const result = await createRes.json();

    if (!createRes.ok) {
      console.error("Sanity create error:", result);
      return NextResponse.json(
        { success: false, error: "Failed to save email" },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
