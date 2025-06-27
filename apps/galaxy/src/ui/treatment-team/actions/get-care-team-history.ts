'use client'

import * as api from '@/api/api.client'
import { GET_PATIENTS_TREATMENT_TEAM_STATUS_HISTORY } from '@/api/endpoints'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
type CareTeamHistoryFilterOptions = {
  providerType?: string
  patientId: number
  staffId: number
  isIncludeStaffInfo: boolean
}

const getPatientsCareTeamStatusHistoryList = async (
  payload: CareTeamHistoryFilterOptions,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.POST<CareTeam[]>(
    GET_PATIENTS_TREATMENT_TEAM_STATUS_HISTORY(
      payload.staffId,
      payload.patientId,
    ),
    { ...defaultPayload, ...payload },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return response
}

export {
  getPatientsCareTeamStatusHistoryList,
  type CareTeamHistoryFilterOptions,
}
