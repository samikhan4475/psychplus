'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface ChangePrimaryProviderCareTeamParams {
  specialistStaffId: number
  specialistType: string
}

const changePrimaryProviderCareTeamAction = async ({
  specialistStaffId,
  specialistType,
}: ChangePrimaryProviderCareTeamParams) => {
  const result = await api.POST(
    `${API_URL}/api/patients/self/careteam/providers/${specialistStaffId}/actions/makeprimary/${specialistType}`,
    {},
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { changePrimaryProviderCareTeamAction }
