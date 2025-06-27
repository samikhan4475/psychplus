'use client'

import * as api from '@/api/api.client'
import { GET_PATIENTS_WITH_PRIMARY_STAFF } from '@/api/endpoints'
import { Metadata } from '@/types'

type ProviderTeam = {
  staffId: number
  staffName: {
    firstName: string
    lastName: string
  }
  treatmentTeamId: number
  metadata: Metadata
  providerType: string
  recordStatus: string
  isPrimary: boolean
}

interface ProvidersOfPatientsRequest {
  careTeamId?: number
  isIncludePatientInfo?: boolean
  isIncludeStaffInfo?: boolean
  isOnlyCareManagers?: boolean
  isOnlyMedicalAssistants?: boolean
  isPrimaryProvider?: boolean
  nameContains?: string
  recordStatus?: 'Active' | 'Inactive'
  patientId?: number
  staffId?: number
  providerType?: 'Psychiatrist' | 'Therapy'
}

const getProvidersOfPatients = async (
  payload: ProvidersOfPatientsRequest,
): Promise<api.ActionResult<ProviderTeam[]>> => {
  const response = await api.POST<ProviderTeam[]>(
    GET_PATIENTS_WITH_PRIMARY_STAFF(
      payload.staffId ?? 11,
      payload.isPrimaryProvider ?? false,
    ),
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

export {
  getProvidersOfPatients,
  type ProvidersOfPatientsRequest,
  type ProviderTeam,
}
