import { Appointment } from '@/types'
import { formatTimeCell, getTimeZoneAbbreviation } from '../../utils'
import { Text, Tooltip } from '@radix-ui/themes';
import { cn } from '@/utils';
import { useUserSettingStore } from '../../store';
import { Row } from '@tanstack/react-table';
import { useCodesetCodes } from '@/hooks';
import { CODESETS } from '@/constants';

interface TimeCellProps {
  row : Row<Appointment>
}
const TimeCell = ({
  row,
}: TimeCellProps) => {
  const store = useUserSettingStore();
  const timeZoneSetting = store.timeZoneSetting();
  const preferredTime = formatTimeCell(
    row.original.appointmentDate,
    timeZoneSetting.content
  )
  const locationTime = formatTimeCell(
    row.original.appointmentDate,
    row.original.locationTimezoneId,
  )
  const codeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
  const locationTimeZoneAbbreviation = getTimeZoneAbbreviation(row.original.locationTimezoneId,codeSets)

  return (
    <Tooltip content={`Location Time: ${locationTime} (${locationTimeZoneAbbreviation})`}>
      <Text className={cn(
        'text-pp-black-3',
        {
          'text-gray-9': !row.original.isServiceTimeDependent,
        }
      )}
        size="1"
      >
        {preferredTime}
      </Text>
    </Tooltip>
  )
}

export { TimeCell }
