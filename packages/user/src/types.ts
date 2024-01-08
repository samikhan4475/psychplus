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
}

interface PhoneNumber {
  type: string
  number: string
}

interface Address {
  type: 'Home' | 'Mailing'
  street1: string
  city: string
  state: string
  postalCode: string
}

interface ContactInfo {
  email: string
  phoneNumbers: PhoneNumber[]
  addresses?: Address[]
}

interface User {
  id: number
  legalName: Name
  userRoleCode: string
  contactInfo: ContactInfo
  avatar?: string
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

export type { User, Staff }
