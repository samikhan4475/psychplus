'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'
import { Clinic, Specialist } from '@psychplus-v2/types'
import { getLocalCalendarDate } from '@psychplus-v2/utils'
import type {
  AppointmentAvailability,
  AppointmentClinic,
  CurrentLocation,
  SlotsByDay,
} from '@/features/appointments/search/types'

interface AvailabilityApiResponse {
  availableSlots: {
    type: AppointmentType
    isPlusSlot: boolean
    duration: number
    startDate: string
    endDate: string
    servicesOffered: string[]
  }[]
  specialist: Specialist
  clinic: Clinic
  specialistTypeCode: ProviderType
}

interface AppointmentsSearchApiResponse {
  staffAppointmentAvailabilities: AvailabilityApiResponse[]
}

interface SearchAppointmentsActionParams {
  includeDistance: boolean
  includeStaffBio: boolean
  nextAvailableAppointment?: boolean
  postalCode: string | null
  appointmentType: AppointmentType
  providerType: ProviderType
  startingDate: string
  maxDaysOutToLook: number
  currentLocation: CurrentLocation | null
  staffIds?: number[]
  locationIds?: string[]
  state?: string | null
}

const searchAppointmentsAction = async ({
  currentLocation,
  appointmentType,
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
  ActionResult<AppointmentAvailability[]>
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
    type: appointmentType,
    specialistTypeCode: providerType,
    startingDate,
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
    data: transformResponseData(result.data),
  }
}

const transformResponseData = (data: AppointmentsSearchApiResponse) => {
  const seenSlots = new Set<string>()

  for (const availability of data.staffAppointmentAvailabilities) {
    availability.availableSlots = availability.availableSlots.filter((slot) => {
      const key = `${availability.specialist.id}:${slot.startDate}:${slot.duration}`

      if (seenSlots.has(key)) {
        return false
      } else {
        seenSlots.add(key)
        return true
      }
    })
  }

  const seenProviders: { [key: string]: AppointmentAvailability } = {}

  const availabilities: AppointmentAvailability[] = []

  for (const availability of data.staffAppointmentAvailabilities) {
    const provider = seenProviders[availability.specialist.id]

    if (provider) {
      const slotsByDay = getSlotsByDay(availability)

      mergeSlots(provider.allSlotsByDay, slotsByDay)

      const existingClinic = provider.clinics.find(
        (clinic) => clinic.id === availability.clinic.id,
      )

      if (existingClinic) {
        mergeClinicSlots(existingClinic.slotsByDay, slotsByDay)
      } else {
        provider.clinics.push({
          ...availability.clinic,
          slotsByDay,
        })
      }
    } else {
      const slotsByDay = getSlotsByDay(availability)

      const clinic: AppointmentClinic = {
        ...availability.clinic,
        slotsByDay,
      }

      const newAvailability: AppointmentAvailability = {
        allSlotsByDay: slotsByDay,
        specialistTypeCode: availability.specialistTypeCode,
        specialist: availability.specialist,
        clinics: [clinic],
      }

      availabilities.push(newAvailability)
      seenProviders[availability.specialist.id] = newAvailability
    }
  }

  return availabilities
}

const getSlotsByDay = (data: AvailabilityApiResponse) => {
  const slotsByDay: SlotsByDay = {}

  for (const slot of data.availableSlots) {
    const dayKey = getLocalCalendarDate(slot.startDate).toString()
    const slots = slotsByDay[dayKey]

    if (slots) {
      slots.push(slot)
    } else {
      slotsByDay[dayKey] = [slot]
    }
  }

  return slotsByDay
}

const mergeSlots = (
  existingSlotsByDay: SlotsByDay,
  newSlotsByDay: SlotsByDay,
) => {
  Object.entries(newSlotsByDay).forEach(([key, value]) => {
    existingSlotsByDay[key] = [
      ...(existingSlotsByDay[key] ?? []),
      ...(value ?? []),
    ]
  })
}

const mergeClinicSlots = (
  existingSlotsByDay: SlotsByDay,
  newSlotsByDay: SlotsByDay,
) => {
  for (const [key, value] of Object.entries(newSlotsByDay)) {
    if (!value) {
      continue
    }

    const existingSlots = existingSlotsByDay[key]

    if (!existingSlots) {
      existingSlotsByDay[key] = value
      continue
    }

    const existingSlotSet = new Set(
      existingSlots.map((slot) => `${slot.startDate}:${slot.duration}`),
    )

    const filteredNewSlots = value.filter(
      (slot) => !existingSlotSet.has(`${slot.startDate}:${slot.duration}`),
    )

    existingSlotsByDay[key] = [
      ...(existingSlotsByDay[key] ?? []),
      ...filteredNewSlots,
    ]
  }
}

export { searchAppointmentsAction }
