'use client'

import {
  Appointment,
  CreditCard,
  Facesheet,
  InsurancePayer,
  PatientInsuranceInfo,
  PatientConsent,
  PatientPreferredPartner,
  PatientProfile,
  Relationship,
} from '@/types'
import { PatientInfoTabs } from './patient-info-tabs'
import { StoreProvider } from './store'

interface PatientInfoViewProps {
  patientId: string
  stripeApiKey: string
  googleApiKey: string
  patientProfile: PatientProfile
  patientPreferredPartners: PatientPreferredPartner[]
  patientRelationships: Relationship[]
  patientConsents: PatientConsent[]
  patientCards: CreditCard[]
  insurancePayers: InsurancePayer[]
  insuranceInfo: PatientInsuranceInfo
  patientFacesheet: Facesheet[]
  patientVisits: Appointment[]
}

const PatientInfoView = ({
  patientId,
  stripeApiKey,
  googleApiKey,
  patientProfile,
  patientPreferredPartners,
  patientRelationships,
  patientConsents,
  patientCards,
  insurancePayers,
  insuranceInfo,
  patientFacesheet,
  patientVisits,
}: PatientInfoViewProps) => {
  return (
    <StoreProvider>
      <PatientInfoTabs
        patientId={patientId}
        stripeApiKey={stripeApiKey}
        googleApiKey={googleApiKey}
        patientProfile={patientProfile}
        patientPreferredPartners={patientPreferredPartners}
        patientRelationships={patientRelationships}
        patientConsents={patientConsents}
        patientCards={patientCards}
        insurancePayers={insurancePayers}
        insuranceInfo={insuranceInfo}
        patientFacesheet={patientFacesheet}
        patientVisits={patientVisits}
      />
    </StoreProvider>
  )
}

export { PatientInfoView }
