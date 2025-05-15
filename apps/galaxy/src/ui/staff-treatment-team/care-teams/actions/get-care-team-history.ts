'use server'

import * as api from '@/api'
import { CareTeam } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getCareTeamStatusHistoryList = async (
  staffId: string,
  careTeamId: number,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.POST<CareTeam[]>(
    api.GET_CARE_TEAM_MEMBER_STATUS_HISTORY(staffId, careTeamId),
    defaultPayload,
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
