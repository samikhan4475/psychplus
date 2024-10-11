'use server'

import * as api from '@/api'
import type { StaffComment } from '@/types'
import { getAuthCookies } from '@/utils/auth'

interface CreateCommentParams {
  patientId?: string
  appointmentId: number
  isBillingComment: boolean
  isTreatmentComment: boolean
  isUrgentComment?: boolean
  staffCommment: string
}

const createStaffCommentAction = async ({
  ...rest
}: CreateCommentParams): Promise<api.ActionResult<StaffComment>> => {
  const auth = getAuthCookies()

  const payload = {
    staffId: auth?.user.userId,
    ...rest,
  }
  const response = await api.POST<StaffComment>(
    api.CREATE_STAFF_COMMENT_ENDPOINT(rest.appointmentId),
    payload,
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
