'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'
import type { GetPatientMedicationOrderResponse } from '../types'

interface CancelPatientPrescriptionsParams {
  prescriptionId: string
}

const cancelNonFeatureFlagPrescriptions = async ({
  prescriptionId,
}: CancelPatientPrescriptionsParams): Promise<
  api.ActionResult<GetPatientMedicationOrderResponse>
> => {
  const auth = getAuthCookies()
  const senderUserId = auth?.user?.userId ?? 0

  const body = {
    prescriptionRequestItems: [
      {
        prescriptionId,
        changeOfPrescriptionStatusFlag: 'Cancel',
        senderUserId,
      },
    ],
  }

  const response = await api.DELETE<GetPatientMedicationOrderResponse>(
    api.CANCEL_PRESCRIPTIONS_ENDPOINT,
    body,
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

export { cancelNonFeatureFlagPrescriptions }
