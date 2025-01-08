import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { VirtualAddressesView } from '@/ui/practice-virtual-addresses'

const VirtualAddressesPage = () => {
  return <VirtualAddressesView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default VirtualAddressesPage
