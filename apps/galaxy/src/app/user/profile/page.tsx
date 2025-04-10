import React from 'react'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { StaffProfileView } from '@/ui/staff-profile'

const StaffProfile = () => {
  return <StaffProfileView googleApiKey={GOOGLE_MAPS_API_KEY} isProfileView />
}

export default StaffProfile
