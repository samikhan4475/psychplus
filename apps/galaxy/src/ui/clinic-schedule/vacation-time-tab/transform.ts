import { sanitizeFormData } from '@/utils'
import { VacationPayload, VacationTime } from './types'
import { getDuration, getUtcDateTimeIsoString } from './utils'
import { VacationSchemaType } from './vacation-dialog'

const transformInVacations = (data: VacationTime[] = []) =>
  data?.map((vacation) => ({
    ...vacation,
    duration: getDuration(vacation.startDateTime, vacation.endDateTime),
  }))

const transformOutVacation = ({
  duration,
  fromTime,
  toTime,
  startDateTime,
  endDateTime,
  ...data
}: VacationSchemaType): VacationPayload => {
  return sanitizeFormData({
    recordStatus: 'Active',
    startDateTime: getUtcDateTimeIsoString(fromTime, startDateTime) ?? '',
    endDateTime: getUtcDateTimeIsoString(toTime, endDateTime) ?? '',
    duration: String(duration),
    ...data,
  })
}
export { transformInVacations, transformOutVacation }
