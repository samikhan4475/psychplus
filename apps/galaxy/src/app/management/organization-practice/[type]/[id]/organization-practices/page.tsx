import { OrganizationPracticesView } from '@/ui/organization-practices'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

const OrganizationPracticesPage = () => {
  return <OrganizationPracticesView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default OrganizationPracticesPage
