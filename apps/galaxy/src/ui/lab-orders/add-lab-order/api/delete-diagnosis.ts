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
}): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE<void>(
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
    data: undefined,
  }
}

export { deleteDiagnosisApi }
