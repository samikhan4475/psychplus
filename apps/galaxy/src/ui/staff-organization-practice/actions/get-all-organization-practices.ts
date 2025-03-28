'use server'

import * as api from '@/api'
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
  const url = new URL(api.GET_PRACTICES_ENDPOINT)

  const response = await api.POST<Practice[]>(`${url}`, {
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
