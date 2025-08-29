'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { PayerTabsView } from './payer-tabs'

interface PayerViewProps {
  googleApiKey: string
}

const PayerView = ({ googleApiKey }: PayerViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <PayerTabsView />
    </GooglePlacesContextProvider>
  )
}

export { PayerView }
