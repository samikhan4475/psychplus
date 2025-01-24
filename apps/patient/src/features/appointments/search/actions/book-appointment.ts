'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { AppointmentType } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'
import type { Appointment } from '@psychplus-v2/types'

interface BookAppointmentParams {
  locationId: string
  specialistStaffId: number
  specialistTypeCode: number
  type: AppointmentType
  startDate: string
  duration: number
  reason?: string
  serviceId: string
}

interface BookAppointmentApiResponse {
  appointments: Appointment[]
}

const bookAppointmentAction = async ({
  locationId,
  specialistStaffId,
  specialistTypeCode,
  type,
  startDate,
  duration,
  reason,
  serviceId,
}: BookAppointmentParams): Promise<
  ActionResult<BookAppointmentApiResponse>
> => {
  const result = await api.POST<BookAppointmentApiResponse>(
    `${API_URL}/api/appointments/book`,
    {
      locationId,
      specialistStaffId,
      specialistTypeCode,
      type,
      startDate,
      duration,
      reason: reason || null,
      serviceId,
    },
  )


  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { bookAppointmentAction }
