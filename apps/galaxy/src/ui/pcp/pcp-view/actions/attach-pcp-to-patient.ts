'use server'

import * as api from '@/api'
import { ExternalProvider } from '../../types'

type AttachPcpToPatientActionPayload = {
  patientId: string
  externalProviderId: string
  relationship: string
}

const attachPcpToPatientAction = async (
  payload: AttachPcpToPatientActionPayload,
): Promise<api.ActionResult<ExternalProvider[]>> => {
  const result = await api.POST(
    api.ATTACH_PCP_TO_PATIENT_ENDPOINT(
      payload.patientId,
      payload.externalProviderId,
    ),
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
    data: result.data as ExternalProvider[],
  }
}

export { attachPcpToPatientAction }
