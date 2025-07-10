import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PracticePlanAddressView } from '@/ui/practice-plan-address'

const PracticePlanAddressPage = () => {
  return <PracticePlanAddressView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default PracticePlanAddressPage
