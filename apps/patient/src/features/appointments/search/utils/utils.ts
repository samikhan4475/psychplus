import { CalendarDate } from '@internationalized/date'
import { CareTeamMember } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { SlotsByDay } from '../types'

const generateDateRange = (start: CalendarDate) => {
  const dateRange = [start]

  for (let i = 0; i < 6; ++i) {
    dateRange.push(dateRange[i].add({ days: 1 }))
  }
  return dateRange
}

const isDateInNextRange = (
  startingDate: CalendarDate,
  slotDate: CalendarDate,
) => {
  console.log(slotDate.day, startingDate.add({ days: 6 }).compare(slotDate))
  return startingDate.add({ days: 6 }).compare(slotDate) < 0
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

const checkCareTeamExists = (
  careTeam: CareTeamMember[],
  providerType: string,
) => careTeam.some((member) => member.specialist === providerType)

export {
  generateDateRange,
  getEarliestSlot,
  checkCareTeamExists,
  isDateInNextRange,
}
