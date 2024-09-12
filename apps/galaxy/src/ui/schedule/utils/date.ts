import {
  CalendarDate,
  DateFormatter,
  getDayOfWeek,
  getLocalTimeZone,
  today,
} from '@internationalized/date'

const getCurrentLocalDate = (): CalendarDate => {
  const currentDate = today(getLocalTimeZone())
  return currentDate
}

const getCurrentWeekStartDate = (): CalendarDate => {
  const currentDate = getCurrentLocalDate()
  const currentDay = getDayOfWeek(currentDate, 'en-US')
  const weekStartDate =
    currentDay === 0
      ? currentDate.subtract({ days: 6 })
      : currentDate.subtract({ days: currentDay - 1 })
  return weekStartDate
}

const getNextWeekStart = (startDate: CalendarDate): CalendarDate =>
  startDate.add({ weeks: 1 })

const getPreviousWeekStart = (startDate: CalendarDate): CalendarDate =>
  startDate.subtract({ weeks: 1 })

const formatDate = (date: CalendarDate): string => {
  return new DateFormatter('en-US', {
    weekday: 'short',
    month: '2-digit',
    day: '2-digit',
  }).format(date.toDate(getLocalTimeZone()))
}

export {
  getCurrentLocalDate,
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
  formatDate,
}
