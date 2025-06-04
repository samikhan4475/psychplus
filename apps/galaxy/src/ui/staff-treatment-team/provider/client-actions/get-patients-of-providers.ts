'use client'

import * as api from '@/api/api.client'
import { GET_PATIENTS_WITH_PRIMARY_STAFF } from '@/api/endpoints'
import { Patient } from '../types'

interface ProviderRequest {
  staffId: number
  nameContains?: string
  isOnlyCareManagers?: boolean
  isOnlyMedicalAssistants?: boolean
  isNotCareManagers?: boolean
  isNotMedicalAssistants?: boolean
  careTeamId?: number
  recordStatus?: 'Active' | 'Inactive'
  isPrimaryProvider: boolean
  providerType: string
  isIncludePatientInfo?: boolean
}

const getPatientsOfProviders = async (
  payload: ProviderRequest,
): Promise<api.ActionResult<Patient[]>> => {
  const response = await api.POST<Patient[]>(
    GET_PATIENTS_WITH_PRIMARY_STAFF(payload.staffId, payload.isPrimaryProvider),
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

export { getPatientsOfProviders, type ProviderRequest }
