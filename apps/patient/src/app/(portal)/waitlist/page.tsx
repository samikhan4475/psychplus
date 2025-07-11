import { CODESETS } from '@psychplus-v2/constants'
import { Text } from '@radix-ui/themes'
import { getCodesets, getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { WaitlistView } from '@/features/waitlist'
import { getStaff } from '@/features/waitlist/api'
import { CodesetStoreProvider } from '@/providers'

const WaitlistPage = async () => {
  const [codesets, profileResponse, staffResponse] = await Promise.all([
    getCodesets([CODESETS.AppointmentType, CODESETS.ServicesOffered]),
    getProfile(),
    getStaff(),
  ])

  if (profileResponse.state === 'error')
    return <Text>{profileResponse.error}</Text>
  if (staffResponse.state === 'error') return <Text>{staffResponse.error}</Text>

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <WaitlistView staff={staffResponse.data} />
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default WaitlistPage
