import { Metadata } from './metadata'

interface ContactDetails {
  addresses?: { type: string; address: string }[]
  email?: string
  phoneNumbers?: { type: string; number: string }[]
  city?: string
  zipcode?: string
}

interface AddLinkAccountListResponse {
  id: string
  metadata?: Metadata
  survivorPatientId: number
  survivorPatientName: {
    firstName: string
    lastName: string
  }
  nonSurvivorPatientId: number
  nonSurvivorPatientName: {
    firstName: string
    lastName: string
  }
}

interface LinkAccountTable {
  mrn: string
  phone: string
  email: string
  status: string
  signIn: string
  scheduleMessagingOrders: string
  priority: string
}
type PhoneNumberType = 'Contact' | 'Home' | 'Business'

interface ApiResponse {
  id: string
  metadata: Metadata
  recordStatus: string
  survivorPatientId: number
  survivorPatientName: Name
  nonSurvivorPatientId: number
  nonSurvivorPatientName: Name
  nonSurvivorPatientContactDetails: {
    addresses?: Address[]
    email?: string
    phoneNumbers?: { type: PhoneNumberType; number: string }[]
  }
  nonSurvivorPatientStatus: string
}

interface Name {
  firstName: string
  middleName?: string
  lastName: string
}

interface Address {
  type: string
  street1: string
  city: string
  state: string
  country: string
  postalCode: string
  zipLast4: string
}

interface PatientLink {
  id: string
  mrn: string
  phone: string
  email: string
  status: string
  scheduleMessagingOrders: string
  signIn: string
  survivorPatientId: number
  nonSurvivorPatientId: number
  recordStatus: string
  survivorPatientName: Name
  nonSurvivorPatientName: Name
}

export {
  type AddLinkAccountListResponse,
  type LinkAccountTable,
  type PatientLink,
  type ApiResponse,
}
