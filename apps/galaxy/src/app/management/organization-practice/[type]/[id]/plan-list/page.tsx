import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PracticePlanListView } from '@/ui/practice-plan-list'

const Page = () => {
  return <PracticePlanListView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default Page
