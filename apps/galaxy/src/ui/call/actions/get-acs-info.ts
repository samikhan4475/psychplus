'use server'

import * as api from '@/api'
import { AcsInfo } from '../types'

const getAcsInfo = async (): Promise<api.ActionResult<AcsInfo>> => {
  const response = await api.POST<AcsInfo>(api.GET_ACS_INFO)

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

export { getAcsInfo }
