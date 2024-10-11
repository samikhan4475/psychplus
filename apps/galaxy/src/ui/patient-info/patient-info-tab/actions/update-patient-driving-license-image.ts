'use server'

import * as api from '@/api'

interface DrivingLicenseImageProps {
  data: FormData
  patientId: number
  side: string
}

const updatePatientDrivingLicenseImageAction = async ({
  data,
  patientId,
  side,
}: DrivingLicenseImageProps): Promise<api.ActionResult<void>> => {
  const result = await api.PATCH<void>(
    api.UPDATE_PATIENT_DRIVING_LICENSE_IMAGE_ENDPOINT(patientId, side),
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

export { updatePatientDrivingLicenseImageAction }
