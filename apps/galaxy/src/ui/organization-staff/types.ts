import { StaffResource } from '@/types'

interface UserRole {
  id: string
  recordStatus: string
  shortName: string
  displayName: string
  actorCategory: string
}
interface User {
  userRoles: UserRole[]
}
interface Organization {
  id: string
  recordStatus: string
  shortName: string
  displayName: string
  locationId: string
  contactName: string
  contactPhone: string
  contactEmail: string
  users: User[]
}

interface Practice {
  id: string
  recordStatus: string
  shortName: string
  displayName: string
  practiceFax: string
  defaultProviderName: string
  organizationShortName: string
  organizationDisplayName: string
}

interface Staff extends StaffResource {
  npi: string
  staffId?: number
  status: string
  gender: string
  phoneContact: string
  supervisedBy: string
  dateOfBirth: string
  staffTypes: string[]
  staffUserRoleIds: string[]
  organizationIds: string[]
  practiceIds: string[]
  providerAttributions: string[]
  supervisorStaffId: number
  language?: string[]
  password?: string
  preferredLanguage?: string
  staffRoleId?: string
  staffType?: string
  staffOrganizations: Organization[]
  staffPractice: Practice[]
  firstName: string
  lastName: string
  dob: string
  middleName: string
  address: string
  address2: string
  country: string
  stateCode: string
  city: string
  postalCode: string
  secondaryAddress: string
  secondaryAddress2: string
  secondaryCountry: string
  secondaryStateCode: string
  secondaryCity: string
  secondaryPostalCode: string
  spokenLanguages: string[]
  virtualRoomLink: string
  biography: string
  title: string
  email: string
  specialists: number[]
  isMailingAddressSameAsPrimary?: boolean
}

interface GetStaffListResponse {
  staff: Staff[]
  total: number
}

interface StaffSearchParams {
  firstName: string
  lastName: string
  staffIds: number[]
  locationIds: string[]
  name: string
  npi: string
  dateOfBirth: string
  email: string
  phone: string
  roleCodes: string[]
  statuses: string[]
  gender: string
  staffUserRoleIds: string[]
  staffType: string
  spokenLanguage: string
  providerType: string
  organizationsIds?: string[]
  practicesIds: string[]
  providerAttributionCodes: string[]
  spokenLanguages?: string[]
  honors: string[]
}

export type {
  Staff,
  GetStaffListResponse,
  StaffSearchParams,
  Organization,
  Practice,
}
