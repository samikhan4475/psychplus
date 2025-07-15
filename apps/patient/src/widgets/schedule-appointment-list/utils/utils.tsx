import { getLocalTimeZone } from '@internationalized/date'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import {
  AppointmentSlot,
  SharedCode,
  TransformLocationProvidersParams,
} from '@psychplus-v2/types'
import {
  binaryInsertSorted,
  buildClinicContactAddresses,
  compareAsc,
  compareDesc,
  getLocalCalendarDate,
  getMin,
  getNewProviderTypeLabel,
  getProviderTypeLabel,
  normalizeLanguageFilter,
  sortByFunc,
  transformSlotsByDay,
} from '@psychplus-v2/utils'
import { Avatar } from '@radix-ui/themes'
import { isBefore } from 'date-fns'
import {
  type StaffAppointmentAvailabilities,
  type StaffAppointmentAvailabilty,
} from '@psychplus/appointments'
import { type Clinic } from '@psychplus/clinics'
import { type Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import {
  convertToLocalISOString,
} from '@psychplus/utils/time'
import {
  ClinicWithSlots,
  SortFilterOptions,
  type Location,
  type StaffWithClinicsAndSlots,
} from '../types'
import { APP_ENV } from '@psychplus/utils/constants'

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
      const slots: AppointmentSlot[] = appointment.availableSlots

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

  resultArray.sort((a, b) => {
    const getEarliestSlotTime = (entry: StaffWithClinicsAndSlots): number => {
      const allSlots = entry.clinicWithSlots.flatMap((c) => c.availableSlots)
      const sorted = allSlots
        .map((s) => new Date(s.startDate).getTime())
        .sort((x, y) => x - y)
      return sorted[0] ?? Infinity
    }

    const timeA = getEarliestSlotTime(a)
    const timeB = getEarliestSlotTime(b)

    if (timeA !== timeB) {
      return timeA - timeB
    }

    const ratingA = a.staff.rating ?? 0
    const ratingB = b.staff.rating ?? 0

    return ratingB - ratingA
  })

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
        const spokenLanguages = appointment.specialist?.spokenLanguages ?? []
        return spokenLanguages.includes(language)
      },
    ) ?? []

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
  const distanceA = a.clinic.distanceInMiles ?? 0
  const distanceB = b.clinic.distanceInMiles ?? 0
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
          name: clinic?.name ?? 'Unnamed Clinic',
          geoCoordinates: geoCoordinates,
        }
      },
    ) ?? []
  ).filter((location) => location !== null) as Location[]
}

function organizeSlotsByDate(
  slots: AppointmentSlot[] | undefined,
  startingDate: string,
) {
  if (!slots?.length) return {}
  
  const slotsByDate: Record<string, AppointmentSlot[] | undefined> = {}
  let hasSlots = false

  const daysToAdd = isMobile() ? 1 : 7
  let baseDate = getLocalCalendarDate(startingDate)

  if (!isMobile()) {
    const jsDate = baseDate.toDate(getLocalTimeZone())
    const dayOfWeek = jsDate.getDay()
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    baseDate = baseDate.subtract({ days: daysToSubtract })
  }

  let currentDate = baseDate

  for (let i = 0; i < daysToAdd; i++) {
    const key = currentDate.toString()
    slotsByDate[key] = []
    currentDate = currentDate.add({ days: 1 })
  }

  slots?.forEach((slot) => {
    const formattedSlotDate = getLocalCalendarDate(slot.startDate).toString()

    if (formattedSlotDate in slotsByDate) {
      slotsByDate[formattedSlotDate]?.push(slot)
      hasSlots = true
    }
  })

  if (!hasSlots && slots?.length) {
    return transformSlotsByDay(slots)
  }
  return hasSlots ? slotsByDate : {}
}

const renderStaffName = (staff: Staff | undefined) =>
  `${staff?.legalName?.title ?? ''} ${staff?.legalName?.firstName ?? ''} ${
    staff?.legalName?.lastName ?? ''
  }, ${staff?.legalName?.honors ?? ''}`

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

const getCodsetValue = (codes: SharedCode[], display: string) => {
  return codes.find((_code) => _code.display === display)?.value
}

