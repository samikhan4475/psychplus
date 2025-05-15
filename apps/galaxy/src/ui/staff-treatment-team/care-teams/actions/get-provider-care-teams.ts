'use client'

import * as api from '@/api/api.client'
import { GET_CARE_TEAM } from '@/api/endpoints'
import { CareTeam } from '../types'

interface ClinicalStaffListParams {
  isIncludeMetadataResourceChangeControl?: true
  isIncludeMetadataResourceIds?: true
  isIncludeMetadataResourceStatus?: true
  staffId: number
  careTeamId?: number
  nameContains?: string
  isOnlyCareManagers?: boolean
  isOnlyMedicalAssistants?: boolean
}

const getProviderCareTeams = async (
  payload: ClinicalStaffListParams,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.POST<CareTeam[]>(GET_CARE_TEAM, payload)
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

export { getProviderCareTeams }
