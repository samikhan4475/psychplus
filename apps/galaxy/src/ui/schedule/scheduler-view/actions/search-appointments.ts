'use server'

import { parseAbsolute } from '@internationalized/date'
import * as api from '@/api'
import {
  AppointmentAvailability,
  AppointmentClinic,
  AppointmentsSearchApiResponse,
  AvailabilityApiResponse,
  SlotsByDay,
} from '../types'
import { extractDate } from '../utils'

const searchAppointmentsAction = async (): Promise<
  api.ActionResult<AppointmentAvailability[]>
> => {
  const result = await api.POST<AppointmentsSearchApiResponse>(
    api.SEARCH_AVAILABLE_APPOINTMENT_SLOTS_ENDPOINT,
    { maxDaysOutToLook: 90 },
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
  availabilities.forEach((availability) => {
    const slotsByDay = availability.allSlotsByDay
    Object.keys(slotsByDay).forEach((dayKey) => {
      if (slotsByDay[dayKey])
        slotsByDay[dayKey].sort((a, b) => {
          const startDateA = parseAbsolute(a.startDate, a.timeZoneId)
          const startDateB = parseAbsolute(b.startDate, b.timeZoneId)

          return startDateA.compare(startDateB)
        })
    })
  })
  return availabilities
}

const getSlotsByDay = (data: AvailabilityApiResponse) => {
  const slotsByDay: SlotsByDay = {}
  const timezone = data.clinic.timeZoneId
  for (const slot of data.availableSlots) {
    // A provider may offer services in clinics across different states
    const slotwithTimezone = { ...slot, timeZoneId: timezone }
    const dayKey = extractDate(slotwithTimezone.startDate, timezone)
    const slots = slotsByDay[dayKey]

    if (slots) {
      slots.push(slotwithTimezone)
    } else {
      slotsByDay[dayKey] = [slotwithTimezone]
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