function getLoginRedirectUrl() {
  return String(APP_ENV).toLocaleLowerCase() === 'production'
    ? 'https://ui.psychplus.io/login'
    : 'https://ui.staging.psychplus.dev/login'
}

const transformStaffWithClinicsAndSlots = ({
  response,
  providerType,
  providerTypeLabel,
  appointmentType,
}: TransformLocationProvidersParams): StaffWithClinicsAndSlots[] => {
  const isInPersonAppointment = appointmentType === AppointmentType.InPerson

  const providerMap = new Map<number, StaffWithClinicsAndSlots>()
  const resultArray: StaffWithClinicsAndSlots[] = []

  const compareByRatingDesc = compareDesc<StaffWithClinicsAndSlots>(
    (p) => p.staff.rating ?? 0,
  )
  const compareClinicsByDistanceAsc = compareAsc<ClinicWithSlots>(
    (c) => c?.clinic?.distanceInMiles ?? Infinity,
  )

  for (const { location, providers } of response) {
    const clinicAddresses = buildClinicContactAddresses(
      location.locationAddress,
      appointmentType === AppointmentType.InPerson,
    )
    const clinic = {
      name: location.locationName,
      id: location.locationId,
      serviceId: location.serviceId,
      contact: {
        addresses: clinicAddresses,
      },
      ...(isInPersonAppointment &&
        location.distanceInMiles && {
          distanceInMiles: location.distanceInMiles,
        }),
      slotsByDay: {},
    }

    for (const provider of providers) {
      const cws: ClinicWithSlots = { clinic, availableSlots: [] }
      const existing = providerMap.get(provider.staffId)

      if (existing) {
        binaryInsertSorted(
          existing.clinicWithSlots,
          cws,
          compareClinicsByDistanceAsc,
        )
      } else {
        const newProvider: StaffWithClinicsAndSlots = {
          clinicWithSlots: [cws],
          staff: {
            id: provider.staffId,
            legalName: provider.name,
            hasPhoto: provider.hasProfilePicture,
            spokenLanguages: provider.spokenLanguages,
            rating: provider.averageRating ?? 0,
          },
          providerType: providerTypeLabel,
          staffTypeCode: providerType,
        }

        providerMap.set(provider.staffId, newProvider)
        binaryInsertSorted(resultArray, newProvider, compareByRatingDesc)
      }
    }
  }

  return resultArray
}

function sortAndFilterAppointments(
  data: StaffWithClinicsAndSlots[],
  { sortBy, language }: SortFilterOptions,
): StaffWithClinicsAndSlots[] {
  if (!data.length) return []
  // 1. filter by language
  const filtered = data.filter((item) => {
    if (!language) return true
    const lang = normalizeLanguageFilter(language)
    return item.staff.spokenLanguages?.includes(lang)
  })

  if (!sortBy) {
    return filtered
  }

  if (sortBy === 'Nearest') {
    return sortByFunc(filtered, (item) =>
      getMin(item.clinicWithSlots, (c) => c?.clinic?.distanceInMiles),
    )
  }

  if (sortBy === 'Rating') {
    return sortByFunc(filtered, (item) => -(item.staff?.rating ?? 0))
  }

  return filtered
}

function getValidStartDate(startingDate: string, today = new Date()): string {
  const inputDate = new Date(startingDate)
  const isInPast = isBefore(inputDate, today)

  return (isInPast ? today : inputDate).toISOString().split('T')[0]
}

function getNormalizedProviderType(type: string): ProviderType {
  return type === 'Psychiatry'
    ? ProviderType.Psychiatrist
    : ProviderType.Therapist
}

function getProviderTypeLabelNormalized(type: ProviderType): string {
  return getNewProviderTypeLabel(getProviderTypeLabel(type))
}

function getNormalizedAppointmentType(type: string): AppointmentType {
  return type === 'In-Person'
    ? AppointmentType.InPerson
    : AppointmentType.Virtual
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
  getCodsetValue,
  transformStaffWithClinicsAndSlots,
  sortAndFilterAppointments,
  getValidStartDate,
  getProviderTypeLabelNormalized,
  getNormalizedAppointmentType,
  getNormalizedProviderType,
}
