import { NextResponse } from 'next/server'

// Sanity client'ı burada oluştur
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(request) {
  try {
    const body = await request.json()
    
    console.log('Received address data:', body)

    // Sanity'ye adresi kaydet
    const result = await sanityClient.create({
      _type: 'address',
      name: body.name,
      email: body.email,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      default: body.default || false,
      createdAt: new Date().toISOString(),
    })

    console.log('Sanity create success:', result)

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: 'Address created successfully' 
    })

  } catch (error) {
    console.error('❌ Sanity create error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: 'Check Sanity token permissions and CORS settings'
      },
      { status: 500 }
    )
  }
}

// OPTIONS method for CORS
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