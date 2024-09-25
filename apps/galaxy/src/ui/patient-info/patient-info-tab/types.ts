import { ContactDetails, LegalName } from '@/types'

interface PatientProfile {
  id: string
  mrn: string
  firstName: string
  middleName?: string
  lastName: string
  dob: string
  phone?: string
  email: string
  hasGuardian: boolean
  guardianFirstName?: string
  guardianLastName?: string
}

interface PatientRelationship {
  id?: string
  name: LegalName
  patientId?: number
  isEmergencyContact: boolean
  isGuardian?: boolean
  guardianRelationshipCode?: string
  contactDetails?: ContactDetails
  isAllowedToReleaseInformation: boolean
}

interface Relationship {
  firstName: string
  lastName: string
  middleName: string
  relationship: string
  address: string
  email: string
  homePhone: string
  isEmergencyContact: boolean
  isRri: boolean
  isGuardian: boolean
}
interface PatientPreferredPartner {
  id: string
  name: string
  premiumStatus?: string
  payerStatus: string
  userID: string
  userType: string
  isPrimaryPartner: boolean
  usersInID: string
  userStatus: string
  startDate: string
  endDate: string
  priority: string
}

interface PatientHistory {
  dateTime: string
  username: string
}

export type {
  PatientProfile,
  PatientPreferredPartner,
  PatientRelationship,
  PatientHistory,
  Relationship,
}
