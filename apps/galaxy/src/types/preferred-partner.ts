import { Patient } from '@/ui/visit/types'
import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'

interface PatientPreferredPartner {
  id: string
  name: string
  premiumStatus?: string
  subscriptionStatus: string
  payerStatus: string
  userID: string
  userType: string
  isPrimaryPartner: boolean
  usersInID: string
  userStatus: string
  startDate: string
  endDate: string
  termDate: string
  addDate: string
  priority: string
  totalIds: number
}

interface PreferredPartnerUser {
  id: string
  metadata: Metadata
  partnerId: string
  patientId: number
  name: LegalName
  dob: string
  gender: 'NotSpecified' | 'Male' | 'Female'
  ssn: string
  numberOfUsersInGroup: number
  contactDetails: ContactDetails
  userType: 'Individual' | 'Couple' | 'Family'
  familyUserNumber: string
  userStatus: 'Primary' | 'Secondary'
  isPrimaryPartner: boolean
  addDate: string
  termDate: string
  isTestUser: boolean
  matchStatus: 'New' | 'Matched' | 'Unmatched' | 'Reconcile'
  recordStatus: 'Active' | 'Deleted'
  patient: Patient
}

interface PreferredPartnerFiltersPayload {
  userName?: string
  mrn?: string
  ssn?: string
  userNumber?: string
  customerStatuses?: string[]
  dateFrom?: string
  dateTo?: string
}

export type {
  PatientPreferredPartner,
  PreferredPartnerUser,
  PreferredPartnerFiltersPayload,
}
