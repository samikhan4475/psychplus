import * as api from '@/api'
import { PatientProfile } from '@/types'

const getPatientProfile = async (
  id: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const response = await api.GET<PatientProfile>(
    api.PATIENT_PROFILE_ENDPOINT(id),
    {
      next: {
        revalidate: 60,
      },
    },
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

export { getPatientProfile }
