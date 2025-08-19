'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { SERVICE_GROUPS_LIST_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetServiceGroupListResponse,
  ServiceGroup,
  ServiceGroupSearchParams,
} from '../types'

interface GetServiceGroupsListParams {
  payload?: ServiceGroupSearchParams
  page?: number
  sort?: Sort
}

const defaultPayload: ServiceGroupSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllServiceGroupsAction = async ({
  payload,
  page = 1,
  sort,
}: GetServiceGroupsListParams): Promise<
  api.ActionResult<GetServiceGroupListResponse>
> => {
  const offset = (page - 1) * SERVICE_GROUPS_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.SERVICE_GROUPS_ENDPOINT)
  url.searchParams.append('limit', String(SERVICE_GROUPS_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ServiceGroup[]>(`${url}`, {
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
      groups: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllServiceGroupsAction }
