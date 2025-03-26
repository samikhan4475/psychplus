'use server'

import * as api from '@/api'
import { Staff } from '@/ui/staff-management/types'

interface UploadBioVideoParams {
  staffId: string
  data: FormData
}

const uploadStaffVideoAction = async ({
  staffId,
  data,
}: UploadBioVideoParams): Promise<api.ActionResult<Staff>> => {
  const response = await api.PATCH<Staff>(
    api.DELETE_STAFF_VIDEO_ENDPOINT(staffId),
    data,
    {
      ignoreHeaders: false,
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

export { uploadStaffVideoAction }
