'use client'

import * as api from '@/api/api.client'
import { GET_PERMISSIONS_ENDPOINT } from '@/api/endpoints'
import { Permission } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active'],
}

const getPermissionsListAction = async (
  displaySectionCode: string,
): Promise<api.ActionResult<Permission[]>> => {
  const url = GET_PERMISSIONS_ENDPOINT

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
