'use server'

import * as api from '@/api'
import {
  LaunchCredentialingResponse,
  LaunchProofingPayload
} from '../types'

const launchCredentialing = async (
  callbackUrl: string,
  userId: string,
  loginUserId: string,
): Promise<api.ActionResult<string>> => {
  const endpoint =
    userId === loginUserId
      ? api.LAUNCH_SELF_CREDENTIALING_ENDPOINT
      : api.LAUNCH_USER_CREDENTIALING_ENDPOINT(userId)

  const payload: LaunchProofingPayload = {
    callBackUrl: callbackUrl,
  }

  const response = await api.POST<LaunchCredentialingResponse>(
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
    data: response.data.launchSelfAdminUrl,
  }
}

export { launchCredentialing }
