import * as React from 'react'
import { type Metadata } from 'next'
import { PatientsHeader } from '@/components'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PatientsHeader />
      <main>{children}</main>
    </>
  )
}

export default IndexLayout
