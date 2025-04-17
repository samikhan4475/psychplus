'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { InsurancePayer, PatientInsuranceInfo } from '@/types'
import { InsuranceView } from './insurance-view'

interface InsuranceTabProps {
  patientId: string
  insurancePayers: InsurancePayer[]
  insuranceInfo: PatientInsuranceInfo
  googleApiKey: string
}
const InsuranceTab = ({
  insuranceInfo,
  patientId,
  insurancePayers,
  googleApiKey,
}: InsuranceTabProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <InsuranceView
        insurancePayers={insurancePayers}
        patientId={patientId}
        insuranceInfo={insuranceInfo}
      />
    </GooglePlacesContextProvider>
  )
}

export { InsuranceTab }
