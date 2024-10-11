'use server'

import * as api from '@/api'
import type { GetCommentsData, StaffComment, StaffCommentParams } from '@/types'

const getPatientStaffCommentsAction = async ({
  ...rest
}: Partial<StaffCommentParams>): Promise<api.ActionResult<GetCommentsData>> => {
  const url = new URL(api.GET_PATIENT_STAFF_COMMENTS_ENDPOINT)
  url.searchParams.append('limit', String(0))
  url.searchParams.append('offset', String(0))
  url.searchParams.append('orderBy', 'commentDate desc')

  const response = await api.POST<StaffComment[]>(url.toString(), rest)
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
