'use server'

import * as api from '@/api'
import type { GetCommentsData, StaffComment, StaffCommentParams } from '@/types'

const getPatientStaffCommentsAction = async ({
  ...rest
}: Partial<StaffCommentParams>): Promise<api.ActionResult<GetCommentsData>> => {
  const response = await api.POST<StaffComment[]>(
    api.GET_PATIENT_STAFF_COMMENTS_ENDPOINT,
    rest,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      comments: response.data,
    },
  }
}

export { getPatientStaffCommentsAction }
