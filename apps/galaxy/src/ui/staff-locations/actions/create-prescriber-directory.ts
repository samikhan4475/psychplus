'use server'

import * as api from '@/api'
import { PrescriberDirectoryResponse } from '../types'

interface CreatePrescriberDirectoryActionParams {
  staffId: string
  locationId: string
}
const createPrescriberDirectoryAction = async ({
  staffId,
  locationId,
}: CreatePrescriberDirectoryActionParams): Promise<
  api.ActionResult<PrescriberDirectoryResponse>
> => {
  const url = new URL(api.PRESCRIBER_DIRECTORY_ENDPOINT(staffId, locationId))
  const response = await api.POST<PrescriberDirectoryResponse>(`${url}`, {})

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
