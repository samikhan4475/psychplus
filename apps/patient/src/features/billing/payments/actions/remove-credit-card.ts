'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface RemoveCreditCardParams {
  id: number
}

const removeCreditCardAction = async ({
  id,
}: RemoveCreditCardParams): Promise<ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/patients/self/creditcards/${id}`,
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

export { removeCreditCardAction }
