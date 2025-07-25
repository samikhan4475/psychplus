'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { transformInStaffList } from '../data'
import type { Staff } from '../types'
import { staffListStatuses } from '../enums'

const defaultPayload = {
  isIncludeBiography: true,
  isExcludeSelf: false,
  isIncludeAttributions: true,
  isIncludeOrganizations: true,
  isIncludePractices: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  statuses: [staffListStatuses.ACTIVE],
}
interface GetStaffListParams {
  payload?: Partial<Staff>
  page?: number
  sort?: Sort
  pageSize?: number
}

const getStaffListAction = async ({
  payload,
  page = 1,
  sort,
  pageSize,
}: GetStaffListParams): Promise<api.ActionResult<Staff[]>> => {
  const url = new URL(api.GET_STAFF_ENDPOINT)
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
    url.searchParams.append('includeInactive', 'true')
  const response = await api.POST<Staff[]>(`${url}`, {
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
    data: await transformInStaffList(response.data),
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getStaffListAction }
