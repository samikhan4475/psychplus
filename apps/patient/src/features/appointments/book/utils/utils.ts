import {
  CalendarDate,
  getLocalTimeZone,
  isToday,
} from '@internationalized/date'
import { AppointmentType } from '@psychplus-v2/constants'
import { CareTeamMember, Specialist } from '@psychplus-v2/types'
import {
  getAppointmentTypeLabel,
  getDayOfWeekLabel,
  getMonthLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { NoteSectionItem } from '@/features/note/types'
import { INSURANCE_DEPENDENT_DIAGNOSIS } from '../constants'

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

const isInsuranceDisabledBasedOnDiagnosisCodes = (
  diagnosisCodes: NoteSectionItem[],
) => {
  const codes = diagnosisCodes?.[0]?.sectionItemValue
  return INSURANCE_DEPENDENT_DIAGNOSIS.every((code) => codes?.includes(code))
}

const insuranceMayNotCoverMessage = (appointmentType: AppointmentType) =>
  `Patient has working diagnosis ${INSURANCE_DEPENDENT_DIAGNOSIS.join(
    ', ',
  )} due to which insurance may
    not cover this visit, if this visit is schedule, patient may be
    charged selfpay for ${getAppointmentTypeLabel(
      appointmentType,
    ).toLocaleLowerCase()} `

export {
  isProviderMemberOfCareTeam,
  getAppointmentDateTimeLabel,
  isInsuranceDisabledBasedOnDiagnosisCodes,
  insuranceMayNotCoverMessage,
}
