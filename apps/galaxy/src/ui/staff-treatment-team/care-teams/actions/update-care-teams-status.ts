'use client'

import * as api from '@/api/api.client'
import { UPDATE_CARE_TEAM_MEMBER_STATUS } from '@/api/endpoints'
import { AddCareTeamMember, CareTeam } from '../types'

interface UpdateCareTeamMemberParams {
  staffId: string
  careTeamId: number
  recordStatus: AddCareTeamMember['recordStatus']
}

const updateProviderCareTeamsStatus = async (
  payload: UpdateCareTeamMemberParams,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.PATCH<CareTeam[]>(
    UPDATE_CARE_TEAM_MEMBER_STATUS(
      `${payload.staffId}`,
      `${payload.careTeamId}`,
      `${payload.recordStatus}`,
    ),
    {},
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

export { updateProviderCareTeamsStatus, type UpdateCareTeamMemberParams }
