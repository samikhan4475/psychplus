import { parseDate, parseTime } from '@internationalized/date'
import { VisitMediumEnum } from '@/enum'
import { UpdateWaitlistpayload, WaitlistResponse } from '@/types'
import { getLocalDateWithoutTime, getLocalTime } from '../schedule/utils'

export const transformOut = (formValues: any): UpdateWaitlistpayload => {
  return {
    id: formValues?.id,
    serviceOfferedDescription: formValues?.serviceOfferedDescription,
    serviceOffered: formValues.serviceOffered,
    visitMedium: formValues.visitMedium,
    providerId: Number(formValues.providerId),
    priority: formValues.priority,
    fromDate: getLocalDateWithoutTime(formValues.fromDate) as string,
    toDate: getLocalDateWithoutTime(formValues.toDate) as string,
    fromTime: formValues.fromTime ? getLocalTime(formValues.fromTime) : '',
    toTime: formValues.toTime ? getLocalTime(formValues.toTime) : '',
    patientId: Number(formValues.patientId),
  }
}

export const transformIn = (waitlistData: WaitlistResponse) => {
  return {
    serviceOffered: waitlistData.serviceOffered,
    visitMedium: waitlistData.visitMedium,
    providerId: String(waitlistData.providerId),
    waitingStatus: waitlistData.waitingStatus,
    priority: waitlistData.priority,
    fromDate: parseDate(waitlistData.fromDate),
    toDate: parseDate(waitlistData.toDate),
    fromTime: parseTime(waitlistData.fromTime),
    toTime: parseTime(waitlistData.toTime),
  }
}

export function filterFalsey(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => typeof value === 'boolean' || Boolean(value),
    ),
  )
}

export const getVisitMediumLabel = (value: string) => {
  if (!value) return ''
  if (value === VisitMediumEnum.InPerson) return 'In-Person'
  if (value === VisitMediumEnum.TeleVisit) return 'Virtual'

  return value
}
