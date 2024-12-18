'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { ORGANIZATIONS_STAFF_LIST_TABLE_PAGE_SIZE } from '../constants'
import type { GetStaffListResponse, Staff, StaffSearchParams } from '../types'

interface GetOrganizationsListParams {
  payload?: StaffSearchParams
  page?: number
  sort?: Sort
}

const getAllOrganizationsListAction = async ({
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
      organizations: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllOrganizationsListAction }
