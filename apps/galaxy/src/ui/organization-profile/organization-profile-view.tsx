'use client'

import { GooglePlacesContextProvider } from "@/providers/google-places-provider"
import { ProfileForm } from "./profile-form"
interface OrganizationProfileViewProps {
  googleApiKey: string
}
const OrganizationProfileView = ({ googleApiKey }: OrganizationProfileViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <ProfileForm />
    </GooglePlacesContextProvider>
  )
}

export { OrganizationProfileView }