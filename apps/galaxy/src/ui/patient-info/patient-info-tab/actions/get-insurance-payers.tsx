'use server'

import * as api from '@/api'
import { InsurancePayer } from '@/types'

const getInsurancePayersAction = async (): Promise<
  api.ActionResult<InsurancePayer[]>
> => {
  const result = await api.GET<InsurancePayer[]>(
    api.GET_INSURANCE_PAYERS_ENDPOINT(false),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getInsurancePayersAction }
