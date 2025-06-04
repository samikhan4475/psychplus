'use client'

import * as api from '@/api/api.client'
import { TRANSFER_PRIMARY_PROVIDER } from '@/api/endpoints'

interface TransferPrimaryPatientRequest {
  staffId: string
  patientIds: number[]
  providerType: string
}

const transferPatientsToPrimaryProvider = async (
  payload: TransferPrimaryPatientRequest,
): Promise<api.ActionResult<string>> => {
  const response = await api.POST<string>(
    TRANSFER_PRIMARY_PROVIDER(payload.staffId, payload.providerType),
    payload.patientIds,
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

export { transferPatientsToPrimaryProvider, type TransferPrimaryPatientRequest }
