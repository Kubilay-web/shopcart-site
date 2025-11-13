import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Write token (server-side)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      address,
      city,
      state,
      zip,
      default: isDefault,
      clerkUserId, // 👈 FRONTEND’den gelen kullanıcı ID
    } = body

    console.log('📦 Received address data:', body)


    // 🔥 Sanity’ye kullanıcıya bağlı adresi kaydet
    const result = await sanityClient.create({
      _type: 'address',
      name,
      email,
      address,
      city,
      state,
      zip,
      default: isDefault || false,
      clerkUserId, // 👈 burada Sanity’ye kaydediyoruz
      createdAt: new Date().toISOString(),
    })

    console.log('✅ Sanity create success:', result)

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Address created successfully',
    })
  } catch (error: any) {
    console.error('❌ Sanity create error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error',
        details: 'Check Sanity token permissions and CORS settings',
      },
      { status: 500 }
    )
  }
}



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clerkUserId = searchParams.get('clerkUserId')

    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: 'Missing clerkUserId' },
        { status: 400 }
      )
    }

    // 🔥 Sanity’den kullanıcıya ait adresleri çek
    const query = `*[_type == "address" && clerkUserId == $clerkUserId] | order(_createdAt desc)`
    const addresses = await sanityClient.fetch(query, { clerkUserId })

    return NextResponse.json({
      success: true,
      data: addresses,
    })
  } catch (error: any) {
    console.error('❌ Sanity fetch error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}



// ✅ CORS OPTIONS handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
