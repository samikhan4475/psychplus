import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  getLocalTimeZone,
  type DateValue,
} from '@internationalized/date'

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
}
