import { CalendarDate } from '@internationalized/date'
import { CareTeamMember } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import {
  AppointmentAvailability,
  AppointmentClinic,
  SlotsByDay,
} from '../types'

const generateDateRange = (start: CalendarDate) => {
  const dateRange = [start]

  for (let i = 0; i < 6; ++i) {
    dateRange.push(dateRange[i].add({ days: 1 }))
  }
  return dateRange
}

const getEarliestSlot = (slots: SlotsByDay, dateRange: CalendarDate[]) => {
  for (let i = 0; i < dateRange.length; ++i) {
    const daySlots = slots[getCalendarDateLabel(dateRange[i])]

    if (!daySlots) {
      continue
    }
    return daySlots[0]
  }
}

const checkCareTeamExists = (
  careTeam: CareTeamMember[],
  providerType: string,
) => careTeam.some((member) => member.specialist === providerType)

const getAllAvailabilityClinics = (
  data: AppointmentAvailability[],
): AppointmentClinic[] => {
  const allClinics: AppointmentClinic[] = []
  const seenClinics = new Set<string>()

  for (const availability of data) {
    for (const clinic of availability.clinics) {
      const key = `${clinic.id}`

      if (
        clinic.contact.addresses?.[0].geoCoordinates &&
        seenClinics.has(key)
      ) {
        continue
      } else {
        seenClinics.add(key)
        allClinics.push(clinic)
      }
    }
  }

  return allClinics
}

export {
  generateDateRange,
  getEarliestSlot,
  checkCareTeamExists,
  getAllAvailabilityClinics,
}
