'use server'

import { searchAppointments } from './api.server'
import { ApiAppointmentAvailability, AvailableSlots } from './types'
import { extractDate } from './utils'

type SlotsByDay = { [key: string]: AvailableSlots[] | undefined }

enum ProviderType {
  Psychiatrist = 1,
  Therapist = 2,
}

type PhoneNumberType = 'Contact'

interface PhoneNumber {
  type: PhoneNumberType
  number?: string
  comment?: string
}

interface Address {
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: {
    longitude: number
    latitude: number
  }
}

interface ClinicContactDetails {
  email?: string
  phoneNumbers?: PhoneNumber[]
  addresses?: Address[]
}

export interface AppointmentAvailability {
  allSlotsByDay: SlotsByDay
  specialist: AppointmentSpecialist
  clinics: AppointmentClinic[]
  specialistTypeCode: ProviderType
}

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating: number
}

interface AppointmentClinic {
  id: string
  name: string
  isTest?: boolean
  contact: ClinicContactDetails
  slotsByDay: SlotsByDay
  distanceInMiles?: number
}

interface LegalName {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}

const searchAppointmentsAction = async (): Promise<
  AppointmentAvailability[]
> => {
  const data = await searchAppointments()
  return transformResponseData(data.staffAppointmentAvailabilities)
}

const transformResponseData = (data: ApiAppointmentAvailability[]) => {
  const seenSlots = new Set<string>()

  for (const availability of data) {
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

  for (const availability of data) {
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

const getSlotsByDay = (data: ApiAppointmentAvailability) => {
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
