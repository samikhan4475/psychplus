import { DateValue } from 'react-aria-components'
import { SelectOptionType } from '@/types'

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: GeoCoordinates
  timeZoneId?: string
}

interface PhoneNumber {
  type?: string
  number: string
  extension?: string
  comment?: string
}

interface ContactInfo {
  email: string
  emailVerificationStatus: string | null
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
  isMailingAddressSameAsPrimary: boolean
}
interface EmergencyContact {
  name: LegalName
  relationship: string
  contact: ContactInfo
}
interface Guardian {
  name: LegalName
  isEmergencyContact: boolean
  relationship: string
  contact: ContactInfo
}

interface LegalName {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}

interface Staff {
  id: string
  otpCode: string
  legalName: LegalName
  dateOfBirth: DateValue | string | null
  gender: string
  socialSecurityNumber: string
  userRoleId: string
  isTest: boolean
  contactInfo: ContactInfo
  language: string[]
  preferredLanguage: string
  emergencyContact?: EmergencyContact
  guardian?: Guardian
  password: string
  passwordConfirm: string
  referralSource: string
  referralName: string
  hipaaConsentOn: string
  termsOfServiceConsentOn: string
  privacyPolicyConsentOn: string
  staffRoleId: string
  supervisedBy: string
  supervisorStaffId: string
  npi: string
  status: string
  virtualRoomLink: string
  organizationIds: string[]
  practiceIds: string[]
  staffType: string
  providerAttributions: string[]
  staffUserRoleIds: string[]
}

interface User {
  userRoles: UserRole[]
}

interface UserRole {
  id: string
  recordStatus: string
  shortName: string
  displayName: string
  actorCategory: string
}

interface Practice {
  id: string
  practiceOrganizationType: string
  shortName: string
  displayName: string
  taxonomy: string
}
interface OrganizationOptionsResponse {
  id: string
  shortName: string
  displayName: string
  users: User[]
  practices: Practice[]
}
interface OrganizationOptions {
  staffs: SelectOptionType[]
  organizations: SelectOptionType[]
  roles: SelectOptionType[]
  practices: SelectOptionType[]
}
interface GetStaffListResponse {
  staff: Staff[]
  total: number
}

export {
  type Staff,
  type GetStaffListResponse,
  type OrganizationOptionsResponse,
  type OrganizationOptions,
}
