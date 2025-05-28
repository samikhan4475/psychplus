import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { User } from '@psychplus-v2/auth'
import { Text } from '@radix-ui/themes'
import { getProfile } from '@/api'
import { getAcsInfo } from '@/features/call/api'
import { AcsInfoPayload } from '@/features/call/types'

const CallView = dynamic(
  () => import('@/features/call/call-view.tsx').then((mod) => mod.CallView),
  { ssr: false },
)

interface Props {
  searchParams: {
    email?: string
    appointmentId?: string
    reference?: string
  }
}

const Call = async ({
  searchParams: { email, appointmentId, reference },
}: Props) => {
  const payload: AcsInfoPayload = {}

  if (email) payload.staffEmail = email
  if (appointmentId) payload.appointmentId = appointmentId
  if (reference) payload.shortUrlReference = reference

  const [acsResponse, profileResponse] = await Promise.all([
    getAcsInfo(payload),
    getProfile(),
  ])

  if (acsResponse.state === 'error') {
    return <Text>{acsResponse.error}</Text>
  }

  const user: User | undefined =
    profileResponse.state === 'success'
      ? {
          userId: String(profileResponse?.data?.id),
          firstName: profileResponse?.data?.legalName.firstName,
          lastName: profileResponse?.data?.legalName.lastName,
          email: profileResponse?.data?.contactDetails.email,
        }
      : undefined

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <CallView acsInfo={acsResponse.data} user={user} />
    </Suspense>
  )
}

export default Call
