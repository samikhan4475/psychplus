import { LocationTabs } from '@/ui/location/location-tabs'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

const LocationPageView = () => {
  return <LocationTabs googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default LocationPageView
