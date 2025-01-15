'use client'

import * as api from '@/api/api.client'
import { SEARCH_BOOKED_APPOINTMENTS_ENDPOINT } from '@/api/endpoints'
import { Appointment } from '@/types'

const getBookedAppointmentAction = async (
  appointment?: Appointment,
): Promise<api.ActionResult<Appointment[]>> => {
  if (!appointment) {
    return {
      state: 'error',
      error: 'Appointment not found',
    }
  }
  const payload = {
    startingDate: appointment.startDate,
    endingDate: appointment.endDate,
    locationId: appointment.locationId,
    serviceIds: [appointment.serviceId],
    visitType: appointment.visitTypeCode,
    providerIds: [appointment.providerStaffId],
  }

  const response = await api.POST<Appointment[]>(
    SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
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

export { getBookedAppointmentAction }
