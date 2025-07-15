import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseZonedDateTime,
  toCalendarDateTime,
  today,
  type DateValue,
} from '@internationalized/date'
import { TimeInterval } from '@psychplus-v2/types'
import { TimeValue } from 'react-aria-components'

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS_OF_WEEK_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const getMonthLabel = (date: CalendarDate) => MONTH_LABELS[date.month - 1]

const getDayOfWeekLabel = (date: CalendarDate) =>
  DAYS_OF_WEEK_LABELS[getDayOfWeek(date, 'en-US')]

const getCalendarDateLabel = (date: CalendarDate) => {
  const day = date.day < 10 ? `0${date.day}` : `${date.day}`
  const month = date.month < 10 ? `0${date.month}` : `${date.month}`
  return `${date.year}-${month}-${day}`
}

const getTimeLabel = (dateString: string) => {
  return new DateFormatter('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateString))
}

function convertTo12HourFormat(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)

  const hour12 = hours % 12 || 12
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hourStr = hour12.toString().padStart(2, '0')

  return `${hourStr}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

const getLocalCalendarDate = (dateString?: string): CalendarDate => {
  const date = dateString ? new Date(dateString) : new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return new CalendarDate(year, month, day)
}

const getCalendarDate = (dateString?: string): CalendarDate => {
  const date = dateString ? new Date(dateString) : new Date()

  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()

  return new CalendarDate(year, month, day)
}

const getSlashedDateString = (
  date: CalendarDate | string,
  truncateYear = false,
) => {
  if (typeof date === 'string') {
    date = getCalendarDate(date)
  }
  if (!date) {
    date = getCalendarDate()
  }

  const { month, day, year } = date
  return `${month}/${day}/${truncateYear ? year.toString().slice(2) : year}`
}

const getDateLabel = (date?: DateValue) => {
  if (!date) {
    date = getCalendarDate()
  }

  const { month, day, year } = date
  return `${MONTH_LABELS[month - 1]} ${day}, ${year}`
}

const getPaddedDateString = (date?: DateValue) => {
  if (!date) {
    date = getCalendarDate()
  }

  const day = date.day < 10 ? `0${date.day}` : `${date.day}`
  const month = date.month < 10 ? `0${date.month}` : `${date.month}`
  return `${date.year}-${month}-${day}`
}

const getAgeFromDate = (dateOfBirth: string) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const m = today.getUTCMonth() - birthDate.getUTCMonth()

  if (m < 0 || (m === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--
  }

  return age
}

const convertUtcISOToLocalISOString = (
  utcString: string,
  timeZone?: string,
) => {
  const date = new Date(utcString)
  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
  const match = localDate.match(/\d+/g) || []
  const [month, day, year, hour, minute, second] = match
  const iosDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`
  return iosDate
}

const isISODate = (dateString: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString)
}

const convertDateField = (field: DateValue | null | undefined) => {
  return field ? convertToCalendarDate(field) : null
}

const convertToCalendarDate = (storedDate: DateValue | string) => {
  if (typeof storedDate === 'string') {
    if (isISODate(storedDate)) {
      return parseDate(storedDate)
    } else {
      const datePart = storedDate?.split(' ')[0]
      return parseDate(datePart)
    }
  }
  if (storedDate instanceof CalendarDate) {
    return storedDate
  }

  const { year, month, day } = storedDate as {
    year: number
    month: number
    day: number
  }
  return new CalendarDate(year, month, day)
}
const isDateValue = (val: unknown): val is DateValue =>
  !!val && typeof val === 'object' && 'calendar' in val

const isTimeValue = (val: unknown): val is TimeValue =>
  !!val && typeof val === 'object' && 'hour' in val

const isLaterDate = (
  a: DateValue | null | undefined,
  b: DateValue | null | undefined,
): boolean => {
  if (!a || !b) return false

  if (a.year !== b.year) return a.year >= b.year
  if (a.month !== b.month) return a.month >= b.month
  return a.day >= b.day
}

const isLaterTime = (a: TimeValue, b: TimeValue): boolean => {
  const aTotal = a.hour * 3600 + a.minute * 60 + a.second
  const bTotal = b.hour * 3600 + b.minute * 60 + b.second
  return aTotal > bTotal
}

const isWithinNextDays = (
  date: DateValue | null | undefined,
  days: number,
): boolean => {
  if (!date) return false

  const max = today('UTC').add({ days })

  if (date.year > max.year) return false
  if (date.year === max.year && date.month > max.month) return false
  if (date.year === max.year && date.month === max.month && date.day > max.day)
    return false

  return true
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

function generateTimeIntervals(): TimeInterval[] {
  const intervals: TimeInterval[] = []
  let time = '00.00'

  for (let r = 0; r < 100; r++) {
    const formattedTime = time.replace('.', ':')
    const [hourStr, minute] = formattedTime.split(':')
    const hourNum = parseInt(hourStr, 10)
    const period = hourNum < 12 ? 'AM' : 'PM'
    const hour12 = (((hourNum + 11) % 12) + 1).toString().padStart(2, '0')

    intervals.push({
      label: `${hour12}:${minute} ${period}`,
      value: formattedTime,
    })

    if (time === '23.40') {
      break
    }

    time = (parseFloat(time) + parseFloat('0.20')).toFixed(2)

    if (time.includes('.60')) {
      const [hours] = time.split('.')
      const newHours = parseInt(hours) + 1
      time = (newHours < 10 ? '0' : '') + newHours + '.00'
    } else if (parseInt(time) < 10) {
      time = '0' + time
    }
  }

  return intervals
}

function mapToUTCString(date: string): string {
  const parsedDateTime = parseZonedDateTime(date)
  return parsedDateTime.toAbsoluteString()
}

const parseLocalDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day) // month is 0-based
}

const getLocalTimeWithOriginalDate = (
  utcString: string,
  timeZone: string = 'America/Chicago',
): string => {
  const datePart = utcString?.split('T')[0] ?? ''
  const timePart =
    convertUtcISOToLocalISOString(utcString, timeZone)?.split('T')[1] ??
    '00:00:00'

  return `${datePart}T${timePart}`
}

export {
  getCalendarDate,
  getLocalCalendarDate,
  getCalendarDateLabel,
  getDateLabel,
  getPaddedDateString,
  getAgeFromDate,
  getMonthLabel,
  getDayOfWeekLabel,
  getTimeLabel,
  getSlashedDateString,
  convertUtcISOToLocalISOString,
  convertToCalendarDate,
  convertDateField,
  isDateValue,
  isTimeValue,
  isLaterDate,
  isLaterTime,
  isWithinNextDays,
  getLocalTime,
  generateTimeIntervals,
  mapToUTCString,
  parseLocalDate,
  getLocalTimeWithOriginalDate,
  convertTo12HourFormat,
}
