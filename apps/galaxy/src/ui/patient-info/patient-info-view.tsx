'use client'

import {
  Appointment,
  CreditCard,
  Facesheet,
  Insurance,
  InsurancePayer,
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
  patientPolicies: Insurance[]
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
  patientPolicies,
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
        patientPolicies={patientPolicies}
        patientFacesheet={patientFacesheet}
        patientVisits={patientVisits}
      />
    </StoreProvider>
  )
}

export { PatientInfoView }
