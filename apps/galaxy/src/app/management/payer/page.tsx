import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PayerView } from '@/ui/payer'

const PayerPageView = () => {
  return <PayerView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default PayerPageView
