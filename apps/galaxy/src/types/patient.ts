import type { ContactDetails } from './contact'
import { GenderExpression, GenderOrientation, GenderPronoun } from './gender'
import { PatientGuardian } from './guardian'
import { Insurance } from './insurance'
import type { Metadata } from './metadata'
import type { LegalName } from './name'

interface PatientProfileRaw {
  id: number
  userId: number
  metadata: Metadata
  legalName: LegalName
  birthdate: string
  contactDetails: ContactDetails
  genderExpression?: GenderExpression
  genderOrientation?: GenderOrientation
  genderPronoun?: GenderPronoun
  guardian?: PatientGuardian
}
interface PatientDriversLicense {
  type?: string
  number?: string
  issuedDate?: string
  expirationDate?: string
  issuedBy?: string
  validIn?: string
  hasFrontImage?: boolean
  hasBackImage?: boolean
}

interface PatientEmergencyContact extends Partial<ContactDetails> {
  name?: Partial<LegalName>
}

interface PatientEmergencyContact extends Partial<ContactDetails> {
  name?: Partial<LegalName>
}

interface PatientProfile {
  id: number
  userId?: number
  legalName: LegalName
  birthdate: string
  hasGuardian: boolean
  gender: string
  name?: string
  age?: number
  genderOrientation?: string
  genderExpression?: string
  genderPronoun?: string
  driversLicense?: PatientDriversLicense
  contactDetails: Partial<ContactDetails>
  emergencyContact?: PatientEmergencyContact
  cmdId?: string
  motherMaidenName?: string
  alternateOrPreviousName?: LegalName | null
  alternateOrPreviousContactDetails?: Partial<ContactDetails> | null
  language?: string
  languageAbility?: string
  languageProficiency?: string
  religion?: string
  races?: string[]
  ethnicities?: string[]
  preferredLanguage?: string
  chargeUserId?: string
  isTest?: boolean
  metadata?: Metadata
  isPlusMember?: boolean
  hasPhoto?: boolean
  chargeKey?: string
  medicalRecordNumber?: string
  socialSecurityNumber?: string
  guardian?: PatientGuardian
  verificationStatus?: string
  status?: string
  patientVerificationTimeElapsed?: string
  insuranceVerificationTimeElapsed?: string
  insurancePolicies?: Insurance[]
  mostRecentAppointmentDate?: string
  contactMadeStatus?: string
  creditCardVerificationStatus?: string
  insuranceVerification?: string
  patientConsent?: string
  upcomingAppointmentDate?: string
  practice?: string
  dateOfBirth?: string
  patientTypeEstablishedOrNew?: string
  referralName?: string
}

interface PatientHistoryParams {
  historyCreatedFrom?: string
  historyCreatedTo?: string
  username?: string
}

interface NewPatient {
  accessToken: string
  user: {
    id: number
    username?: string
    legalName: {
      firstName: string
      middleName?: string
      lastName: string
    }
    userRoleCode?: string
    contactInfo?: {
      email: string
      phoneNumbers: [
        {
          type: string
          number: string
        },
      ]
    }
    staffId?: number
    patientId?: number
  }
  dob: string
  gender: string
  patientMrn: string
  patientStatus?: string
  state?: string
}

export type {
  PatientProfile,
  PatientProfileRaw,
  PatientHistoryParams,
  NewPatient,
}
