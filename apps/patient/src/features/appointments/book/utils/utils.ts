import {
  CalendarDate,
  getLocalTimeZone,
  isToday,
} from '@internationalized/date'
import { CareTeamMember, Specialist } from '@psychplus-v2/types'
import {
  getDayOfWeekLabel,
  getMonthLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'

function isProviderMemberOfCareTeam(
  careTeam: CareTeamMember[],
  specialist: Specialist,
) {
  return careTeam.some((member) => member.staffDetails.id === specialist.id)
}

function getAppointmentDateTimeLabel(
  slotDate: CalendarDate,
  startDate: string,
): string {
  const isTodaySlot = isToday(slotDate, getLocalTimeZone())
  const time = getTimeLabel(startDate)

  if (isTodaySlot) {
    return `Today at ${time}`
  } else {
    const dayOfWeek = getDayOfWeekLabel(slotDate).slice(0, 3)
    const month = getMonthLabel(slotDate)
    const day = slotDate.day
    const year = slotDate.year

    return `on ${dayOfWeek} ${month} ${day}, ${year} at ${time}`
  }
}

export { isProviderMemberOfCareTeam, getAppointmentDateTimeLabel }
