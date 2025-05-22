import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { AppointmentMinimalDetails, PolicyType } from '@psychplus-v2/types'

export interface PatientsConsentsParams {
  policyType: PolicyType
  referenceId: string
}

const getPatientsConsentsStatus = async ({
  policyType,
  referenceId,
}: PatientsConsentsParams) => {
  const result = await api.POST<AppointmentMinimalDetails>(
    `${API_URL}/api/patients/self/consents/actions/types/${policyType}/issigned/anonymous/${referenceId}`,
    {},
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getPatientsConsentsStatus }
