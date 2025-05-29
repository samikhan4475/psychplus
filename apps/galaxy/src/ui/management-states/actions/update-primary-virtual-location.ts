'use server'

import * as api from '@/api'

interface UpdatePrimaryVirtualLocationPayload {
  stateCode: string
  locationId: string
  id: string | undefined
}

export const updatePrimaryVirtualLocationAction = async (
  payload: UpdatePrimaryVirtualLocationPayload[],
): Promise<api.ActionResult<undefined>> => {
  const updatedPayload = payload.map((item) => ({
    ...item,
    status: 'Active',
  }))

  const response = await api.POST(
    api.ADD_VIRTUAL_PRIMARY_LOCATIONS_ENDPOINT,
    updatedPayload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}
