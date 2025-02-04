'use server'

import * as api from '@psychplus-v2/api'
import { AppointmentType } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'

interface BookAppointmentParams {
  locationId: string
  specialistStaffId: number
  specialistTypeCode: number
  type: AppointmentType
  startDate: string
  duration: number
  reason?: string
  serviceId?: string
  isSelfPay?: boolean
  stateCode:string
  providerType?: string
}

const bookAppointmentAction = async ({
  locationId,
  specialistStaffId,
  specialistTypeCode,
  type,
  startDate,
  duration,
  serviceId,
  isSelfPay,
  stateCode,
  providerType
}: BookAppointmentParams) => {
  const result = await api.POST(`${API_URL}/api/appointments/book`, {
    locationId,
    specialistStaffId,
    specialistTypeCode,
    type,
    startDate,
    duration,
    serviceId,
    isSelfPay,
    stateCode,
    providerType
  })

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
