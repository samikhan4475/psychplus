'use server'

import * as api from '@/api'
import { NotificationType } from '@/types'

interface SendPoilcyNoticeParams {
  policyType: string
  channels: NotificationType[]
  toEmail?: string
  cellPhoneNumber?: string
  patientId: string
}

const sendPolicyNoticeAction = async (payload: SendPoilcyNoticeParams) => {
  const result = await api.POST<api.ActionResult<void>>(
    api.SEND_POLICY_NOTICE_ENDPOINT(payload.patientId),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
  }
}

export { sendPolicyNoticeAction }
