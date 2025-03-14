import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { User } from '@psychplus-v2/auth'
import { Text } from '@radix-ui/themes'
import { getProfile } from '@/api'
import { getAcsInfo } from '@/features/call/api'

const CallView = dynamic(
  () => import('@/features/call/call-view.tsx').then((mod) => mod.CallView),
  { ssr: false },
)

interface Props {
  searchParams: {
    staffId: string
    appointmentId: string
  }
}

const Call = async (props: Props) => {
  const [acsResponse, profileResponse] = await Promise.all([
    getAcsInfo(props.searchParams),
    getProfile(),
  ])

  if (acsResponse.state === 'error') {
    return <Text>{acsResponse.error}</Text>
  }

  if (profileResponse.state === 'error') {
    return <Text>Error in geeting profile info: {profileResponse.error}</Text>
  }

  const profile = profileResponse.data
  const user: User = {
    userId: String(profile.id),
    firstName: profile.legalName.firstName,
    lastName: profile.legalName.lastName,
    email: profile.contactDetails.email,
  }

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <CallView acsInfo={acsResponse.data} user={user} />
    </Suspense>
  )
}

export default Call
