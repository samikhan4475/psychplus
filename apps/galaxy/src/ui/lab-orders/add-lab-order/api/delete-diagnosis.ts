'use server'

import * as api from '@/api'

const deleteDiagnosisApi = async ({
  appointmentId,
  orderId,
  diagnosisId,
}: {
  appointmentId: number | string
  orderId: string
  diagnosisId: number | string
}): Promise<api.ActionResult<any>> => {
  const response = await api.DELETE<any>(
    api.DELETE_DIAGNOSIS(appointmentId, orderId, diagnosisId),
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

export { deleteDiagnosisApi }
