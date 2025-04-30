'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

export interface AddStaffRatingParams {
  appointmentId: string
  rating: number
  comment: string
}

const AddStaffRating = async ({
  appointmentId,
  rating,
  comment,
}: AddStaffRatingParams) => {
  const result = await api.POST(
    `${API_URL}/api/appointments/${appointmentId}/staffratings`,
    { appointmentId, rating, comment },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
  }
}

export { AddStaffRating }
