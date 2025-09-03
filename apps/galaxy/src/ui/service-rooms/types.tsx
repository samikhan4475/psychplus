import { ServiceGroup } from '../service-groups/types'

interface ServiceRoom extends ServiceGroup {
  id: string
  room?: string
}

interface GetServiceRoomListResponse {
  rooms: ServiceGroup[]
  total: number
}

interface ServiceRoomSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  recordStatuses?: string[]
  id?: string
  serviceId?: string
}

export type { ServiceRoom, GetServiceRoomListResponse, ServiceRoomSearchParams }
