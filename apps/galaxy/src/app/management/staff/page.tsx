import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { StaffManagementView } from '@/ui/staff-management'

const StaffPage = () => {
  return <StaffManagementView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default StaffPage
