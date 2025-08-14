'use server'

import * as api from '@/api'

interface DeleteImmunizationParams {
  appointmentId: string
  id: string
}

const deleteImmunizationAction = async ({
  appointmentId,
  id
}: DeleteImmunizationParams): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE(
    api.IMMUNIZATION_URL_ENDPOINT(id, appointmentId),
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

export { deleteImmunizationAction } 