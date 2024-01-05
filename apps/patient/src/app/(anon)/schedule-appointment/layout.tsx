import { type Metadata } from 'next'
import { Header } from '@/components'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default DashboardLayout
