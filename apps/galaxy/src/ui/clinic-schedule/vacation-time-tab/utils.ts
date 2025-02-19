import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'
import {
  differenceInDays,
  differenceInMinutes,
  format,
  parseISO,
} from 'date-fns'
import { DateValue } from 'react-aria-components'
import { SelectOptionType } from '@/types'
import { getLocalCalendarDate } from '@/utils'
import { VacationTime } from './types'
import { VacationSchemaType } from './vacation-dialog'

const getDuration = (
  fromDateTimeISO: string,
  toDateTimeISO: string,
): string => {
  if (!fromDateTimeISO || !toDateTimeISO) return 'N/A'
  const fromDateTime = parseISO(fromDateTimeISO)
  const toDateTime = parseISO(toDateTimeISO)
  const totalMinutes = differenceInMinutes(toDateTime, fromDateTime)
  const totalHours = totalMinutes / 60
  const days = Math.floor(totalHours / 24)
  const hours = (totalHours % 24).toFixed(0)
  return `${days}.${hours} days`
}

const getCalculatedDuration = (
  fromDate?: DateValue,
  toDate?: DateValue,
  fromTime?: string,
  toTime?: string,
) => {
  if (!fromDate || !toDate || !fromTime || !toTime) return null
  const fromDateTime = parseISO(`${fromDate}T${fromTime}`)
  const toDateTime = parseISO(`${toDate}T${toTime}`)
  const totalMinutes = differenceInMinutes(toDateTime, fromDateTime)
  const totalHours = totalMinutes / 60
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  const totalDays = differenceInDays(toDateTime, fromDateTime)
  return {
    value: parseFloat(`${days}.${hours.toFixed(2)}`),
    isNagtive: fromDateTime > toDateTime,
    isLongVacation: totalDays >= 14,
  }
}

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
const getIsoStringtoUtcDateTime = (vacation?: VacationTime) => {
  if (!vacation) {
    return undefined
  }
  const getDateTime = (isoDate: string) => ({
    date: getLocalCalendarDate(isoDate),
    time: format(parseISO(isoDate), 'HH:mm'),
  })
  const startDateTime = getDateTime(vacation.startDateTime)
  const endDateTime = getDateTime(vacation.endDateTime)

  return { startDateTime, endDateTime }
}

const getInitialValues = (
  vacation: VacationTime | undefined,
  staffId: number,
): Partial<VacationSchemaType> => {
  const dateValues = getIsoStringtoUtcDateTime(vacation)
  return {
    id: vacation?.id ?? undefined,
    staffId: vacation?.staffId ?? staffId,
    startDateTime: dateValues?.startDateTime.date ?? undefined,
    endDateTime: dateValues?.endDateTime.date ?? undefined,
    fromTime: dateValues?.startDateTime.time ?? '',
    toTime: dateValues?.endDateTime.time ?? '',
    vacationStatus: vacation?.vacationStatus ?? 'Pending',
  }
}

const getVacationStatusLabel = (options: SelectOptionType[], value: string) =>
  options?.find((opt) => opt.value === value)?.label

export {
  getDuration,
  getCalculatedDuration,
  getUtcDateTimeIsoString,
  getInitialValues,
  getVacationStatusLabel,
}
