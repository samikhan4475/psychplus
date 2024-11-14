import { Metadata } from '@/types'

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
  timeZoneId: string
}

interface PhoneNumber {
  type: string
  number: string
  extension: string
  comment: string
}

interface ContactInfo {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
  isMailingAddressSameAsPrimary: boolean
}

interface LegalName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface Staff {
  id: number
  metadata: Metadata
  isTest: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo: ContactInfo
  spokenLanguages: string[]
  virtualRoomLink: string
  bio: string
  hasPhoto: boolean
  rating: number
  npi: string
  status: string
  gender: string
  phoneContact: string
  supervisedBy: string
  dateOfBirth: string
  staffType: string
  staffUserRoles: string[]
  organizationIds: string[]
  practiceIds: string[]
  providerAttributions: string[]
  supervisorStaffId: number
}
interface GetStaffListResponse {
  staff: Staff[]
  total: number
}

export { type Staff, type GetStaffListResponse }
