'use client'

import * as api from '@/api/api.client'
import { GET_APPOINTMENT_COSIGNERS_ENDPOINT } from '@/api/endpoints';

const getCosignersOptionsAction = async (
  appointmentId: number,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const response = await api.POST<any[]>( //any will update in APi integration PR
    GET_APPOINTMENT_COSIGNERS_ENDPOINT(appointmentId),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    label: `${data.cosigners.legalName.firstName} ${data.legalName.lastName}`,
    value: String(data.cosigners.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getCosignersOptionsAction }
