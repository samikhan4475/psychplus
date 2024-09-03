'use server'

import * as api from '@/api'
import { POLICY_TYPE_A } from '../../constants'

const sendPolicyEmailAction = async (patientId: string, email: string) => {
  const result = await api.POST<api.ActionResult<void>>(
    api.SEND_POLICY_NOTICE_ENDPOINT(patientId),
    {
      policyType: POLICY_TYPE_A,
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
