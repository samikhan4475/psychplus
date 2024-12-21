'use server'

import * as api from '@/api'
import type { StaffComment } from '@/types'

interface CreateCommentParams {
  patientId?: string
  appointmentId: number
  isBillingComment: boolean
  isTreatmentComment: boolean
  isUrgentComment?: boolean
  comment: string
}

const createStaffCommentAction = async ({
  ...rest
}: CreateCommentParams): Promise<api.ActionResult<StaffComment>> => {

  const response = await api.POST<StaffComment>(
    api.CREATE_STAFF_COMMENT_ENDPOINT(rest.appointmentId),
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

export { createStaffCommentAction }
