'use client'

import * as api from '@/api/api.client'
import { GET_PRACTICES_ENDPOINT } from '@/api/endpoints'
import { Practice } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includeOrganization: true,
}

const getAllOrganizationPracticesListAction = async (
  payload: Partial<Practice>,
): Promise<api.ActionResult<Practice[]>> => {
  const response = await api.POST<Practice[]>(`${GET_PRACTICES_ENDPOINT}`, {
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

export { getAllOrganizationPracticesListAction }
