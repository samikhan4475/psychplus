import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { AllergyDataResponse } from '../types'

const getPatientAllergies = async (): Promise<
  ActionResult<AllergyDataResponse[]>
> => {
  const result = await api.GET<AllergyDataResponse[]>(
    `${API_URL}/api/patients/self/allergies`,
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

export { getPatientAllergies }
