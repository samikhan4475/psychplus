'use server'

import * as api from '@/api'
import { ImmunizationDataResponse } from '../types'

interface CreateImmunizationParams {
  appointmentId: string
  payload: Partial<ImmunizationDataResponse>
}

const createImmunizationAction = async ({
  appointmentId,
  payload,
}: CreateImmunizationParams): Promise<
  api.ActionResult<ImmunizationDataResponse>
> => {
  const response = await api.POST<ImmunizationDataResponse>(
    api.CREATE_IMMUNIZATION_ENDPOINT(appointmentId),
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

export { createImmunizationAction }
