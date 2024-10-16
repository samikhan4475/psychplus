'use server'

import * as api from '@/api'
import { Metadata } from '@/types'

interface ServiceDiagnosisData {
  description: string
  code: string
  id: string
  isFavorite: boolean
  isActive: boolean
  metadata: Metadata
}

interface GetServiceDiagnosisResponse {
  serviceDiagnosisData: ServiceDiagnosisData[]
}

const getServiceDiagnosis = async (
  value: string,
): Promise<api.ActionResult<GetServiceDiagnosisResponse>> => {
  const response = await api.POST<ServiceDiagnosisData[]>(
    api.SERVICE_DIAGNOSIS_SEARCH_ENDPOINT,
    {
      CodeOrDescription: value,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      serviceDiagnosisData: response.data,
    },
  }
}

export { getServiceDiagnosis }
