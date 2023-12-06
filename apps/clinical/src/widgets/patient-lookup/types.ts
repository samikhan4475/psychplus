type PhoneNumber = {
  type: string
  number: string
}

type Address = {
  type: string
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
}

type ContactDetails = {
  email: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

type Guardian = {
  name: {
    firstName: string
    lastName: string
  }
  isEmergencyContact: boolean
  relationship: string
  contact: {
    phoneNumbers: PhoneNumber[]
  }
}

type LegalName = {
  firstName: string
  lastName: string
}

type Metadata = {
  createdOn: string
  createdBy: number
  createdByFullName?: string
  updatedOn?: string
  updatedBy?: number
  updatedByFullName?: string
}

interface Patients {
  id: number
  metadata: Metadata
  userId: number
  legalName: LegalName
  birthdate: string
  gender: string
  isPlusMember: boolean
  hasPhoto: boolean
  contactDetails: ContactDetails
  guardian?: Guardian
  chargeKey?: string
}

interface PatientsPayload {
  name: string | null
  gender: string | null
  dateOfBirth: string | null
  age: number | null
  email: string | null
  telephone: string | null
  ssn: string | null
  city: string | null
  postalCode: string | null
  hasGuardian?: boolean | null
  mrn: string | null
  patientCreatedFrom: string | null
  patientCreatedTo?: string | null
  patientStatuses: string[]
  contactMadeStatuses: string[]
  hasNextAppointment: boolean | null
}

interface DropDown {
  name: string | null
  gender: string | null
}

export type { Patients, PatientsPayload, DropDown }
