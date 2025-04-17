import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { OrganizationPracticesMainView } from '@/ui/organization-practices'

const OrganizationPracticesPage = () => {
  return <OrganizationPracticesMainView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default OrganizationPracticesPage
