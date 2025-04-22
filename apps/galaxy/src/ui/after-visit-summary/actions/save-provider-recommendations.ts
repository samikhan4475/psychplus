'use server'

import * as api from '@/api'
import {
  ProviderRecommendationsSave,
  Recommendation,
} from '../types/recommendation'

const saveProviderRecommendation = async (
  appointmentId: string,
  payload: ProviderRecommendationsSave,
): Promise<api.ActionResult<Recommendation>> => {
  const response = await api.POST<Recommendation>(
    api.SAVE_PROVIDER_RECOMMENDATIONS(appointmentId),
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

export { saveProviderRecommendation }
