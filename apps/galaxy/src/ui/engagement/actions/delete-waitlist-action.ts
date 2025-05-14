'use server'

import * as api from '@/api'

const deleteWaitlistAction = async ({
  id,
  patientId,
}: {
  id: number
  patientId: number
}): Promise<api.ActionResult<{ id: number; patientId: number }>> => {
  const response = await api.DELETE<{ id: number; patientId: number }>(
    api.DELETE_WAITLIST_ENDPOINT(patientId, id),
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

export { deleteWaitlistAction }
