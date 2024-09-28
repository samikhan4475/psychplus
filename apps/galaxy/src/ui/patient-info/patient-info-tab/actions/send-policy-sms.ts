'use server'

import * as api from '@/api'
import { Policy } from '@/types'

const sendPolicySmsAction = async (
  patientId: string,
  phone: string,
  policy: Policy,
) => {
  const result = await api.POST<api.ActionResult<void>>(
    api.SEND_POLICY_NOTICE_ENDPOINT(patientId),
    {
      policyType: policy,
      channels: ['Sms'],
      cellPhoneNumber: phone,
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

export { sendPolicySmsAction }
