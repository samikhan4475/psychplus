'use client'

import * as api from '@/api/api.client'
import { GET_CARE_TEAM_MEMBER_STATUS_HISTORY } from '@/api/endpoints'
import { CareTeam } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getCareTeamStatusHistoryList = async (
  providerId: number,
  careTeam: CareTeam,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.POST<CareTeam[]>(
    GET_CARE_TEAM_MEMBER_STATUS_HISTORY(providerId, careTeam.careTeamId),
    {
      ...defaultPayload,
      providerId,
      staffId: careTeam.staffId,
      isOnlyMedicalAssistants: careTeam.isMedicalAssistant,
      isOnlyCareManagers: careTeam.isCareManager,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return response
}

export { getCareTeamStatusHistoryList }
