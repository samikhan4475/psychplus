import { Avatar } from '@radix-ui/themes'
import {
  type Slot,
  type StaffAppointmentAvailabilities,
  type StaffAppointmentAvailabilty,
} from '@psychplus/appointments'
import { type Clinic } from '@psychplus/clinics'
import { type Staff } from '@psychplus/staff'
import { APP_ENV, TIMEZONE_FORMAT } from '@psychplus/utils/constants'
import { type Location, type StaffWithClinicsAndSlots } from '../types'

function groupStaffWithClinicsAndSlots(
  appointmentAvailabilities: StaffAppointmentAvailabilities | [],
): StaffWithClinicsAndSlots[] | [] {
  const resultArray: StaffWithClinicsAndSlots[] = []

  if (Array.isArray(appointmentAvailabilities)) {
    return resultArray
  }

  appointmentAvailabilities.staffAppointmentAvailabilities.forEach(
    (appointment) => {
      const staff: Staff = appointment.specialist
      const staffTypeCode: number = appointment.specialistTypeCode
      const clinic: Clinic = appointment.clinic
      const slots: Slot[] = appointment.availableSlots

      const existingStaffEntry = resultArray.find(
        (entry) => entry.staff.id === staff.id,
      )

      if (existingStaffEntry) {
        existingStaffEntry.clinicWithSlots.push({
          clinic: clinic,
          availableSlots: slots,
        })
      } else {
        const newStaffEntry: StaffWithClinicsAndSlots = {
          staff: staff,
          staffTypeCode: staffTypeCode,
          clinicWithSlots: [
            {
              clinic: clinic,
              availableSlots: slots,
            },
          ],
        }
        resultArray.push(newStaffEntry)
      }
    },
  )

  return resultArray
}

function applyFilters(
  language: string,
  sortBy: string,
  appointmentAvailabilities: StaffAppointmentAvailabilities | [],
): StaffAppointmentAvailabilities | [] {
  if (Array.isArray(appointmentAvailabilities)) {
    return []
  }

  let filteredStaffAppointmentAvailabilities = applyLanguageFilter(
    language,
    appointmentAvailabilities,
  )
  filteredStaffAppointmentAvailabilities = applySortingFilters(
    sortBy,
    filteredStaffAppointmentAvailabilities,
  )

  return filteredStaffAppointmentAvailabilities
}

function applyLanguageFilter(
  language: string,
  appointmentAvailabilities: StaffAppointmentAvailabilities,
): StaffAppointmentAvailabilities {
  if (!language) {
    return appointmentAvailabilities
  }

  const filteredStaffAppointmentAvailabilities =
    appointmentAvailabilities?.staffAppointmentAvailabilities.filter(
      (appointment) => {
        const spokenLanguages = appointment.specialist?.spokenLanguages || []
        return spokenLanguages.includes(language)
      },
    ) || []

  return {
    staffAppointmentAvailabilities: filteredStaffAppointmentAvailabilities,
  }
}

function applySortingFilters(
  sortBy: string,
  appointmentAvailabilities: StaffAppointmentAvailabilities,
): StaffAppointmentAvailabilities {
  return sortAppointments(sortBy, appointmentAvailabilities)
}

function sortAppointments(
  sortBy: string,
  appointmentAvailabilities: StaffAppointmentAvailabilities,
): StaffAppointmentAvailabilities {
  if (!appointmentAvailabilities) {
    return appointmentAvailabilities
  }

  const sortedAppointments = [
    ...appointmentAvailabilities.staffAppointmentAvailabilities,
  ]

  if (sortBy === 'Nearest') {
    sortedAppointments.sort((a, b) => sortByClinicsDistance(a, b))
  } else if (sortBy === 'FirstAvailable') {
    sortedAppointments.sort((a, b) => sortByFirstAvailableDate(a, b))
  }

  return { staffAppointmentAvailabilities: sortedAppointments }
}

function sortByClinicsDistance(
  a: StaffAppointmentAvailabilty,
  b: StaffAppointmentAvailabilty,
): number {
  const distanceA = a.clinic.distanceInMiles || 0
  const distanceB = b.clinic.distanceInMiles || 0
  return distanceA - distanceB
}

function sortByFirstAvailableDate(
  a: StaffAppointmentAvailabilty,
  b: StaffAppointmentAvailabilty,
): number {
  const firstAvailableDateA = getFirstAvailableDate(a)
  const firstAvailableDateB = getFirstAvailableDate(b)

  if (!firstAvailableDateA || !firstAvailableDateB) {
    return 0
  }

  return (
    new Date(firstAvailableDateA).valueOf() -
    new Date(firstAvailableDateB).valueOf()
  )
}

function getFirstAvailableDate(
  staffAppointmentAvailabilty: StaffAppointmentAvailabilty,
): string | null {
  const slots = staffAppointmentAvailabilty.availableSlots

  if (!slots || slots.length === 0) {
    return null
  }

  slots.sort(
    (a, b) => new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf(),
  )

  return slots[0].startDate
}

const extractLocations = (
  appointmentAvailabilities?: StaffAppointmentAvailabilities | [],
): Location[] | [] => {
  if (Array.isArray(appointmentAvailabilities)) {
    return []
  }
  return (
    appointmentAvailabilities?.staffAppointmentAvailabilities.map(
      (appointment) => {
        const clinic = appointment.clinic

        const geoCoordinates = clinic?.contact?.addresses?.[0]?.geoCoordinates
        if (!geoCoordinates) {
          return null
        }

        return {
          name: clinic?.name || 'Unnamed Clinic',
          geoCoordinates: geoCoordinates,
        }
      },
    ) || []
  ).filter((location) => location !== null) as Location[]
}

function organizeSlotsByDate(slots: Slot[] | undefined, startingDate: string) {
  const slotsByDate: Record<string, Slot[]> = {}
  const [year, month, day] = startingDate.split('-').map(Number)

  let currentDay = day
  currentDay += 1
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(year, month - 1, currentDay + i)
    const cstDateString = currentDate.toLocaleString('en-US', {
      timeZone: TIMEZONE_FORMAT,
    })
    const formattedDate = cstDateString.split(' ')[0]
    slotsByDate[formattedDate] = []
  }

  slots?.forEach((slot) => {
    const cstDateString = new Date(slot.startDate)
      .toLocaleString('en-US', {
        timeZone: TIMEZONE_FORMAT,
      })
      .split(' ')[0]

    if (cstDateString in slotsByDate) slotsByDate[cstDateString].push(slot)
  })
  return slotsByDate
}

const renderStaffName = (staff: Staff | undefined) =>
  `${staff?.legalName?.title || ''} ${staff?.legalName?.firstName || ''} ${
    staff?.legalName?.lastName || ''
  } ${staff?.legalName?.honors || ''}`

const renderProfileImage = (
  profileImage: string | undefined,
  fallback: string | undefined,
) => (
  <Avatar
    src={profileImage ?? ''}
    color="gray"
    fallback={fallback ?? 'A'}
    size="7"
    radius="full"
  />
)

function getLoginRedirectUrl() {
  return APP_ENV === 'production'
    ? 'https://psychplus.io/'
    : 'https://staging.psychplus.dev/'
}

export {
  groupStaffWithClinicsAndSlots,
  applyFilters,
  extractLocations,
  organizeSlotsByDate,
  renderStaffName,
  renderProfileImage,
  getLoginRedirectUrl,
}
