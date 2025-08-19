import { Metadata } from '@/types'

interface ServiceGroup {
  id: string
  group?: string
  coSignerId?: string
  defaultPractice?: string
  createdOn?: string
  createdByFullName?: string
  metadata?: Metadata
  resourceStatus?: string
  serviceId: string
  locationId: string
  practiceId?: string
  coSignerName?: coSignerName
}
interface coSignerName {
  firstName?: string
  lastName?: string
}

interface GetServiceGroupListResponse {
  groups: ServiceGroup[]
  total: number
}

interface ServiceGroupSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeLocations?: boolean
  includePractices?: boolean
  resourceStatus?: string
  id?: string
  serviceId?: string
}

export type {
  ServiceGroup,
  GetServiceGroupListResponse,
  ServiceGroupSearchParams,
}
