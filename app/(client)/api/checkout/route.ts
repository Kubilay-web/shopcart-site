import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/actions/createCheckoutSession";

export async function POST(req: NextRequest) {
  try {
    const { items, metadata } = await req.json();
    const url = await createCheckoutSession(items, metadata);
    return NextResponse.json({ url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}