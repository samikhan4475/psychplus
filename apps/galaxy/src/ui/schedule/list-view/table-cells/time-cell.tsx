import { Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { cn } from '@/utils'
import { TIMEZONE_TYPES } from '../../constants'
import { useStore as useScheduleStore } from '../../store/store'
import {
  formatTimeCell,
  getPreferredTimezone,
  getTimeZoneAbbreviation,
} from '../../utils'

const TimeCell = ({ row }: PropsWithRow<Appointment>) => {
  const timezoneType = useScheduleStore((state) => state.timezoneType)
  const timeZoneId = getPreferredTimezone(
    timezoneType,
    row.original.locationTimezoneId,
    row.original.staffTimezonePreference,
  )

  const selectedTimezone = formatTimeCell(
    row.original.appointmentDate,
    timeZoneId,
  )
  const codeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
  const selectedTimeZoneAbbreviation = getTimeZoneAbbreviation(
    timeZoneId,
    codeSets,
  )
  const timezoneLabel =
    timezoneType === TIMEZONE_TYPES.PROVIDER_PREFERRED
      ? 'Provider Preferred Time'
      : 'Location Time'

  return (
    <Tooltip
      content={`${timezoneLabel}: ${selectedTimezone} (${selectedTimeZoneAbbreviation})`}
    >
      <Text
        className={cn('text-pp-black-3', {
          'text-gray-9': !row.original.isServiceTimeDependent,
        })}
        size="1"
      >
        {selectedTimezone}
      </Text>
    </Tooltip>
  )
}

export { TimeCell }
