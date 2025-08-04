'use server'

import * as api from '@/api'
import { MatchingPatient } from '@/ui/external-referral/types'

const associateAppointmentAction = async (
  initialAppointmentId: number,
  externalReferralId: string,
): Promise<api.ActionResult<MatchingPatient>> => {
  const response = await api.POST<MatchingPatient>(
    api.ASSOCIATE_APPOINTMENT_ENDPOINT(
      initialAppointmentId,
      externalReferralId,
    ),
    {},
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

export { associateAppointmentAction }
