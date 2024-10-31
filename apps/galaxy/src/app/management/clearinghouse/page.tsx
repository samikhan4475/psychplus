import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { ClearingHouseView } from '@/ui/clearing-house'

const ClearingHousePage = () => {
  return <ClearingHouseView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default ClearingHousePage
