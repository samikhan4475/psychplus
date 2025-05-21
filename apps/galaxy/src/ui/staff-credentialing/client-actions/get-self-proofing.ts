'use client'

import * as api from '@/api/api.client'
import {
  GET_SELF_PROOFING_STATUS,
  GET_USER_PROOFING_STATUS,
} from '@/api/endpoints'
import { SelfProofingResponse } from '../types'

const getSelfProofing = async (
  userId: string,
  loginUserId: string,
): Promise<api.ActionResult<SelfProofingResponse>> => {
  const endpoint =
    userId === loginUserId
      ? GET_SELF_PROOFING_STATUS
      : GET_USER_PROOFING_STATUS(userId)
  const response = await api.GET<SelfProofingResponse>(endpoint)
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

export { getSelfProofing }
