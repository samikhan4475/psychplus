'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface RemoveInsuranceParams {
  id: string | undefined
}

const deleteInsurance = async ({
  id,
}: RemoveInsuranceParams): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/patients/self/policies/${id}`,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined
  }
}


export { deleteInsurance }
