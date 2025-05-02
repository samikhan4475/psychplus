import { CodesetCache, Consent, PatientProfile } from '@psychplus-v2/types'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import {
  AllergyDataResponse,
  PatientMedication,
} from '@/features/medications/types'
import { NoteSectionItem } from '@/features/note/types'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { PreCheckInStatus } from '@/features/pre-checkin-assessment/types'
import { NoteSectionName } from '../note/constants'

interface NotificationItem {
  id: string
  userId: number
  readOn?: string
  alternateProcessedOn?: string
  createdOn: string
  destination?: string
  purposeCode: string
  sourceCode?: string
  title: string
  message: string
}

interface NotificationResponse {
  notificationList: NotificationItem[]
  total: number
}

interface AssessmentStateType {
  creditCardResponse: CreditCard[]
  profileResponse: PatientProfile
  userConsentsResponse: Consent[]
  insurancePayerResponse: InsurancePayer[]
  patientInsurancesResponse: Insurance
  questionnaireDashboardResponse: NoteSectionItem[]
  pharmaciesResponse: PatientPharmacy[]
  patientMedicationsResponse: PatientMedication[]
  patientAllergiesResponse: AllergyDataResponse[]
  codesets: CodesetCache
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
  preCheckInProgress: PreCheckInStatus
  notes: NoteSectionItem[]
}

type ErrorType = Promise<
  { title: string | undefined; type: string } | undefined
>

export {
  type NotificationResponse,
  type AssessmentStateType,
  type ErrorType,
  type NotificationItem,
}
