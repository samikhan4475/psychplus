'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { InsurancePayer } from '../types/insurance'

const getInsurancePayerPlans = async (
  payersId: string,
): Promise<ActionResult<InsurancePayer>> => {
  const result = await api.GET<InsurancePayer>(
    `${API_URL}/api/insurance/payers/${payersId}?includePlans=true&includeInactive=false&includeTest=false&publicViewable=true`,
    {
      next: {
        revalidate: 3600,
      },
    },
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

export { getInsurancePayerPlans }
