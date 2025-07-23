import React from 'react'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PreferredPartnerUsersView } from '@/ui/preferred-partner-users'

const PreferredPartnerUsers = () => {
  return <PreferredPartnerUsersView googleApiKey={GOOGLE_MAPS_API_KEY} />
}

export default PreferredPartnerUsers
