'use server'

import * as api from '@/api'
import { Facesheet, UpdateFacesheetParams } from '@/types'

const updateFacesheetAction = async ({
  patientId,
  facesheetId,
  payload,
}: UpdateFacesheetParams): Promise<api.ActionResult<Facesheet>> => {
  const result = await api.PUT<Facesheet>(
    api.UPDATE_PATIENT_FACESHEET(patientId, facesheetId),
    payload,
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

export { updateFacesheetAction }
