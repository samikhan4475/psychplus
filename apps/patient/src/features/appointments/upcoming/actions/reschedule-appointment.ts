'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '@psychplus-v2/types'

interface RescheduleAppointmentParams {
  appointmentId: number
  specialistStaffId: number
  specialistTypeCode: number
  type: string
  startDate: string
  duration: number
  serviceId: string
  locationId: string
}

interface RescheduleAppointmentApiResponse {
  appointments: Appointment[]
}

const rescheduleAppointment = async ({
  appointmentId,
  specialistStaffId,
  specialistTypeCode,
  type,
  startDate,
  duration,
  serviceId,
  locationId,
}: RescheduleAppointmentParams) => {
  const result = await api.PATCH<RescheduleAppointmentApiResponse>(
    `${API_URL}/api/appointments/${appointmentId}`,
    {
      specialistStaffId,
      specialistTypeCode,
      type,
      startDate,
      duration,
      locationId,
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

export { rescheduleAppointment }
