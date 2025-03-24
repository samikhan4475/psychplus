import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import {
  AllergyDataResponse,
  PatientMedication,
} from '@/features/medications/types'
import { NoteSectionName } from '@/features/note/constants'
import { PatientPharmacy } from '@/features/pharmacy/types'

type PreCheckinAssessmentTab = {
  id: PreCheckinAssessmentTabs
  content: React.ReactNode
}

type SharedCode = {
  value: string
  display: string
  attributes?:  {
    name: string
    value: string
  }[]
  groupingCode?: string
}

interface PreCheckInStatus {
  preCheckInCompletedTabs: PreCheckinAssessmentTabs[]
  isPreCheckInCompleted: boolean
  activeTab: PreCheckinAssessmentTabs
  id: string
}

interface PreCheckinAssessmentStapperProps {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
  creditCards: CreditCard[]
  stripeAPIKey: string
  pharmacies: PatientPharmacy[]
  medications: PatientMedication[]
  allergies: AllergyDataResponse[]
  isDawSystemFeatureFlagEnabled: boolean
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
  preCheckInProgress: PreCheckInStatus
}

export type {
  PreCheckinAssessmentTab,
  SharedCode,
  PreCheckInStatus,
  PreCheckinAssessmentStapperProps,
}
