'use server'

import * as api from '@/api'
import { DEFAULT_STATUSES } from '../../organization-practice/constants'
import type { OrganizationsSearchParams } from '../../organization-practice/types'
import { Permission } from '../types'

interface GetOrganizationsListParams {
  payload?: OrganizationsSearchParams
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active'],
}

const getPermissionsListAction = async (
  displaySectionCode: string,
): Promise<api.ActionResult<Permission[]>> => {
  const url = new URL(api.GET_PERMISSIONS_ENDPOINT)

  const response = await api.POST<Permission[]>(`${url}`, {
    ...defaultPayload,
    ...{
      displaySectionCode,
    },
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

export { getPermissionsListAction }
