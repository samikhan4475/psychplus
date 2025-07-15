import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import { format } from 'date-fns'
import { DateValue } from 'react-aria-components'

const generateCalendarDateToday = (dateString?: string): CalendarDate => {
  const date = dateString ? new Date(dateString) : new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return new CalendarDate(year, month, day)
}

const getCalendarDateOffsetFromToday = (days: number): CalendarDate => {
  const base = new Date()
  base.setDate(base.getDate() + days)

  return new CalendarDate(
    base.getFullYear(),
    base.getMonth() + 1,
    base.getDate(),
  )
}

const getDateString = (
  date?: DateValue | null,
  timezoneId: string = getLocalTimeZone(),
): string | undefined => {
  if (date) {
    const dateOb = date.toDate(timezoneId)

    return format(dateOb, 'yyyy-MM-dd')
  }
  return undefined
}

export {
  generateCalendarDateToday,
  getCalendarDateOffsetFromToday,
  getDateString,
}
