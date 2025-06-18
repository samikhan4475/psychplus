import {
  CalendarDate,
  CalendarDateTime,
  DateFormatter,
  getLocalTimeZone,
  parseAbsolute,
  startOfWeek,
  toCalendarDate,
  toCalendarDateTime,
  today,
} from '@internationalized/date'
import { DateValue, TimeValue } from 'react-aria-components'
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

const formatDateCell = (
  date: string,
  timezoneId: string,
  showFullYear = true,
) => {
  const zonedDate = parseAbsolute(date, timezoneId)
  const month = `${zonedDate.month}`.padStart(2, '0')
  const day = `${zonedDate.day}`.padStart(2, '0')
  const year = showFullYear
    ? zonedDate.year
    : String(zonedDate.year % 100).padStart(2, '0')
  return `${month}/${day}/${year}`
}

const formatTimeCell = (date: string, timezoneId: string) => {
  const zonedDate = parseAbsolute(date, timezoneId)
  const hours = `${zonedDate.hour}`.padStart(2, '0')
  const minutes = `${zonedDate.minute}`.padStart(2, '0')
  return `${hours}:${minutes}`
}

const getDateString = (
  date?: DateValue | null,
  timezoneId: string = getLocalTimeZone(),
): string | undefined => {
  if (date) {
    const dateOb = date.toDate(timezoneId)
    return dateOb.toISOString()
  }
  return undefined
}

const getUtcDateWithoutTime = (date?: DateValue | null): string | undefined => {
  if (date) {
    const dateObj = date.toDate(getLocalTimeZone())
    const utcDate = `${dateObj.getUTCDate()}`.padStart(2, '0')
    const utcMonth = `${dateObj.getUTCMonth() + 1}`.padStart(2, '0')
    const utcYear = `${dateObj.getUTCFullYear()}`
    return `${utcYear}-${utcMonth}-${utcDate}`
  }
}

const getLocalDateWithoutTime = (
  date?: DateValue | null,
): string | undefined => {
  if (date) {
    const dateObj = date.toDate(getLocalTimeZone())
    const utcDate = `${dateObj.getDate()}`.padStart(2, '0')
    const utcMonth = `${dateObj.getMonth() + 1}`.padStart(2, '0')
    const utcYear = `${dateObj.getFullYear()}`
    return `${utcYear}-${utcMonth}-${utcDate}`
  }
}

const getCalendarDateLabel = (date?: DateValue): string | undefined => {
  if (date) {
    const day = `${date.day}`.padStart(2, '0')
    const month = `${date.month}`.padStart(2, '0')
    return `${date.year}-${month}-${day}`
  }
  return undefined
}

const getUtcTime = (time?: TimeValue) => {
  if (!time) return undefined
  const calendarDate = today(getLocalTimeZone())
  const calendarDateTime = toCalendarDateTime(calendarDate, time)
  const date = calendarDateTime.toDate(getLocalTimeZone())
  const hourInUtc = `${date.getUTCHours()}`.padStart(2, '0')
  const minutesInUtc = `${date.getUTCMinutes()}`.padStart(2, '0')
  const secondsInUtc = `${date.getUTCSeconds()}`.padStart(2, '0')
  return `${hourInUtc}:${minutesInUtc}:${secondsInUtc}`
}

const getLocalTime = (time?: TimeValue) => {
  if (!time) return undefined
  const calendarDate = today(getLocalTimeZone())
  const calendarDateTime = toCalendarDateTime(calendarDate, time)
  const date = calendarDateTime.toDate(getLocalTimeZone())
  const hour = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  const seconds = `${date.getSeconds()}`.padStart(2, '0')
  return `${hour}:${minutes}:${seconds}`
}

const getDateTimeString = (
  date?: DateValue | null,
  time?: TimeValue | null,
) => {
  if (date && !time) {
    const { year, day, month } = date
    const dateTime = new CalendarDateTime(year, month, day, 12, 0, 0)
    return dateTime.toDate(getLocalTimeZone()).toISOString()
  } else if (date && time) {
    const { year, day, month } = date
    const { hour, minute, second } = time
    const dateTime = new CalendarDateTime(
      year,
      month,
      day,
      hour,
      minute,
      second,
    )
    return dateTime.toDate(getLocalTimeZone()).toISOString()
  }
  return undefined
}

const convertToZonedDate = (date: string, timezone: string): Date => {
  const { year, month, day, hour, minute } = parseAbsolute(date, timezone)
  return new Date(year, month - 1, day, hour, minute)
}

const getCalendarDateFromUtc = (date?: string): CalendarDate | undefined =>
  date ? toCalendarDate(parseAbsolute(date, getLocalTimeZone())) : undefined

const getDateStringNoon = (
  date?: DateValue | null,
  timezoneId: string = getLocalTimeZone(),
): string | undefined => {
  if (date) {
    const { year, month, day } = date
    const noonDateTime = new CalendarDateTime(year, month, day, 12, 0, 0)
    return noonDateTime.toDate(timezoneId).toISOString()
  }
  return undefined
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
  getDateTimeString,
  getCalendarDateLabel,
  getUtcTime,
  getUtcDateWithoutTime,
  getLocalTime,
  getCalendarDateFromUtc,
  getLocalDateWithoutTime,
  getDateStringNoon,
}
