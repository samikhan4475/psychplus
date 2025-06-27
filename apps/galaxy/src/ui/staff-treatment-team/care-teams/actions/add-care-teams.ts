'use client'

import * as api from '@/api/api.client'
import { ADD_CARE_TEAM_MEMBER } from '@/api/endpoints'
import { AddCareTeamMember, CareTeam } from '../types'

const addProviderCareTeams = async (
  providerId: string,
  payload: AddCareTeamMember,
): Promise<api.ActionResult<CareTeam[]>> => {
  const response = await api.POST<CareTeam[]>(
    ADD_CARE_TEAM_MEMBER(providerId),
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

export { addProviderCareTeams }
