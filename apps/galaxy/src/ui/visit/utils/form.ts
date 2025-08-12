import {
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  now,
  parseAbsolute,
  parseTime,
  toCalendarDate,
  toCalendarDateTime,
  toTimeZone,
  toZoned,
  ZonedDateTime,
} from '@internationalized/date'
import { getTimeLabel } from '@/utils'
import { PRIMARY_PROVIDER_ALERT_MESSAGE } from '../constants'

const sanitizeFormData = <T extends object>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== '' && value !== null,
    ),
  ) as T

const convertToTimezone = (
  dateTime: string | undefined,
  timezone?: string,
): { date: CalendarDate | undefined; time: string } => {
  if (!dateTime) return { date: undefined, time: '' }

  const tz = timezone ?? getLocalTimeZone()
  const absoluteDate = parseAbsolute(dateTime, tz)
  const date = toCalendarDate(toTimeZone(absoluteDate, tz))
  const time = getTimeLabel(dateTime, false, tz)
  return { date, time }
}

const isVisitRescheduled = (
  dirtyFields: object,
  originalDate: string,
  timezone: string,
) => {
  const fields = ['visitTime', 'duration', 'frequency', 'paymentResponsibility']
  const isLimitedToTimeFields = Object.keys(dirtyFields).every((key) =>
    fields.includes(key),
  )

  if (!isLimitedToTimeFields) {
    const baseDate = parseAbsolute(originalDate, timezone)
    const currentDate = now(timezone)
    const dateToCompare = currentDate.add({ hours: 24 })
    return baseDate.compare(dateToCompare) > 0
  }
}

const mapMessages = (message: string) => {
  let arr = message.includes('\n')
    ? message.split('\n').filter((s) => s)
    : [message]

  const specialIndex = arr.findIndex((msg) =>
    msg.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE),
  )
  if (specialIndex > -1 && specialIndex !== arr.length - 1) {
    const [specialMsg] = arr.splice(specialIndex, 1)
    arr = [...arr, specialMsg]
  }
  return arr
}

const toClinicTime = (
  startISO: string,
  tz: string,
  fallback: ZonedDateTime = now(tz),
): ZonedDateTime => {
  const r = convertToTimezone(startISO, tz)
  if (r.date && r.time)
    return toZoned(toCalendarDateTime(r.date, parseTime(r.time)), tz)

  return fromDate(new Date(startISO), tz) || fallback
}

export {
  sanitizeFormData,
  convertToTimezone,
  isVisitRescheduled,
  mapMessages,
  toClinicTime,
}
