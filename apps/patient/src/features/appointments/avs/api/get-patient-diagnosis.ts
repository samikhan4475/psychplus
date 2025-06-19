'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { DiagnosisInfo } from '../types'

const getPatientDiagnosisAction = async (appointmentId: string) => {
  const result = await api.GET<DiagnosisInfo[]>(
    `${API_URL}/api/patients/self/appointments/${appointmentId}/diagnoses/actions/history/search`,
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

export { getPatientDiagnosisAction }
