'use server'

import * as api from '@/api'
import { StartPmpRequest, StartPmpResponse } from '../types'

interface StartPMPActionParams {
  payload?: StartPmpRequest
}

const startPMPAction = async ({
  payload,
}: StartPMPActionParams): Promise<api.ActionResult<StartPmpResponse>> => {
  const url = new URL(api.PMP_START(String(payload?.patientId)))
  const response = await api.POST<StartPmpResponse>(`${url}`, {
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { startPMPAction }
