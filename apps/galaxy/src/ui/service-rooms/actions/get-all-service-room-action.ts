'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { ROOM_STATUSES, SERVICE_ROOM_LIST_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetServiceRoomListResponse,
  ServiceRoom,
  ServiceRoomSearchParams,
} from '../types'

interface GetServiceRoomListParams {
  payload?: ServiceRoomSearchParams
  page?: number
  sort?: Sort
}

const defaultPayload: ServiceRoomSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ROOM_STATUSES.map((status) => status.value),
}

const getAllServiceRoomAction = async ({
  payload,
  page = 1,
  sort,
}: GetServiceRoomListParams): Promise<
  api.ActionResult<GetServiceRoomListResponse>
> => {
  const offset = (page - 1) * SERVICE_ROOM_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.SERVICE_ROOM_ENDPOINT)
  url.searchParams.append('limit', String(SERVICE_ROOM_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ServiceRoom[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      rooms: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllServiceRoomAction }
