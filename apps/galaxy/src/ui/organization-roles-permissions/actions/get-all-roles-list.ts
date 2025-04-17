'use server'

import * as api from '@/api'
import { Role, Sort } from '@/types'
import type { StaffSearchParams } from '../types'

interface GetOrganizationsListParams {
  payload?: Partial<StaffSearchParams>
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includePermissions: true,
}

const getAllRolesListAction = async ({
  payload,
  sort,
}: GetOrganizationsListParams): Promise<api.ActionResult<Role[]>> => {
  const url = new URL(api.GET_USER_ROLES)

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<Role[]>(`${url}`, {
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
    data: response.data,
  }
}

export { getAllRolesListAction }
