import { CalendarDate, parseAbsoluteToLocal } from '@internationalized/date'
import { StorageType } from '@psychplus-v2/constants'
import { CareTeamMember } from '@psychplus-v2/types'
import {
  getAppointmentCacheKey,
  getCalendarDateLabel,
  getDayOfWeekLabel,
  getMonthLabel,
  getNewProviderTypeLabel,
  getProviderTypeLabel,
  getUserFullName,
  transformLocationProvidersRequest,
} from '@psychplus-v2/utils'
import { Staff } from '@psychplus/staff'
import { searchLocationsProvidersClientAction } from '../client-actions'
import {
  AppointmentSlot,
  AppointmentSpecialist,
  PrefetchProvidersParams,
  SeachStaffAuthenticatedPayload,
  SlotsByDay,
  UpdateStorageParams,
} from '../types'

const generateDateRange = (start: CalendarDate) => {
  const jsDate = new Date(start.toString())

  const dayOfWeek = jsDate.getUTCDay()
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  const adjustedStart = start.add({ days: -daysToMonday })

  const dateRange = [adjustedStart]

  for (let i = 1; i < 7; ++i) {
    dateRange.push(adjustedStart.add({ days: i }))
  }

  return dateRange
}

const isDateInNextRange = (
  startingDate: CalendarDate,
  slotDate: CalendarDate,
) => {
  return startingDate.add({ days: 6 }).compare(slotDate) < 0
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

const parseDateAbsoluteToLocal = (
  earliestSlotA: AppointmentSlot,
  earliestSlotB: AppointmentSlot,
) => {
  const slotA =
    earliestSlotA.startDateUtc ??
    new Date(earliestSlotA.startDate).toISOString()
  const slotB =
    earliestSlotB.startDateUtc ??
    new Date(earliestSlotB.startDate).toISOString()
  return parseAbsoluteToLocal(slotA).compare(parseAbsoluteToLocal(slotB))
}

const checkCareTeamExists = (
  careTeam: CareTeamMember[],
  providerType: string,
) => careTeam.some((member) => member.specialist === providerType)

const getStartOfWeek = (date: Date = new Date()): string => {
  // Create a copy of the date to avoid mutating the original
  const startDate = new Date(date)

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = startDate.getDay()

  // Calculate the difference in days to Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  // Subtract the calculated days from the current date
  startDate.setDate(startDate.getDate() - daysToMonday)

  // Format the date as YYYY-MM-DD
  const year = startDate.getFullYear()
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0')
  const day = startDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getNextAvailableDateLabel = (nextSlotDate: CalendarDate) => {
  return `${getDayOfWeekLabel(nextSlotDate).slice(0, 3)}, ${getMonthLabel(
    nextSlotDate,
  ).slice(0, 3)} ${nextSlotDate.day}`
}

const searchStaffPayload = (
  specialist: AppointmentSpecialist,
): SeachStaffAuthenticatedPayload => {
  return {
    staffIds: [specialist?.id],
  }
}
const getStaffFullName = (
  specialist?: AppointmentSpecialist,
  staffData?: Staff,
): string => {
  const legalName = specialist?.legalName ?? staffData?.legalName
  if (!legalName) return ''

  const fullName = getUserFullName(legalName)
  const honors = legalName.honors

  return honors ? `${fullName}, ${honors}` : fullName
}

async function prefetchProviders<T>({
  filters,
  transformFn,
  storageKey,
  storageType = StorageType.Session,
  gMapKey,
  dateOfBirth,
}: PrefetchProvidersParams<T>): Promise<T | []> {
  const { zipCode, providerType, appointmentType, stateCode } = filters
  const providerTypeLabel = getNewProviderTypeLabel(
    getProviderTypeLabel(providerType),
  )
  const cacheKey = getAppointmentCacheKey({
    ...filters,
  })
  const payload = transformLocationProvidersRequest({
    appointmentType,
    providerType,
    providerTypeLabel,
    zipCode,
    stateCode,
  })
  const response = await searchLocationsProvidersClientAction({
    ...payload,
  })
  if (response.state !== 'success') {
    return []
  }

  const transformed = transformFn({
    response: response?.data?.locationsProviders ?? [],
    providerType: providerType,
    providerTypeLabel,
    appointmentType: filters.appointmentType,
  })

  const storage =
    storageType === StorageType.Session ? sessionStorage : localStorage

  storage.setItem(
    storageKey,
    JSON.stringify({
      state: {
        ...filters,
        cache: {
          [cacheKey]: {
            data: transformed,
            timestamp: Date.now(),
          },
        },
        ...(gMapKey && { gMapKey }),
        ...(dateOfBirth && { patient: { dateOfBirth } }),
      },
    }),
  )

  return transformed
}

async function updateStorage({
  filters,
  storageKey,
  storageType = StorageType.Session,
  isCacheNeeded,
}: UpdateStorageParams): Promise<void> {
  const storage =
    storageType === StorageType.Session ? sessionStorage : localStorage

  const existing = storage.getItem(storageKey)
  const parsed = existing ? JSON.parse(existing) : { state: {} }

  const updated = {
    state: {
      ...(isCacheNeeded ? parsed.state : {}),
      ...filters,
    },
  }

  storage.setItem(storageKey, JSON.stringify(updated))
}

 const getStartOfWeekForCalandarDate = (date: CalendarDate): CalendarDate => {
  const jsDate = new Date(date.year, date.month - 1, date.day)
  const dayOfWeek = jsDate.getDay()
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  return date.subtract({ days: daysToSubtract })
}

export {
  generateDateRange,
  getEarliestSlot,
  checkCareTeamExists,
  isDateInNextRange,
  parseDateAbsoluteToLocal,
  getStartOfWeek,
  getNextAvailableDateLabel,
  searchStaffPayload,
  getStaffFullName,
  prefetchProviders,
  updateStorage,
  getStartOfWeekForCalandarDate
}
