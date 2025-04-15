'use server'

import * as api from '@/api'
import {
  PrescriberDirectoryResponse,
  PrescriberPayload,
} from '../types'

interface CreatePrescriberDirectoryActionParams {
  staffId: string
  locationId: string
  payload?: PrescriberPayload
}

const createPrescriberDirectoryAction = async ({
  staffId,
  locationId,
  payload,
}: CreatePrescriberDirectoryActionParams): Promise<
  api.ActionResult<PrescriberDirectoryResponse>
> => {
  const baseUrl = api.PRESCRIBER_DIRECTORY_ENDPOINT(staffId, locationId)
  const url = new URL(baseUrl)
  if (payload?.serviceLevelTypes?.length) {
    payload.serviceLevelTypes.forEach(type => {
      url.searchParams.append('serviceLevelTypes', type)
    })
  }
  const response = await api.POST<PrescriberDirectoryResponse>(url.toString(), {})
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

export { createPrescriberDirectoryAction }
