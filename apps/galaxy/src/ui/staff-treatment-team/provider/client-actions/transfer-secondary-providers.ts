'use client'

import * as api from '@/api/api.client'
import { TRANSFER_SECONDARY_PROVIDER } from '@/api/endpoints'

interface TransferSecondaryPatientRequest {
  sourceStaffId: string | null
  targetStaffId: string
  patientIds: number[]
  providerType: string
}

type Body = {
  patientIds: number[]
  staffId?: number
}

const transferPatientsToSecondaryProvider = async (
  payload: TransferSecondaryPatientRequest,
): Promise<api.ActionResult<string>> => {
  const { sourceStaffId, targetStaffId, providerType, patientIds } = payload
  const body: Body = { patientIds }

  if (sourceStaffId) body.staffId = +targetStaffId

  const response = await api.POST<string>(
    TRANSFER_SECONDARY_PROVIDER(sourceStaffId || targetStaffId, providerType),
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

export {
  transferPatientsToSecondaryProvider,
  type TransferSecondaryPatientRequest,
}
