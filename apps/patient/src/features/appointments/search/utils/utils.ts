import { CalendarDate, parseAbsoluteToLocal, } from '@internationalized/date'
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

const getStartOfWeek = (date: Date = new Date()): string => {
  // Create a copy of the date to avoid mutating the original
  const startDate = new Date(date);
  
  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = startDate.getDay();
  
  // Calculate the difference in days to Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  
  // Subtract the calculated days from the current date
  startDate.setDate(startDate.getDate() - daysToMonday);
  
  // Format the date as YYYY-MM-DD
  const year = startDate.getFullYear();
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const day = startDate.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export {
  generateDateRange,
  getEarliestSlot,
  checkCareTeamExists,
  isDateInNextRange,
  parseDateAbsoluteToLocal,
  getStartOfWeek
}
