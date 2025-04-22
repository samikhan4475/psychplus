'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import {
  DEFAULT_STATUSES,
  ORGANIZATIONS_LIST_TABLE_PAGE_SIZE,
} from '../constants'
import type {
  GetOrganizationsListResponse,
  Organization,
  OrganizationsSearchParams,
} from '../types'

interface GetOrganizationsListParams {
  payload?: OrganizationsSearchParams
  page?: number
  sort?: Sort
}

const defaultPayload: OrganizationsSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeLocations: true,
  includePractices: true,
  recordStatuses: DEFAULT_STATUSES,
}

const getAllOrganizationsListAction = async ({
  payload,
  page = 1,
  sort,
}: GetOrganizationsListParams): Promise<
  api.ActionResult<GetOrganizationsListResponse>
> => {
  const offset = (page - 1) * ORGANIZATIONS_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_ORGANIZATIONS_ENDPOINT)
  url.searchParams.append('limit', String(ORGANIZATIONS_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<Organization[]>(`${url}`, {
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
      organizations: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllOrganizationsListAction }
