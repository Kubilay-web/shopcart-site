import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // write token server-side
})

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const deleted = await sanityClient.delete(id)
    console.log("✅ Address deleted:", deleted)

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
      data: deleted,
    })
  } catch (error: any) {
    console.error("❌ Delete address error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}




export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const {
      name,
      email,
      address,
      city,
      state,
      zip,
      default: isDefault,
    } = body;

    // 🔥 commit visibility: "sync" ekledik, böylece index güncellenmeden yanıt dönmez
    const updated = await sanityClient
      .patch(id)
      .set({
        name,
        email,
        address,
        city,
        state,
        zip,
        default: isDefault || false,
      })
      .commit({ visibility: "sync" });

    console.log("✅ Address updated:", updated);

    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("❌ Update address error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
