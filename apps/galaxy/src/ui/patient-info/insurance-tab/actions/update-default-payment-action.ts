'use server'

import * as api from '@/api'

const updatePatientDefaultPaymentStatus = async (
  patientId: string,
  financialDataId: string,
  isSelfPay: boolean,
): Promise<api.ActionResult<null>> => {
  const result = await api.POST<null>(
    api.UPDATE_DEFAULT_PAYMENT(patientId, financialDataId, isSelfPay),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: null,
  }
}

export { updatePatientDefaultPaymentStatus }
