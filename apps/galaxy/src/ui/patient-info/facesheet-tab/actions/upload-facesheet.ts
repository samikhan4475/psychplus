'use server'

import * as api from '@/api'
import { Facesheet, UploadFacesheetParams } from '@/types'

const uploadFacesheetAction = async ({
  patientId,
  formData,
}: UploadFacesheetParams): Promise<api.ActionResult<Facesheet>> => {
  const url = new URL(api.UPLOAD_PATIENT_FACESHEET(patientId))
  const response = await api.POST<Facesheet>(url.toString(), formData, {
    ignoreHeaders: false,
  })
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

export { uploadFacesheetAction }
