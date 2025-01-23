import { Metadata, Organization as OrganizationRoot, User } from '@/types'

enum OrganizationPracticeTab {
  ORGANIZATIONS = 'Organization',
  PRACTICES = 'Practice',
}

interface OrganizationAddress {
  type?: string
  street1: string
  street2: string
  city: string
  state: string
  country?: string
  postalCode: string
  timeZoneId?: string
}

interface Practice {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceOrganizationType: string
  shortName: string
  displayName: string
  taxonomy: string
  socialSecurityNumber: string
  defaultClearinghouseReceiverId: string
  taxId: string
  practiceAddress: OrganizationAddress
  practicePaymentAddress: OrganizationAddress
  npi: string
  clia: string
  practicePhone: string
  practiceFax: string
  defaultProviderStaffId: number
  defaultProviderName: string
  practiceAddressId: string
  paymentAddressId: string
  users: User[]
  tin?: string
}

interface OrganizationAddress {
  type?: string
  street1: string
  street2: string
  city: string
  state: string
  country?: string
  postalCode: string
  timeZoneId?: string
}

interface Organization extends OrganizationRoot {
  contactName: string
  email: string
  phone: string
  street1: string
  street2: string
  city: string
  state: string
  zip: string
  status: string
  last4: string
  users: User[]
  practices: Practice[]
  locationId: string
  contactPhone: string
  contactEmail: string
  organizationAddress: OrganizationAddress
  ehrPartner?: boolean
  practicesNames?: string
}

interface GetOrganizationsListResponse {
  organizations: Organization[]
  total: number
}

interface OrganizationsSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeLocations?: boolean
  includePractices?: boolean
  includeUsers?: boolean
  includeRoles?: boolean
  includePermissions?: boolean
  organizationId?: string
  practiceId?: string
  partialShortName?: string
  partialContactName?: string
  phoneNumber?: string
  email?: string
  partialAddress1?: string
  partialAddress2?: string
  city?: string
  stateName?: string
  stateCode?: string
  zip?: string
  recordStatuses?: string[]
  isIncludePracticeAddressLocation?: boolean
  isIncludePaymentAddressLocation?: boolean
}

interface PracticeSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeLocations?: boolean
  includePractices?: boolean
  includeUsers?: boolean
  includeRoles?: boolean
  includePermissions?: boolean
  id?: string
  organizationId: string
  metadata?: Metadata
  recordStatus?: string
  practiceOrganizationType?: string
  shortName?: string
  displayName?: string
  taxonomy?: string
  socialSecurityNumber?: string
  defaultClearinghouseReceiverId?: string
  taxId?: string
  users?: User[]
  npi?: string
  tin?: string
  clia?: string
  practiceAddress?: OrganizationAddress
  practicePhone?: string
  practiceFax?: string
  practicePaymentAddress?: OrganizationAddress
  defaultProviderName?: string
  isIncludePracticeAddressLocation?: boolean
  isIncludePaymentAddressLocation?: boolean
}

export {
  OrganizationPracticeTab,
  type Organization,
  type GetOrganizationsListResponse,
  type OrganizationsSearchParams,
  type Practice,
  type OrganizationAddress,
  type PracticeSearchParams,
}
