import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>
}

export default DashboardLayout
