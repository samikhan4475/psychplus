'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { GetStaffListResponse, Staff } from '@/ui/staff-management/types'
import { PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE } from '../constants'

const defaultPayload = {
  isIncludeBiography: true,
  isExcludeSelf: false,
  isIncludeAttributions: true,
  isIncludeOrganizations: true,
  isIncludePractices: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
interface GetStaffListParams {
  payload?: Partial<Staff>
  page?: number
  sort?: Sort
}

const getPreferredPartnerListAction = async ({
  payload,
  page = 1,
  sort,
}: GetStaffListParams): Promise<api.ActionResult<GetStaffListResponse>> => {
  const offset = (page - 1) * PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_STAFF_ENDPOINT)
  url.searchParams.append(
    'limit',
    String(PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE),
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

export { getPreferredPartnerListAction }
