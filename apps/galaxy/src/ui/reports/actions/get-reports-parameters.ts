'use server'

import * as api from '@/api'
import { Parameter } from '../types'

const getReportParametersTypeAction = async (): Promise<
  api.ActionResult<Parameter>
> => {
  const result = await api.GET<Parameter>(api.GET_REPORTS_PARAMETER_ENDPOINT)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data
  }
}

export { getReportParametersTypeAction }

