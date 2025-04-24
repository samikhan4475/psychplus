'use server'

import * as api from '@/api'
import { LaunchProofingPayload, LaunchProofingResponse } from '../types'

const launchProofing = async (
  callbackUrl: string ,userId:string, loginUserId :string
): Promise<api.ActionResult<string>> => {

  
  const endpoint = userId === loginUserId 
    ? api.LAUNCH_SELF_PROOFINGS_ENDPOINT
    : api.LAUNCH_USERS_PROOFINGS_ENDPOINT(userId); 

  const payload: LaunchProofingPayload = {
    callBackUrl: callbackUrl,
  }

  const response = await api.POST<LaunchProofingResponse>(
    endpoint,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.launchScreenUrl,
  }
}

export { launchProofing }
