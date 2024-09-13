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
export type { PatientProfile, PatientPreferredPartner, PatientRelationship }
