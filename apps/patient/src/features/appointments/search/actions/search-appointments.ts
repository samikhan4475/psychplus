'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'
import { Clinic, Specialist } from '@psychplus-v2/types'
import type { CurrentLocation } from '@/features/appointments/search/types'

interface AvailabilityApiResponse {
  availableSlots: {
    type: AppointmentType
    isPlusSlot: boolean
    duration: number
    startDate: string
    startDateUtc?: string
    endDate: string
    servicesOffered: string[]
  }[]
  specialist: Specialist
  clinic: Clinic
  specialistTypeCode: ProviderType
  providerType: ProviderType
}

interface AppointmentsSearchApiResponse {
  staffAppointmentAvailabilities: AvailabilityApiResponse[]
}

interface SearchAppointmentsActionParams {
  includeDistance: boolean
  includeStaffBio: boolean
  nextAvailableAppointment?: boolean
  postalCode: string | null
  type: AppointmentType
  providerType: ProviderType
  startingDate: string
  maxDaysOutToLook: number
  currentLocation: CurrentLocation | null
  staffIds?: number[]
  locationIds?: string[]
  state?: string | null
  timeZone?: string
}

const searchAppointmentsAction = async ({
  currentLocation,
  type,
  providerType,
  startingDate,
  maxDaysOutToLook,
  postalCode,
  includeDistance,
  includeStaffBio,
  staffIds,
  locationIds,
  nextAvailableAppointment,
  state,
}: SearchAppointmentsActionParams): Promise<
  ActionResult<AppointmentsSearchApiResponse>
> => {
  const url = new URL(`${API_URL}/api/appointments/availability/search`)
  url.searchParams.append('includeDistance', `${includeDistance}`)
  url.searchParams.append('includeStaffBio', `${includeStaffBio}`)
  if (nextAvailableAppointment)
    url.searchParams.append(
      'nextAvailableAppointment',
      `${nextAvailableAppointment}`,
    )

  const payload = {
    type: type,
    specialistTypeCode: providerType,
    startingDate: new Date(`${startingDate}, 00:00 AM`).toISOString(),
    maxDaysOutToLook,
    postalCode,
    state,
    currentLocation: currentLocation ?? null,
    staffIds: staffIds,
    locationIds: locationIds,
  }

  if (staffIds === undefined) delete payload.staffIds
  if (locationIds === undefined) delete payload.locationIds

  const result = await api.POST<AppointmentsSearchApiResponse>(
    url.toString(),
    payload,
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

export { searchAppointmentsAction }
