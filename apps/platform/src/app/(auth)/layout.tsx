import * as React from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex items-center border-b border-b-gray-6 px-8 py-4">
      <Link href="/" className="mr-8">
        <span className="text-4 font-bold">P+ Platform</span>
      </Link>
      <div className="flex gap-4 text-3">
        <Link href="/widgets" className="hover:underline">
          Widgets
        </Link>
        <Link href="/components" className="hover:underline">
          Components
        </Link>
      </div>
    </div>
    <main>{children}</main>
  </>
)

export default IndexLayout
