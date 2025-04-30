import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { StaffManagementView } from '@/ui/staff-management'

const PracticeStaffPage = () => {
  return <StaffManagementView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default PracticeStaffPage
