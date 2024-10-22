import { redirect } from 'next/navigation'

// import { MembershipView } from '@/features/billing/membership'

const MembershipPage = () => {
  // Temporary redirect to /billing to disable membership page
  redirect('/billing')
  return null
  // return <MembershipView />
}

export default MembershipPage
