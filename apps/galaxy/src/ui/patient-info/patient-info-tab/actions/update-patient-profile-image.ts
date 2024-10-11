'use server'

import * as api from '@/api'

interface ProfileImageUploadProps {
  data: FormData
  patientId: number
}

const updatePatientProfileImageAction = async ({
  data,
  patientId,
}: ProfileImageUploadProps): Promise<api.ActionResult<void>> => {
  const result = await api.PATCH<void>(
    api.UPDATE_PATIENT_PROFILE_IMAGE_ENDPOINT(patientId),
    data,
    { ignoreHeaders: false },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { updatePatientProfileImageAction }
