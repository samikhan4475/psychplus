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
import { InsurancePolicy } from '@/features/billing/payments/types'
import { InsurancePolicyPriority } from '@/features/billing/payments/constants'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'

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

const generateICS = (event: {
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
}) => {
  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
UID:${Date.now()}@yourdomain.com
SEQUENCE:0
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`
}

const downloadICS = (event: {
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
}) => {
  const blob = new Blob([generateICS(event)], {
    type: 'text/calendar;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'appointment.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const getPrimaryInsurance = (policies: InsurancePolicy[]) => {
  return policies?.find(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Primary,
  )
}

const getPrimaryActiveCard = (creditCards: CreditCard[]) => {
  return creditCards?.find((card) => card.isPrimary && card.isActive)
}

export {
  downloadICS,
  getAppointmentDateTimeLabel,
  insuranceMayNotCoverMessage,
  isInsuranceDisabledBasedOnDiagnosisCodes,
  isProviderMemberOfCareTeam,
  getPrimaryActiveCard,
  getPrimaryInsurance
}
