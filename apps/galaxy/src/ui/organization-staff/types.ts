import { StaffResource } from '@/types'

interface Staff extends StaffResource {
  firstname: string
  lastname: string
  middlename: string
  staffType: string
  credentials: string
  suppervisedBy: string
  organization: string
  practice: string
  individualNpi: string
  status: string
  dob: string
  gender: string
  language: string
  provviderPreference: string
  email: string
  phone: string
  virtualWaitRoom: boolean
  homeAddress: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
}

interface GetStaffListResponse {
  organizations: Staff[]
  total: number
}

interface StaffSearchParams {
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

export type { Staff, GetStaffListResponse, StaffSearchParams }
