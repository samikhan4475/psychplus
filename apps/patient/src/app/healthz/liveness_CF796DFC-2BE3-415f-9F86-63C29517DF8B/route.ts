import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json('OK', { status: 200 })
}
