import type { ContactDetails } from './contact'
import type {
  GenderExpression,
  GenderOrientation,
  GenderPronoun,
} from './gender'
import type { Metadata } from './metadata'
import type { LegalName } from './name'
import { PhoneNumber } from './phone'
 
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
 
interface GeoCoordinates {
  longitude?: number
  latitude?: number
  altitude?: number
}
 
interface PatientAddress {
  type: string
  street1?: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: GeoCoordinates
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
interface GuardianName {
  firstName?: string | null
  lastName?: string | null
  middleName?: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}
 
interface EmergencyContactDetails {
  email?: string
  emailVerificationStatus?: string
  phoneNumbers?: PhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
}
 
interface PatientPhoneNumber {
  type?: string
  number: string
  extension?: string
  comment?: string
}
 
interface PatientContactDetails {
  email: string
  emailVerificationStatus?: string
  phoneNumbers?: PatientPhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
}
 
interface PatientEmergencyContact {
  name?: GuardianName
  contact?: EmergencyContactDetails
  relationship?: string
}
 
interface AlternateContactDetails {
  email?: string
  emailVerificationStatus?: string
  phoneNumbers?: PatientPhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
}
 
interface PatientGuardian {
  name?: GuardianName
  isEmergencyContact?: boolean
  relationship?: string
  contact?: PatientContactDetails
}
interface PatientProfile {
  id: number
  userId?: number
  legalName: LegalName
  birthdate: string
  hasGuardian: boolean
  gender: string
  genderOrientation?: string
  genderExpression?: string
  genderPronoun?: string
  driversLicense?: PatientDriversLicense
  contactDetails: PatientContactDetails
  emergencyContact?: PatientEmergencyContact
  cmdId?: string
  motherMaidenName?: string
  alternateOrPreviousName?: LegalName | null
  alternateOrPreviousContactDetails?: AlternateContactDetails | null
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
}
 
export type { PatientProfileRaw, PatientProfile }