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

export type { PatientProfile, PatientPreferredPartner, PatientHistory }
