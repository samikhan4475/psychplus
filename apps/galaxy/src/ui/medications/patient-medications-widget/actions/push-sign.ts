'use server'

import * as api from '@/api'
import { Prescription } from '../types'

interface PushSignPayloadProps {
  prescriptionDrugIds: string[]
  otpCode?: string
  isSourcePharmacyNotification: boolean
}
const pushSign = async (
  payload: PushSignPayloadProps,
): Promise<api.ActionResult<Prescription[]>> => {
  const response = await api.POST<Prescription[]>(
    api.SELF_PUSHSIGN_ENDPOINT,
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
    data: response.data,
  }
}

export { pushSign }
