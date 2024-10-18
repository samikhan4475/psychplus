'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

const getFacilityAdmissionIdsOptionsAction = async (
  patientId: number,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.GET<string[]>(
    api.GET_FACILITY_ADMISSION_IDS_ENDPOINT(patientId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: [
      { label: 'Create New', value: 'createNew' },
      ...response.data.map((id) => ({ label: id, value: id })),
    ],
  }
}

export { getFacilityAdmissionIdsOptionsAction }
