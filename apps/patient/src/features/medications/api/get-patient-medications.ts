import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PatientMedication } from '../types'

const getPatientMedications = async (): Promise<
  ActionResult<PatientMedication[]>
> => {
  const result = await api.GET<PatientMedication[]>(
    `${API_URL}/api/patients/self/prescriptions`,
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

export { getPatientMedications }
