import { parseDate, parseTime } from '@internationalized/date'
import { UpdateWaitlistpayload, WaitlistResponse } from '@/types'
import { getLocalDateWithoutTime, getLocalTime, getUtcDateWithoutTime } from '../schedule/utils'

export const transformOut = (formValues: any): UpdateWaitlistpayload => {
  return {
    id: formValues?.id,
    visitTypeCode: formValues.visitTypeCode,
    providerId: Number(formValues.providerId),
    waitingStatus: formValues.waitingStatus,
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
    visitTypeCode: String(waitlistData.visitTypeCode),
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
