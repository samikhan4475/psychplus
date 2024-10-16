import { getLocalTimeZone, parseAbsolute, startOfWeek, today } from '@internationalized/date'
import { AppointmentDate, SlotsByDay } from './types'
import { START_OF_WEEK_LOCALE } from '../constants'

const extractDate = (dateString: string, timezone: string) => {
  const zonedDate = parseAbsolute(dateString, timezone)
  const month = `${zonedDate.month}`.padStart(2, '0')
  const day = `${zonedDate.day}`.padStart(2, '0')
  return `${month}/${day}`
}

const currentWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
  let total = 0

  for (let i = 0; i < days.length / 2; i++) {
    const day = days[i]
    total += slots[`${day.monthAndDay}`]?.length || 0
  }
  return total
}

const extractTime = (dateString: string, timezone: string) => {
  const zonedCalendarDate = parseAbsolute(dateString, timezone)
  const hours = `${zonedCalendarDate.hour}`.padStart(2, "0")
  const minutes = `${zonedCalendarDate.minute}`.padStart(2, "0")
  return `${hours}:${minutes}`
}

const nextWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
  let total = 0

  for (let i = days.length / 2; i < days.length; i++) {
    const day = days[i]
    total += slots[`${day.monthAndDay}`]?.length || 0
  }
  return total
}

const getCurrentWeekStart = (): Date => {
  const currentDate = today(getLocalTimeZone())
  const weekStartDate = startOfWeek(currentDate, START_OF_WEEK_LOCALE)
  return new Date(weekStartDate.toString())
}

export {
  extractDate,
  currentWeekTotalSlots,
  extractTime,
  nextWeekTotalSlots,
  getCurrentWeekStart,
}
