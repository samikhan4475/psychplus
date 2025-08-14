'use server'

import * as api from '@/api'
import { ImmunizationDataResponse } from '../types'

interface UpdateImmunizationParams {
  appointmentId: string
  payload: Partial<ImmunizationDataResponse>
}

const updateImmunizationAction = async ({
  appointmentId,
  payload,
}: UpdateImmunizationParams): Promise<
  api.ActionResult<ImmunizationDataResponse>
> => {
  const response = await api.PUT<ImmunizationDataResponse>(
    api.IMMUNIZATION_URL_ENDPOINT(payload.id!, appointmentId),
    payload,
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

export { updateImmunizationAction }
