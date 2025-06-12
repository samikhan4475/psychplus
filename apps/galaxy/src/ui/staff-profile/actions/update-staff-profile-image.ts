'use server'

import * as api from '@/api'

interface ProfileImageUploadProps {
  data: FormData
  staffId: number
}

const updateStaffProfileImageAction = async ({
  data,
  staffId,
}: ProfileImageUploadProps): Promise<api.ActionResult<void>> => {
  const result = await api.PATCH<void>(
    api.STAFF_PROFILE_IMAGE_ENDPOINT(staffId),
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

export { updateStaffProfileImageAction }
