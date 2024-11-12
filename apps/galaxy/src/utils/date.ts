import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  parseDate,
  type DateValue,
} from '@internationalized/date'
import { format } from 'date-fns'
import { Period, SelectOptionType } from '@/types'

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

const getCalendarDateLabel = (date: DateValue) => {
  const day = date.day < 10 ? `0${date.day}` : `${date.day}`
  const month = date.month < 10 ? `0${date.month}` : `${date.month}`
  return `${date.year}-${month}-${day}`
}

const getTimeLabel = (dateString: string, hour12 = true) => {
  return new DateFormatter('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12,
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

const getAgeFromDate = (date: DateValue) => {
  const dobString = getPaddedDateString(date)
  const today = new Date()
  const birthDate = new Date(dobString)
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const m = today.getUTCMonth() - birthDate.getUTCMonth()

  if (m < 0 || (m === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--
  }

  return age
}

const formatDateTime = (
  dateString: string | undefined,
  hour12: boolean | undefined = true,
) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  }).format(date)

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: hour12,
  }).format(date)

  return `${formattedDate} ${formattedTime}`
}

function formatDateToISOString(
  date: DateValue | null | undefined,
  endOfDay = false,
): string | null {
  if (!date) return null

  const { year, month, day } = date

  // If `endOfDay` is true, set the time to 23:59:59.999, otherwise set it to 00:00:00
  const formattedDate = endOfDay
    ? new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999)) // End of day
    : new Date(Date.UTC(year, month - 1, day, 0, 0, 0)) // Start of day

  return formattedDate.toISOString()
}

const formatDate = (
  date: Date | null | undefined | string,
  dateFormat = 'yyyy-MM-dd',
): string => {
  if (!date) return ''
  if (typeof date === 'string') date = new Date(date)
  return format(date, dateFormat)
}

const getSlashedPaddedDateString = (
  date: CalendarDate | string | undefined,
) => {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = getCalendarDate(date)
  }
  if (!date) {
    date = getCalendarDate()
  }
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')
  const year = date.year % 100
  return `${month}/${day}/${year}`
}
function formatExpirationDate(expireMonth: number, expireYear: number) {
  const formattedMonth = String(expireMonth).padStart(2, '0')

  const formattedYear = String(expireYear).slice(-2)
  return `${formattedMonth}/${formattedYear}`
}

const getNextDaysValue = (input: string): number | null => {
  if (!isNaN(Number(input)) && Number(input) > 0) {
    return Number(input)
  }

  return null
}

const getDatesForDateRange = (filter: string, period?: Period) => {
  const periodValue = period ?? 'Past'

  const days = getNextDaysValue(filter)

  if (days !== null) {
    const endDate = getCalendarDate()

    const startDate =
      periodValue === 'Future'
        ? endDate.add({ days })
        : endDate.subtract({ days })

    return { startDate, endDate }
  }

  return { startDate: undefined, endDate: undefined }
}

const formatDateOfBirth = (dob: string) => {
  const date = parseDate(dob)
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')
  const year = String(date.year).padStart(2, '0')
  return `${month}-${day}-${year}`
}

const convertToCalendarDate = (storedDate: DateValue | string) => {
  if (typeof storedDate === 'string') {
    return parseDate(storedDate)
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

const getOptionalDateString = (date?: DateValue | null): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined

const daysAgo = (days: number) =>
  new Date(new Date().setDate(new Date().getDate() - days))

const calculateMinutes = (startTime: string, endTime: string) => {
  if (startTime && endTime) {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)
    if (end.getTime() < start.getTime()) {
      end.setDate(end.getDate() + 1)
    }
    return Math.max((end.getTime() - start.getTime()) / 60000, 0)
  }
  return 0
}

const generateTimeOptions = (interval = 20): SelectOptionType[] => {
  const options = []
  const totalMinutesInDay = 24 * 60
  for (let minutes = 0; minutes < totalMinutesInDay; minutes += interval) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const timeString = `${String(hours).padStart(2, '0')}:${String(
      mins,
    ).padStart(2, '0')}`
    options.push({ label: timeString, value: timeString })
  }

  return options
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
  formatDateTime,
  formatDateToISOString,
  formatDate,
  getSlashedPaddedDateString,
  formatExpirationDate,
  formatDateOfBirth,
  getDatesForDateRange,
  convertToCalendarDate,
  getOptionalDateString,
  daysAgo,
  calculateMinutes,
  generateTimeOptions,
}
