'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { PatientProfile } from '@psychplus-v2/types'

const updateProfileAction = async (
  data: PatientProfile,
): Promise<ActionResult<PatientProfile>> => {
  const result = await api.PATCH<PatientProfile>(
    `${API_URL}/api/patients/self/profile`,
    data,
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

export { updateProfileAction }
