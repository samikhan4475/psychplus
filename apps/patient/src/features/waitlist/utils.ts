import { parseDate, parseTime } from '@internationalized/date'
import { AppointmentType } from '@psychplus-v2/constants'
import {
  convertTo12HourFormat,
  getFullLegalName,
  getSlashedDateString,
} from '@psychplus-v2/utils'
import { Staff } from '@psychplus/user'
import { Waitlist } from './types'

const getWaitlistDateAndTime = (date: string, time: string) =>
  `${getSlashedDateString(date, true)} - ${convertTo12HourFormat(
    time,
  ).toLocaleLowerCase()}`

const getDefaultValues = (data?: Waitlist) => {
  if (!data)
    return {
      serviceOffered: '',
      visitMedium: '',
      providerId: '',
      waitingStatus: '',
      fromTime: '',
      toTime: '',
      priority: '',
    }

  return {
    serviceOffered: String(data.serviceOffered),
    visitMedium: String(data.visitMedium),
    providerId: String(data.providerId),
    waitingStatus: data.waitingStatus,
    priority: data.priority,
    fromDate: parseDate(data.fromDate),
    toDate: parseDate(data.toDate),
    fromTime: parseTime(data.fromTime),
    toTime: parseTime(data.toTime),
  }
}

const getStaffOptions = (providers: Staff[]) =>
  providers?.map((item: Staff) => ({
    display: getFullLegalName(item.legalName),
    value: String(item.id),
  }))

const getVisitMediumLabel = (value: string) => {
  if (!value) return ''
  if (value === AppointmentType.InPerson) return 'In-Person'
  if (value === AppointmentType.Virtual) return 'Virtual'

  return value
}

export {
  getWaitlistDateAndTime,
  getDefaultValues,
  getStaffOptions,
  getVisitMediumLabel,
}
