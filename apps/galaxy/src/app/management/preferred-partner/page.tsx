import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PreferredPartnerView } from '@/ui/preferred-partner'

const PreferredPartnerPage = () => {
  return <PreferredPartnerView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default PreferredPartnerPage
