import { DateValue } from '@internationalized/date'
import { addDays, isAfter, isBefore, isSameDay } from 'date-fns'

const dateValueToJSDate = (dateValue: DateValue): Date => {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
}
const isInNextDays = (date: DateValue, days: number): boolean => {
  const currentDate = new Date()
  const futureDate = addDays(currentDate, days)
  const targetDate = dateValueToJSDate(date)

  return (
    (isSameDay(targetDate, currentDate) || isAfter(targetDate, currentDate)) &&
    (isSameDay(targetDate, futureDate) || isBefore(targetDate, futureDate))
  )
}

const isInNext30Days = (date: DateValue): boolean => isInNextDays(date, 30)
const isInNext90Days = (date: DateValue): boolean => isInNextDays(date, 90)

export { isInNext30Days, isInNext90Days }
