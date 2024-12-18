'use client'

import {
  CreditCard,
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
      />
    </StoreProvider>
  )
}

export { PatientInfoView }
