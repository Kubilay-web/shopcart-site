import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/actions/createCheckoutSession";

export async function POST(req: Request) {
  try {
    const { items, metadata } = await req.json();
    const url = await createCheckoutSession(items, metadata);
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
