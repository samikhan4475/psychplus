'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { OrganizationPracticeTabs } from './organization-practice-tabs'

interface ClearingHouseViewProps {
  googleApiKey: string
}

const OrganizationPracticeView = ({ googleApiKey }: ClearingHouseViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <OrganizationPracticeTabs />
    </GooglePlacesContextProvider>
  )
}

export { OrganizationPracticeView }
