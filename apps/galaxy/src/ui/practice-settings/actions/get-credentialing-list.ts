'use server'

import * as api from '@/api'
import type { CredentialingManager } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeLicenseManager: true,
  isIncludePractice: true,
}

const getCredentialingListAction = async (
  pracitceId: string,
): Promise<api.ActionResult<CredentialingManager[]>> => {
  const response = await api.POST<CredentialingManager[]>(
    `${api.GET_PRACTICES_LICENSE_MANAGERS_ENDPOINT(pracitceId)}`,
    {
      ...defaultPayload,
    },
  )

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

export { getCredentialingListAction }
