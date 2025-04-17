'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { OrganizationPracticesView } from './organization-practices-view'

interface OrganizationPracticesViewProps {
  googleApiKey: string
  isPractices?: boolean
}

const OrganizationPracticesMainView = ({
  isPractices,
  googleApiKey,
}: OrganizationPracticesViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <OrganizationPracticesView isPractices={isPractices} />
    </GooglePlacesContextProvider>
  )
}

export { OrganizationPracticesMainView }
