'use server'

import * as api from '@/api'
import { PreferredPartnerFiltersPayload, PreferredPartnerUser } from '@/types'

const PREFERRED_PARTNER_PAGE_SIZE = 25

interface SearchPreferredPartnerUsersParams {
  partnerId: string
  filters?: PreferredPartnerFiltersPayload
  page?: number
  sort?: {
    column: string
    direction: 'asc' | 'desc'
  }
  isIncludeOnlyActiveUsers?: boolean
}

interface SearchPreferredPartnerUsersResponse {
  users: PreferredPartnerUser[]
  total: number
}

const searchPreferredPartnerUsersAction = async ({
  partnerId,
  filters = {},
  page = 1,
  sort,
  isIncludeOnlyActiveUsers = false,
}: SearchPreferredPartnerUsersParams): Promise<
  api.ActionResult<SearchPreferredPartnerUsersResponse>
> => {
  const offset = (page - 1) * PREFERRED_PARTNER_PAGE_SIZE

  const url = new URL(api.GET_PREFERRED_PARTNER_USERS(partnerId))
  url.searchParams.append('limit', String(PREFERRED_PARTNER_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const payload = {
    ...filters,
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeOnlyActiveUsers: isIncludeOnlyActiveUsers,
    isIncludeTestResources: true,
    isIncludePatientRecord: true,
  }

  const response = await api.POST<PreferredPartnerUser[]>(
    url.toString(),
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      users: response.data,
      total,
    },
  }
}

export type {
  SearchPreferredPartnerUsersParams,
  SearchPreferredPartnerUsersResponse,
}
export { searchPreferredPartnerUsersAction }
