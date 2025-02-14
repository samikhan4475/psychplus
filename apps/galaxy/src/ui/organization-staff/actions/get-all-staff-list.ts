'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { ORGANIZATIONS_STAFF_LIST_TABLE_PAGE_SIZE } from '../constants'
import type { GetStaffListResponse, Staff, StaffSearchParams } from '../types'

interface GetOrganizationsListParams {
  payload?: Partial<StaffSearchParams>
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeBiography: true,
  isExcludeSelf: true,
  isIncludeAttributions: true,
  isIncludeOrganizations: true,
  isIncludePractices: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllOrganizationStaffListAction = async ({
  payload,
  page = 1,
  sort,
}: GetOrganizationsListParams): Promise<
  api.ActionResult<GetStaffListResponse>
> => {
  const offset = (page - 1) * ORGANIZATIONS_STAFF_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PROVIDERS_ENDPOINT)
  url.searchParams.append(
    'limit',
    String(ORGANIZATIONS_STAFF_LIST_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

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
    data: {
      staff: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllOrganizationStaffListAction }
