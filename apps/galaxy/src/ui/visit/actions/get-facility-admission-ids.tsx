'use server'

import * as api from '@/api'
import type { Clinic } from '../types'

const getFacilityAdmissionIds = async (patientId: string): Promise<
  api.ActionResult<Clinic[]>
> => {
  const response: any = {
    state: 'success',
    data: [
      {
        id: '0',
        name: 'Create New',
      },
      {
        id: '1',
        name: 'Facility 1' + patientId,
      },
      {
        id: '2',
        name: 'Facility 2',
      },
    ],
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // await api.GET<Clinic[]>(
  //   `${api.CLINIC_LOCATIONS_ENDPOINT}?stateId=${stateId}`,
  // )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { getFacilityAdmissionIds }
