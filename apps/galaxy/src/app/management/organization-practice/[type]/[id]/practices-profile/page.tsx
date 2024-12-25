import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PracticesProfileView } from '@/ui/practices-profile'

const PracticesProfilePage = () => {
  return <PracticesProfileView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default PracticesProfilePage
