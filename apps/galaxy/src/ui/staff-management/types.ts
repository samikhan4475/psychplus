import { DateValue } from 'react-aria-components'
import { SelectOptionType } from '@/types'

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
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
  userId: string
  otpCode: string
  legalName: LegalName
  dateOfBirth: DateValue | string | null
  gender: string
  socialSecurityNumber: string
  userRoleId: string
  isTest?: boolean
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
  staffType: string
  bio: string
  phoneContact: string
  virtualRoomLink: string
  staffTypes: string[]
  organizationIds: string[]
  practiceIds: string[]
  spokenLanguages: string[]
  providerAttributions?: string[]
  staffUserRoleIds: string[]
  hasBioVideo?: boolean
  timeZonePreference: string
}

interface StaffSearchParams extends Staff {
  isIncludeMetadataResourceChangeControl: boolean
  isIncludeMetadataResourceIds: boolean
  isIncludeMetadataResourceStatus: boolean
  locationIds: string[]
  firstName: string
  lastName: string
  roleCodes: string[]
  staffIds: string[]
  statuses: string[]
  spokenLanguage: string
  providerType: string
  isIncludeBiography: boolean
  isExcludeSelf: boolean
  isIncludeAttributions: boolean
  isIncludeOrganizations: boolean
  isIncludePractices: boolean
  organizationsIds: string[]
  practicesIds: string[]
  providerAttributionCodes: string[]
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
  type Address,
  type GetStaffListResponse,
  type OrganizationOptionsResponse,
  type StaffSearchParams,
  type OrganizationOptions,
}
