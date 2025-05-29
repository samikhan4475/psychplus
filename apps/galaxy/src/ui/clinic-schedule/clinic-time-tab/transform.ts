import { mapToUTCString } from '@/ui/notes/create-note/utils'
import { convertToTimezone } from '@/ui/visit/utils'
import { SchemaType } from '../dialogs/clinic-schedule-dialog/schema'
import { ClinicScheduleStatus } from './constants'
import { ClinicSchedule, ClinicScheduleForm } from './types'
import { extractDateAndTimeFromMappedUTCtime } from './utils'

const transformIn = (clinicTimes: ClinicSchedule[]): ClinicSchedule[] =>
  clinicTimes.map((clinicTime) => {
    const startDateTime = convertToTimezone(
      `${clinicTime.startDate}T${clinicTime.startTime}Z`,
      clinicTime.timezoneId,
    )
    const endDateTime = clinicTime.endTime
      ? convertToTimezone(
          `${clinicTime.endDate ?? clinicTime.startDate}T${
            clinicTime.endTime
          }Z`,
          clinicTime.timezoneId,
        )
      : undefined

    return {
      ...clinicTime,
      startDate: startDateTime.date?.toString() ?? clinicTime.startDate,
      endDate: clinicTime.endDate ? endDateTime?.date?.toString() : undefined,
      startTime: startDateTime.time,
      endTime: endDateTime?.time,
    }
  })

const transformOut = (
  clinicScheduleFormInput: SchemaType,
  staffId: string,
): ClinicScheduleForm => {
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    primaryState,
    primaryLocation,
    primaryLocationName,
    day,
    groups,
    timeZoneId,
    ...rest
  } = clinicScheduleFormInput

  const startDateTime = extractDateAndTimeFromMappedUTCtime(
    mapToUTCString(`${dateStart}T${timeStart.toString()}[${timeZoneId}]`),
  )

  const endDateTime = extractDateAndTimeFromMappedUTCtime(
    mapToUTCString(
      `${dateEnd ?? dateStart}T${
        timeEnd?.toString() ?? '23:59:59'
      }[${timeZoneId}]`,
    ),
  )

  return {
    ...rest,
    status: ClinicScheduleStatus.Pending,
    stateCode: clinicScheduleFormInput.primaryState,
    locationId: clinicScheduleFormInput.primaryLocation,
    locationName: clinicScheduleFormInput.primaryLocationName,
    staffId: Number(staffId),
    dayOfSchedule: clinicScheduleFormInput.day,
    weeklyRecurrence: clinicScheduleFormInput.recurrence,
    maxBookingsPerSlot: Number(clinicScheduleFormInput.bookingFrequency),
    ageGroups: clinicScheduleFormInput.groups,
    isApproved: false,
    startDate: startDateTime.date,
    endDate: clinicScheduleFormInput.dateEnd ? endDateTime.date : undefined,
    startTime: startDateTime.time,
    endTime: endDateTime.time,
    isPublicViewable: clinicScheduleFormInput.publicView === 'yes',
    teleStates: clinicScheduleFormInput.teleStates?.map((telestate) => ({
      ...telestate,
      locationId: telestate.location,
    })),
  }
}

export { transformIn, transformOut }
