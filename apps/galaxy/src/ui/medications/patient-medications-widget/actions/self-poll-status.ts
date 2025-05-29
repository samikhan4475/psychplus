'use server'

import * as api from '@/api'
import { ActionResult } from '@/api'

import { SelfPollStatusPayloadProps } from '../types'
interface SelfPollStatusRawResponse {
  pending: boolean
  signatureType: string
}

const selfPollStatus = async (
  payload: SelfPollStatusPayloadProps
): Promise<ActionResult<SelfPollStatusRawResponse>> => {
  const response = await api.POST<SelfPollStatusRawResponse>(
    api.SELF_POLLSTATUS_ENDPOINT,
    payload
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

export { selfPollStatus }
