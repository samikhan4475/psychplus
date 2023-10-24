import * as React from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex items-center border-b px-8 py-4">
      <Link href="/" className="mr-8">
        <span className="text-xl font-semibold">P+</span>
      </Link>
      <div className="flex gap-3">
        <Link href="/example" className="hover:underline">
          Example
        </Link>
      </div>
    </div>
    <main className="p-4">{children}</main>
  </>
)

export default IndexLayout
