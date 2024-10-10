import { getCalendarDateLabel } from '@/utils'
import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  getLocalTimeZone,
  today,
  parseAbsolute,
} from '@internationalized/date'
import { DateValue } from 'react-aria-components'

const getCurrentLocalDate = (): CalendarDate => {
  const currentDate = today(getLocalTimeZone())
  return currentDate
}

const getCurrentWeekStartDate = (): CalendarDate => {
  const currentDate = getCurrentLocalDate()
  const currentDay = getDayOfWeek(currentDate, 'en-US')
  const weekStartDate =
    currentDay === 0
      ? currentDate.subtract({ days: 6 })
      : currentDate.subtract({ days: currentDay - 1 })
  return weekStartDate
}

const getNextWeekStart = (startDate: CalendarDate): CalendarDate =>
  startDate.add({ weeks: 1 })

const getPreviousWeekStart = (startDate: CalendarDate): CalendarDate =>
  startDate.subtract({ weeks: 1 })

const formatDate = (date: CalendarDate): string => {
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
  const hours = `${zonedDate.hour}`.padStart(2, "0")
  const minutes = `${zonedDate.minute}`.padStart(2, "0")
  return `${hours}:${minutes}`
}

const getDateString = (date?: DateValue): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined

export {
  getCurrentLocalDate,
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
  formatDate,
  formatDateCell,
  formatTimeCell,
  getDateString,
}
