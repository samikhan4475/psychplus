import {
  CalendarDate,
  getLocalTimeZone,
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

export { sanitizeFormData, convertToTimezone }
