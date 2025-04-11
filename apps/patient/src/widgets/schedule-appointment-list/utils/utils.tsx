import { Avatar } from '@radix-ui/themes'
import {
  type Slot,
  type StaffAppointmentAvailabilities,
  type StaffAppointmentAvailabilty,
} from '@psychplus/appointments'
import { type Clinic } from '@psychplus/clinics'
import { type Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { APP_ENV } from '@psychplus/utils/constants'
import {
  convertToLocalISOString,
  formatDateYmd,
  parseDateString,
} from '@psychplus/utils/time'
import { type Location, type StaffWithClinicsAndSlots } from '../types'

function groupStaffWithClinicsAndSlots(
  appointmentAvailabilities: StaffAppointmentAvailabilities | [],
): StaffWithClinicsAndSlots[] | [] {
  const resultArray: StaffWithClinicsAndSlots[] = []

  if (Array.isArray(appointmentAvailabilities)) {
    return resultArray
  }

  appointmentAvailabilities?.staffAppointmentAvailabilities.forEach(
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
  const parsedDate = parseDateString(startingDate)

  const daysToAdd = isMobile() ? 1 : 7
  const currentDate = parsedDate

  for (let i = 0; i < daysToAdd; i++) {
    const formattedDate = formatDateYmd(currentDate)
    slotsByDate[formattedDate] = []
    currentDate.setDate(currentDate.getDate() + 1)
  }

  slots?.forEach((slot) => {
    const slotDate = parseDateString(slot.startDate.split('T')[0])

    const formattedSlotDate = formatDateYmd(slotDate)

    if (formattedSlotDate in slotsByDate)
      slotsByDate[formattedSlotDate].push(slot)
  })
  return slotsByDate
}

const renderStaffName = (staff: Staff | undefined) =>
  `${staff?.legalName?.title || ''} ${staff?.legalName?.firstName || ''} ${
    staff?.legalName?.lastName || ''
  }, ${staff?.legalName?.honors || ''}`

const renderProfileImage = (
  profileImage: string | undefined,
  fallback: string | undefined,
) => (
  <Avatar
    src={profileImage ?? ''}
    color="gray"
    fallback={fallback ?? 'A'}
    className="h-[56px] w-[56px]"
    radius="full"
  />
)

const convertUtcToLocalTimeInSlots = (data: StaffAppointmentAvailabilities) => {
  const { staffAppointmentAvailabilities } = data
  const availabilities = staffAppointmentAvailabilities.map(
    (staffAppointment) => {
      const { availableSlots } = staffAppointment
      const updatedSlots = availableSlots.map((slot) => {
        const startDate = convertToLocalISOString(slot.startDate)
        return {
          ...slot,
          startDate,
        }
      })
      return {
        ...staffAppointment,
        availableSlots: updatedSlots,
      }
    },
  )

  return {
    staffAppointmentAvailabilities: availabilities,
  }
}

function getLoginRedirectUrl() {
  return 'https://ui.psychplus.io/login'
}

export {
  groupStaffWithClinicsAndSlots,
  applyFilters,
  extractLocations,
  organizeSlotsByDate,
  renderStaffName,
  renderProfileImage,
  getLoginRedirectUrl,
  convertUtcToLocalTimeInSlots,
}
