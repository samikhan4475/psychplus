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
  id: number
  userId: number
  legalName: PatientName
  birthdate: string
  gender: string
  contactDetails: PatientContactDetails
  metadata: PatientMetadata
  isPlusMember: boolean
  hasPhoto: boolean
}

interface PatientParams {
  patientId: number
}

export type { Patient, PatientParams }
