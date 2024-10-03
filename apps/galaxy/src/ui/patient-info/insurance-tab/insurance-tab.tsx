'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Insurance, InsurancePayer } from '@/types'
import { InsuranceView } from './insurance-view'

interface InsuranceTabProps {
  patientId: string
  insurancePayers: InsurancePayer[]
  patientPolicies: Insurance[]
  googleApiKey: string
}
const InsuranceTab = ({
  patientPolicies,
  patientId,
  insurancePayers,
  googleApiKey
}: InsuranceTabProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <InsuranceView
        insurancePayers={insurancePayers}
        patientId={patientId}
        patientPolicies={patientPolicies}
      />
    </GooglePlacesContextProvider>
  )
}

export { InsuranceTab }
