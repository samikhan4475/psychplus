'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

const addPharmacyAction = async (
  pharmacyId: string,
): Promise<ActionResult<void>> => {
  const result = await api.POST(
    `${API_URL}/api/patients/self/pharmacies/${pharmacyId}/actions/associate`,
    {},
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

export { addPharmacyAction }
