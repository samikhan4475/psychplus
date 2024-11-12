import * as api from '@/api'
import { CareTeamResponse } from '../types'

const getPatientCareTeam = async (
  patientId: string,
): Promise<api.ActionResult<CareTeamResponse>> => {
  const response = await api.GET<CareTeamResponse>(
    api.PATIENT_CARE_TEAM_ENDPOINT(patientId),
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

export { getPatientCareTeam }
