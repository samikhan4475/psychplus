import type { EmergencyContactDetails, GuardianName, PatientAddress, PatientContactDetails, PatientDriversLicense, PatientMetadata, PatientName, PatientPhoneNumber } from "@psychplus/patient"

interface AuthorityNameSpace {
  namespace: string
  displayName: string
  codesets: AuthorityCodeSets[]
}

interface AuthorityCodeSets {
  codeSystemName: string
  displayName: string
  codes: Code[]
}

interface Code {
  code: string
  displayName: string
  groupingCode?: string
  codeAttributes?: CodeAttribute[]
}

interface CodeAttribute {
  name: string
  content: string
}

interface PatientGuardian {
  name?: GuardianName
  isEmergencyContact?: boolean
  relationship?: string
  contact?: PatientContactDetails
}

interface PatientEmergencyContact {
  name?: GuardianName
  contact?: EmergencyContactDetails
  relationship?: string;
}

interface AlternateContactDetails {
  email?: string
  emailVerificationStatus?: string
  phoneNumbers?: PatientPhoneNumber[]
  addresses?: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
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
  emergencyContact?: PatientEmergencyContact
  cmdId?: string
  motherMaidenName?: string
  alternateOrPreviousName?: PatientName | null
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
  metadata?: PatientMetadata
  isPlusMember?: boolean
  hasPhoto?: boolean
  chargeKey?: string
  medicalRecordNumber?: string
  socialSecurityNumber?: string
  guardian?: PatientGuardian
  verificationStatus?: string
  status?: string
}

interface PatientConsentRequestBody {
  policyType: string
  channels: string[]
  toEmail: string
  ccEmail?: string
  cellPhoneNumber: string
}

type AuthorityCodesetsIndex = { [key: string]: Code[] | undefined }

export type { AuthorityCodesetsIndex, AuthorityNameSpace, PatientConsentRequestBody, Patient, AuthorityCodeSets }
