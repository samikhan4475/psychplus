'use client'

import { GooglePlacesContextProvider } from "@/providers/google-places-provider"
import { ProfileForm } from "./profile-form"
interface PracticesProfileViewProps {
  googleApiKey: string
}
const PracticesProfileView = ({ googleApiKey }: PracticesProfileViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <ProfileForm />
    </GooglePlacesContextProvider>
  )
}

export { PracticesProfileView }