import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { OrganizationStaffView } from '@/ui/organization-staff'

const PracticeStaffPage = () => {
  return <OrganizationStaffView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default PracticeStaffPage
