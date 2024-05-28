import type { LegalName, Metadata } from '@psychplus/clinics/shared'

interface PatientMetadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
}

interface PatientName {
  firstName: string
  lastName: string
  middleName?: string
  preferredName?: string
  title?: string
  honors?: string
}

interface PatientPhoneNumber {
  type: string
  number: string
}

interface PatientAddress {
  type: 'Home' | 'Mailing'
  street1: string
  city: string
  state: string
  postalCode: string
}

interface PatientContactDetails {
  email: string
  phoneNumbers: PatientPhoneNumber[]
  addresses: PatientAddress[]
}

interface Patient {
  id:  number
  userId: number
  legalName: PatientName
  birthdate: string
  gender: string
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

export type {
  Patient,
  PatientParams,
  CareTeamMember,
  CareTeam,
  PatientContactDetails,
}
