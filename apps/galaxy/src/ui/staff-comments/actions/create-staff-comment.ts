'use server'

import * as api from '@/api'
import type { StaffComment } from '@/types'
import { getAuthCookies } from '@/utils/auth'

interface CreateCommentParams {
  PatientId: string
  AppointmentId: number
  IsBillingComment: boolean
  IsTreatmentComment: boolean
  IsUrgentComment?: boolean
  StaffCommment: string
}

const createStaffCommentAction = async ({
  ...rest
}: CreateCommentParams): Promise<api.ActionResult<StaffComment>> => {
  const auth = getAuthCookies()

  const payload = {
    StaffId: auth?.user.userId,
    CommentedOn: new Date(),
    ...rest,
  }
  const response = await api.POST<StaffComment>(
    api.CREATE_STAFF_COMMENT_ENDPOINT(rest.AppointmentId),
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
