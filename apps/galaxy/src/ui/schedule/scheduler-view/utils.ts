import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsolute,
  startOfWeek,
  today,
} from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { START_OF_WEEK_LOCALE } from '../constants'
import { getCalendarDateFromUtc } from '../utils'
import { AppointmentDate, SlotsByDay } from './types'

const extractDate = (dateString: string, timezone: string) => {
  const zonedDate = parseAbsolute(dateString, timezone)
  const month = `${zonedDate.month}`.padStart(2, '0')
  const day = `${zonedDate.day}`.padStart(2, '0')
  return `${month}/${day}`
}

const currentWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
  let total = 0
  const noOfDays = days.length === 14 ? days.length / 2 : days.length

  for (let i = 0; i < noOfDays; i++) {
    const day = days[i]
    total += slots[`${day.monthAndDay}`]?.length ?? 0
  }
  return total
}

const extractTime = (dateString: string, timezone: string) => {
  const zonedCalendarDate = parseAbsolute(dateString, timezone)
  const hours = `${zonedCalendarDate.hour}`.padStart(2, '0')
  const minutes = `${zonedCalendarDate.minute}`.padStart(2, '0')
  return `${hours}:${minutes}`
}

const nextWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
  let total = 0

  for (let i = days.length / 2; i < days.length; i++) {
    const day = days[i]
    total += slots[`${day.monthAndDay}`]?.length ?? 0
  }
  return total
}

const getCurrentWeekStart = (): Date => {
  const currentDate = today(getLocalTimeZone())
  const weekStartDate = startOfWeek(currentDate, START_OF_WEEK_LOCALE)
  return new Date(weekStartDate.toString())
}

const getMaxDaysOutToLookFor = (start?: DateValue, end?: DateValue) => {
  if (!end) return
  const startingDate = start ? start : today(getLocalTimeZone())
  return Math.abs(end.compare(startingDate)) + 1
}

const getNext90thDay = (
  startingDate: string | undefined,
  intervalCount = 1,
): CalendarDate =>
  getCalendarDateFromUtc(startingDate)?.add({ days: 90 * intervalCount }) ??
  today(getLocalTimeZone()).add({ days: 90 * intervalCount })

export {
  extractDate,
  currentWeekTotalSlots,
  extractTime,
  nextWeekTotalSlots,
  getCurrentWeekStart,
  getMaxDaysOutToLookFor,
  getNext90thDay,
}
