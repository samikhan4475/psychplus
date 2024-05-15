import { CalendarDate } from '@internationalized/date'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { SlotsByDay } from '../types'

const generateDateRange = (start: CalendarDate) => {
  const dateRange = [start]

  for (let i = 0; i < 6; ++i) {
    dateRange.push(dateRange[i].add({ days: 1 }))
  }
  return dateRange
}

const getEarliestSlot = (slots: SlotsByDay, dateRange: CalendarDate[]) => {
  for (let i = 0; i < dateRange.length; ++i) {
    const daySlots = slots[getCalendarDateLabel(dateRange[i])]

    if (!daySlots) {
      continue
    }
    return daySlots[0]
  }
}

export { generateDateRange, getEarliestSlot }
