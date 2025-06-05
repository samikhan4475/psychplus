import { Text } from '@radix-ui/themes'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PreferredPartnerProfileView } from '@/ui/preferred-partner-profile'
import { getPreferredPartnerAction } from '@/ui/preferred-partner-profile/actions'

interface PreferredPartnerProfilePageProps {
  params: {
    id: string
  }
}

const PreferredPartnerProfile = async ({
  params,
}: PreferredPartnerProfilePageProps) => {
  const response = await getPreferredPartnerAction({ partnerIds: [params.id] })
  if (response.state === 'error') {
    return <Text>Preferred Partner profile not found</Text>
  }
  return (
    <PreferredPartnerProfileView
      profile={response.data[0]}
      googleApiKey={GOOGLE_MAPS_API_KEY}
    />
  )
}

export default PreferredPartnerProfile
