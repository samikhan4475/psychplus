interface Metadata {
  createdOn: string
  updatedOn: string
  updatedBy?: number
  updatedByFullName?: string
}

interface Name {
  firstName: string
  lastName: string
  middleName?: string
  honors?: string
  preferredName?: string
  title?: string
}

interface PhoneNumber {
  type: string
  number: string
}

interface Address {
  type: 'Home' | 'Mailing'
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  geoCoordinates?: {
    longitude?: number
    latitude?: number
    altitude?: number
  }
}

interface PrimaryAddress {
  primaryStreet1?: string
  primaryStreet2?: string
  primaryStreet?: string
  primaryStreetNumber?: string
  primaryCity?: string
  primaryState?: string
  primaryPostalCode?: string
  primaryZipLast4?: string
  primaryCountry?: string
}

interface ContactInfo {
  email: string
  phoneNumbers?: PhoneNumber[]
  addresses?: Address[]
}

interface Guardian {
  name: Name
  isEmergencyContact?: boolean
  relationship?: string
  contact?: ContactInfo
}

interface ContactDetails {
  email: string
  addresses?: Address[]
  isMailingAddressSameAsPrimary?: boolean
}

interface User {
  id?: number
  legalName?: Name
  userRoleCode?: string
  contactInfo?: ContactInfo
  contactDetails?: ContactDetails
  avatar?: string
  dateOfBirth?: string
}

interface Staff {
  id: number
  isTest: boolean
  legalName: Name
  staffRoleCode: string
  contactInfo: ContactInfo
  metadata: Metadata
  virtualRoomLink?: string
}

export type { User, Staff, Name, ContactInfo, Guardian, PrimaryAddress }
