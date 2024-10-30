import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Clinic, Specialist } from '@psychplus-v2/types'
import {
    convertUtcISOToLocalISOString,
    getLocalCalendarDate,
} from '@psychplus-v2/utils'
import type {
    AppointmentAvailability,
    AppointmentClinic,
    SlotsByDay,
} from '@/features/appointments/search/types'

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
}

interface AppointmentsSearchApiResponse {
    staffAppointmentAvailabilities: AvailabilityApiResponse[]
}

const transformResponseData = (
    response: AppointmentsSearchApiResponse,
    timeZone?: string,
): AppointmentAvailability[] => {
    const seenSlots = new Set<string>()
    const data = response.staffAppointmentAvailabilities.map((availability) => ({
        ...availability,
        availableSlots: availability.availableSlots.map((slot) => ({
            ...slot,
            startDateUtc: slot.startDate,
            startDate: convertUtcISOToLocalISOString(slot.startDate, timeZone),
        })),
    }))

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

    const seenProviders: Record<string, AppointmentAvailability> = {}
    const availabilities: AppointmentAvailability[] = []

    for (const availability of data) {
        const provider = seenProviders[availability.specialist.id]

        if (provider) {
            const slotsByDay = getSlotsByDay(availability)
            mergeSlots(provider.allSlotsByDay, slotsByDay, false)

            const existingClinic = provider.clinics.find(
                (clinic) => clinic.id === availability.clinic.id,
            )

            if (existingClinic) {
                mergeSlots(existingClinic.slotsByDay, slotsByDay, true)
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

const getSlotsByDay = (data: AvailabilityApiResponse): SlotsByDay => {
    const slotsByDay: SlotsByDay = {}

    for (const slot of data.availableSlots) {
        const dayKey = getLocalCalendarDate(slot.startDate).toString()
        if (!slotsByDay[dayKey]) {
            slotsByDay[dayKey] = []
        }
        slotsByDay[dayKey].push(slot)
    }

    return slotsByDay
}

const mergeSlots = (
    existingSlotsByDay: SlotsByDay,
    newSlotsByDay: SlotsByDay,
    filterDuplicates = false,
): void => {
    for (const [key, value] of Object.entries(newSlotsByDay)) {
        if (!value) continue

        const existingSlots = existingSlotsByDay[key] ?? []
        if (filterDuplicates) {
            const existingSlotSet = new Set(
                existingSlots.map((slot) => `${slot.startDate}:${slot.duration}`),
            )

            const filteredNewSlots = value.filter(
                (slot) => !existingSlotSet.has(`${slot.startDate}:${slot.duration}`),
            )

            existingSlotsByDay[key] = [
                ...existingSlots,
                ...filteredNewSlots,
            ]
        } else {
            existingSlotsByDay[key] = [
                ...existingSlots,
                ...(value ?? []),
            ]
        }
    }
}

export { transformResponseData }
