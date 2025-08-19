import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { LocationTabs } from '@/ui/location'

const LocationServicePage = () => {
  return <LocationTabs googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default LocationServicePage
