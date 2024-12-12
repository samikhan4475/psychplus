import { Metadata, Organization as OrganizationRoot, User } from '@/types'

enum OrganizationPracticeTab {
  ORGANIZATIONS = 'Organizations',
  PRACTICES = 'Practices',
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
  users: User[]
}

interface Organization extends OrganizationRoot {
  contactName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  status: string
  last4: string
  users: User[]
  practices: Practice[]
}

interface GetOrganizationsListResponse {
  organizations: Organization[]
  total: number
}

interface OrganizationsSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  includePractices: boolean
  includeUsers?: boolean
  includeRoles?: boolean
  includePermissions?: boolean
  organizationId?: string
  practiceId?: string
  partialShortName?: string
  recordStatuses?: string[]
}

export {
  OrganizationPracticeTab,
  type Organization,
  type GetOrganizationsListResponse,
  type OrganizationsSearchParams,
}
