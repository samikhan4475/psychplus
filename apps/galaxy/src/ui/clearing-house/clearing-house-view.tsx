'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { ClearingHouseTabs } from './clearing-house-tabs'

interface ClearingHouseViewProps {
  googleApiKey: string
}

const ClearingHouseView = ({ googleApiKey }: ClearingHouseViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <ClearingHouseTabs />
    </GooglePlacesContextProvider>
  )
}

export { ClearingHouseView }
