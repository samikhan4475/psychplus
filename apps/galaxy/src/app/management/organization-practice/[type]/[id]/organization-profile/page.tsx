import { OrganizationProfileView } from '@/ui/organization-profile'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

const OrganizationProfilePage = () => {
  return <OrganizationProfileView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default OrganizationProfilePage
