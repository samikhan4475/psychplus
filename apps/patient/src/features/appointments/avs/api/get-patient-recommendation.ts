'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { ProviderRecommendation } from '../types'

const getPatientRecommendationAction = async (appointmentId: string) => {
  const result = await api.POST<ProviderRecommendation[]>(
    `${API_URL}/api/patients/self/appointments/${appointmentId}/providerrecommendations/actions/history/search`,
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

export { getPatientRecommendationAction }
