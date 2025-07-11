'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

const deleteWaitlist = async (
  waitlistId: string,
): Promise<ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/patients/self/waitlists/${waitlistId}`,
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

export { deleteWaitlist }
