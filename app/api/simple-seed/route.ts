import { NextRequest, NextResponse } from 'next/server'
import { simpleSeed } from '@/lib/database/simple-seed'

export async function POST() {
  try {
    const result = simpleSeed()
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      counts: result
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}