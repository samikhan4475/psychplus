import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseAbsolute,
  startOfWeek,
  today,
} from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { getCalendarDateLabel } from '@/utils'
import { START_OF_WEEK_LOCALE } from '../constants'

const getCurrentLocalDate = (): CalendarDate => {
  const currentDate = today(getLocalTimeZone())
  return currentDate
}

const getCurrentWeekStartDate = (): CalendarDate => {
  const currentDate = getCurrentLocalDate()
  const weekStartDate = startOfWeek(currentDate, START_OF_WEEK_LOCALE)
  return weekStartDate
}

const getWeekStartDateFormatted = (): string => {
  const todayDate = getCurrentLocalDate()
  const weekStartDate = startOfWeek(todayDate, START_OF_WEEK_LOCALE)
  const year = weekStartDate.year
  const month = String(weekStartDate.month).padStart(2, '0')
  const day = String(weekStartDate.day).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getNextWeekStart = (startDate: DateValue): DateValue =>
  startDate.add({ weeks: 1 })

const getPreviousWeekStart = (startDate: DateValue): DateValue =>
  startDate.subtract({ weeks: 1 })

const formatDate = (date: DateValue): string => {
  return new DateFormatter('en-US', {
    weekday: 'short',
    month: '2-digit',
    day: '2-digit',
  }).format(date.toDate(getLocalTimeZone()))
}

const formatDateCell = (date: string, timezoneId: string) => {
  const zonedDate = parseAbsolute(date, timezoneId)
  return `${zonedDate.month}/${zonedDate.day}/${zonedDate.year}`
}

const formatTimeCell = (date: string, timezoneId: string) => {
  const zonedDate = parseAbsolute(date, timezoneId)
  const hours = `${zonedDate.hour}`.padStart(2, '0')
  const minutes = `${zonedDate.minute}`.padStart(2, '0')
  return `${hours}:${minutes}`
}

const getDateString = (date?: DateValue | null): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined

const convertToZonedDate = (date: string, timezone: string): Date => {
  const { year, month, day, hour, minute } = parseAbsolute(date, timezone)
  return new Date(year, month - 1, day, hour, minute)
}

export {
  getCurrentLocalDate,
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
  formatDate,
  formatDateCell,
  formatTimeCell,
  getDateString,
  convertToZonedDate,
  getWeekStartDateFormatted,
}
