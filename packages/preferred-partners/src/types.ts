interface PhoneNumber {
  type: string
  number: string
}

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates: GeoCoordinates
}

interface ContactDetails {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface PreferredPartner {
  id: string
  metadata: Metadata
  name: string
  individualRate: number
  coupleRate: number
  familyRate: number
  subscriptionStatus: string
  payerStatus: string
  billingFrequency: string
  plusChargeAmount: number
  serviceChargeAmount: number
  startDate: string
  nextPaymentDate: string
  contactDetails: ContactDetails
  recordStatus: string
  isTest: boolean
}

interface PreferredPartnerPayload {
  partnerIds?: string[]
}

interface PreferredPartnerPatient {
  id: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedBy: number
  }
  name: string
  gender: string
  dob: string
  mrn: string
  patientStatus: string
  contactDetails: {
    email: string
    phoneNumbers: {
      type: string
      number: string
    }[]
    addresses: {
      type: string
      street1: string
      street2: string
      city: string
      state: string
      country: string
      postalCode: string
    }[]
  }
  partnerId: string
  pid: number
  userType: string
  userNumber: number
  userStatus: string
  isPrimaryPartner: boolean
  addDate: string
  termDate: string
  recordStatus: string
}

interface PreferredPartnerWorklist {
  id: string
  metadata: Metadata
  partnerId: string
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: string
  contactDetails: ContactDetails
  userType: string
  familyUserNumber: number
  userStatus: string
  isPrimaryPartner: boolean
  addDate: string
  termDate: string
  isTestUser: boolean
  isDataValid: boolean
  operation: string
  matchStatus: string
  matchPatientId: string
  recordStatus: string
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

interface CreatePreferredPartnerPatientPayload {
  firstName: string
  lastName: string
  gender: string
  dob: Date | string
  mrn: string
  patientStatus: string
  contactDetails: PatientContactDetails
  partnerId: string
  pid: string | number
  userType: string
  userNumber: string | null
  userStatus: string
  isPrimaryPartner: boolean
  addDate: Date | string
  termDate: Date | null | string
  recordStatus: string
}
export type {
  PreferredPartner,
  PreferredPartnerPayload,
  PreferredPartnerPatient,
  PreferredPartnerWorklist,
  CreatePreferredPartnerPatientPayload,
}
