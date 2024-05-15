'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface PayCopayParams {
  cardId: number
  amount: number
  appointmentId: number
  paymentType: string
  paymentMethod: string
}

const payCopay = async (
  params: PayCopayParams,
): Promise<ActionResult<void>> => {
  const result = await api.POST(
    `${API_URL}/api/patients/self/appointments/${params.appointmentId}/actions/charge`,
    params,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { payCopay }
