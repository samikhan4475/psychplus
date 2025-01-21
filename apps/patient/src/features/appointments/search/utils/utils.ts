import { CalendarDate, parseAbsoluteToLocal } from '@internationalized/date'
import { CareTeamMember } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { AppointmentSlot, SlotsByDay } from '../types'

const generateDateRange = (start: CalendarDate) => {
  const jsDate = new Date(start.toString());

  const dayOfWeek = jsDate.getUTCDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const adjustedStart = start.add({ days: -daysToMonday });

  const dateRange = [adjustedStart];

  for (let i = 1; i < 7; ++i) {
    dateRange.push(adjustedStart.add({ days: i }));
  }

  return dateRange;
};


const isDateInNextRange = (
  startingDate: CalendarDate,
  slotDate: CalendarDate,
) => {
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

const parseDateAbsoluteToLocal = (earliestSlotA : AppointmentSlot, earliestSlotB : AppointmentSlot) => {
  const slotA = earliestSlotA.startDateUtc ?? new Date(earliestSlotA.startDate).toISOString();
  const slotB = earliestSlotB.startDateUtc ?? new Date(earliestSlotB.startDate).toISOString();
    return parseAbsoluteToLocal(slotA).compare(
      parseAbsoluteToLocal(slotB),
    )
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
  parseDateAbsoluteToLocal,
}
