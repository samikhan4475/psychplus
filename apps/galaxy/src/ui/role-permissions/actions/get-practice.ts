'use server'

import * as api from '@/api'
import { Practice } from '@/types'

interface Payload {
  organizationId?: string
  practiceId?: string
  staffuserId?: number
}

interface GetListParams {
  payload?: Payload
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includePermissions: true,
}

const getPracticeAction = async ({
  payload,
}: GetListParams): Promise<api.ActionResult<Practice[]>> => {
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

export { getPracticeAction }
