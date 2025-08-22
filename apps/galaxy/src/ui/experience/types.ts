import type { Experience } from '@/types'

interface GetExperiencesResponse {
  experiences: Experience[]
  total?: number
}

interface UpdateRatingReasonPayload {
  appointmentId: number
  staffComments?: string
  appointmentRatingReason?: string
  isValidateRating?: boolean
}

export { type GetExperiencesResponse, type UpdateRatingReasonPayload }
