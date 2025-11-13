import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// 🔹 Ortak headers fonksiyonu
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // veya sadece frontend domain: "https://betprint.de"
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// ✅ OPTIONS handler (preflight)
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const deleted = await sanityClient.delete(id)
    return new NextResponse(
      JSON.stringify({ success: true, message: "Address deleted successfully", data: deleted }),
      { status: 200, headers: CORS_HEADERS }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message || "Unknown error" }),
      { status: 500, headers: CORS_HEADERS }
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const body = await request.json()
    const { name, email, address, city, state, zip, default: isDefault } = body

    const updated = await sanityClient
      .patch(id)
      .set({ name, email, address, city, state, zip, default: isDefault || false })
      .commit({ visibility: "sync" })

    return new NextResponse(
      JSON.stringify({ success: true, message: "Address updated successfully", data: updated }),
      { status: 200, headers: CORS_HEADERS }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message || "Unknown error" }),
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
