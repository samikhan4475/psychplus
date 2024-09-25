'use server'

import * as api from '@/api'
import type { StaffComment } from '@/types'

interface UpdateCommentParams {
  IsUrgentComment: boolean
  commentId: number
  StaffCommment: string
}

const updateStaffCommentAction = async ({
  ...rest
}: UpdateCommentParams): Promise<api.ActionResult<StaffComment>> => {
  const response = await api.PATCH<StaffComment>(
    api.Update_STAFF_COMMENT_ENDPOINT(rest.commentId),
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
    data: response.data,
  }
}

export { updateStaffCommentAction }
