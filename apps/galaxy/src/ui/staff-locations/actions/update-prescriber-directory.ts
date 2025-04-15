'use server'

import * as api from '@/api'
import { PrescriberDirectoryResponse, PrescriberPayload } from '../types'

interface UpdatePrescriberDirectoryActionParams {
  staffId: string
  locationId: string
  payload?: PrescriberPayload

}
const updatePrescriberDirectoryAction = async ({
  staffId,
  locationId,
  payload
}: UpdatePrescriberDirectoryActionParams): Promise<
  api.ActionResult<PrescriberDirectoryResponse>
> => {
  const url = new URL(api.PRESCRIBER_DIRECTORY_ENDPOINT(staffId, locationId))
  if (payload?.serviceLevelTypes?.length) {
    payload.serviceLevelTypes.forEach(type => {
      url.searchParams.append('serviceLevelTypes', type)
    })
  }
  const response = await api.PUT<PrescriberDirectoryResponse>(url.toString(), {})
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
