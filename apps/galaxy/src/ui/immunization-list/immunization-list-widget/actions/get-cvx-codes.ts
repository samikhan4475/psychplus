'use server'

import * as api from '@/api'
import { CvxCodes } from '../types'

const getCvxCodesAction = async (
  input: string,
): Promise<api.ActionResult<CvxCodes[]>> => {
  const url = new URL(api.GET_CVX_CODES(input))

  const response = await api.GET<CvxCodes[]>(
    url.toString(),
  )

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

export { getCvxCodesAction }
