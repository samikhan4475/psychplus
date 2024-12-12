import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { OrganizationPracticeView } from '@/ui/organization-practice'

const OrganizationPracticePage = () => {
  return <OrganizationPracticeView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default OrganizationPracticePage
