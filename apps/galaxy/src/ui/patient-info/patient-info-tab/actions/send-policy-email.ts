'use server'

import * as api from '@/api'
import { Policy } from '@/types'

const sendPolicyEmailAction = async (
  patientId: string,
  email: string,
  policy: Policy,
) => {
  const result = await api.POST<api.ActionResult<void>>(
    api.SEND_POLICY_NOTICE_ENDPOINT(patientId),
    {
      policyType: policy,
      channels: ['Email'],
      toEmail: email,
    },
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

export { sendPolicyEmailAction }
