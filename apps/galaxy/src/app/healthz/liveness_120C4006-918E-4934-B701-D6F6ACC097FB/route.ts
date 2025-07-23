import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json('Ok', { status: 200 })
}
