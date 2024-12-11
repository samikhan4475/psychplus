'use server'

import * as api from '@/api'
import { PrescriberDirectoryResponse } from '../types'

interface UpdatePrescriberDirectoryActionParams {
  staffId: string
  locationId: string
}
const updatePrescriberDirectoryAction = async ({
  staffId,
  locationId,
}: UpdatePrescriberDirectoryActionParams): Promise<
  api.ActionResult<PrescriberDirectoryResponse>
> => {
  const url = new URL(api.PRESCRIBER_DIRECTORY_ENDPOINT(staffId, locationId))
  const response = await api.PUT<PrescriberDirectoryResponse>(`${url}`, {})

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

export { updatePrescriberDirectoryAction }
