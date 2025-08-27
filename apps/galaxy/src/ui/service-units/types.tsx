import { ServiceGroup } from '../service-groups/types'

interface ServiceUnit extends ServiceGroup {
  unit?: string
}

interface GetServiceUnitListResponse {
  units: ServiceUnit[]
  total: number
}

interface ServiceUnitSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  resourceStatus?: string
  id?: string
  serviceId?: string
  locationId?: string
  unit?: string
}

export type { ServiceUnit, GetServiceUnitListResponse, ServiceUnitSearchParams }
