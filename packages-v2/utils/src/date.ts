import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  parseDate,
  parseZonedDateTime,
  type DateValue,
} from '@internationalized/date'
import { TimeInterval } from '@psychplus-v2/types'

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

function generateTimeIntervals(): TimeInterval[] {
  const intervals: TimeInterval[] = []
  let time = '00.00'

  for (let r = 0; r < 100; r++) {
    const formattedTime = time.replace('.', ':')
    intervals.push({ label: formattedTime, value: formattedTime })

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
  generateTimeIntervals,
  mapToUTCString,
  parseLocalDate,
}
