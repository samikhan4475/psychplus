import type { LegalName, Metadata } from '@psychplus/clinics/shared'

interface PatientMetadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
}

interface GeoCoordinates {
  longitude?: number
  latitude?: number
  altitude?: number
}

interface PatientName {
  firstName: string
  lastName: string
  middleName?: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}

interface PatientPhoneNumber {
  type?: string
  number: string
  extension?: string
  comment?: string
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

interface PatientContactDetails {
  email: string
  emailVerificationStatus?: string
  phoneNumbers?: PatientPhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
}

interface EmergencyContactDetails {
  email?: string
  emailVerificationStatus?: string
  phoneNumbers?: PatientPhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
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

interface Patient {
  id: number
  userId?: number
  legalName: PatientName
  birthdate: string
  hasGuardian: boolean
  gender: string
  genderOrientation?: string
  genderExpression?: string
  genderPronoun?: string
  driversLicense?: PatientDriversLicense
  contactDetails: PatientContactDetails
  metadata: PatientMetadata
  isPlusMember: boolean
  hasPhoto: boolean
  ppUserId?: number
  ppUserType?: string
  medicalRecordNumber?: string
  verificationStatus?: string
  ppUserStatus?: string
}

interface PatientParams {
  patientId: number
}

interface CareTeamMember {
  id: number
  metadata: PatientMetadata
  primary: boolean
  admin: boolean
  specialist: string
  medicalAssistant: boolean
  staffDetails: {
    id: number
    metadata: Metadata
    isTest: boolean
    legalName: LegalName
    staffRoleCode: string
    contactInfo: PatientContactDetails
    spokenLanguages: string[]
    virtualRoomLink: string
  }
}

interface CareTeam {
  careTeam: CareTeamMember[]
}

interface PreferredPartner {
  id: string
  name: string
  status: string
  payerStatus: string
  userId: string
  userType: string
  numberOfUsers: string
  userStatus: string
  priority: string
  startDate: string
  termDate: string
}

export type {
  Patient,
  PatientParams,
  CareTeamMember,
  CareTeam,
  PatientContactDetails,
  PreferredPartner,
  PatientName,
  GuardianName,
  EmergencyContactDetails,
  PatientPhoneNumber,
  PatientAddress,
  PatientDriversLicense,
  PatientMetadata,
}

