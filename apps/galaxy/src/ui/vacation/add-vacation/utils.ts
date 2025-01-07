import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'
import { DateValue } from 'react-aria-components'

const getUtcDateTimeIsoString = (time: string, date: DateValue): string => {
  const [hour, minute] = time ? time.split(':') : [0, 0]
  const { year, day, month } = date
  const dateTime = new CalendarDateTime(
    year,
    month,
    day,
    Number(hour),
    Number(minute),
  )
  return dateTime.toDate(getLocalTimeZone()).toISOString()
}

export { getUtcDateTimeIsoString }
