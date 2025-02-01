import {
  CalendarDate,
  getLocalTimeZone,
  now,
  parseAbsolute,
  toCalendarDate,
  toTimeZone,
} from '@internationalized/date'
import { getTimeLabel } from '@/utils'

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

export { sanitizeFormData, convertToTimezone, isVisitRescheduled }
