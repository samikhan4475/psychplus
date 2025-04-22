'use server'

import * as api from '@/api'
import { sanitizeFormData } from '@/utils'
import { Filters, Recommendation } from '../types/recommendation'

const getProviderRecommendationsHistory = async (
  appointmentId: string,
  filters: Filters,
): Promise<api.ActionResult<Recommendation[]>> => {
  const response = await api.POST<Recommendation[]>(
    api.GET_PROVIDER_RECOMMENDATIONS(appointmentId),
    sanitizeFormData(filters),
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

export { getProviderRecommendationsHistory }
