'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { PayerTabView } from './payer-tabs'

interface PayerViewProps {
  googleApiKey: string
}

const PayerView = ({ googleApiKey }: PayerViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <PayerTabView />
    </GooglePlacesContextProvider>
  )
}

export { PayerView }
