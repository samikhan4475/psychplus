'use client'

import { Flex, Text, TextField } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { convertToTimezone } from '../visit/utils'
import { getTimeZoneAbbreviation } from '../schedule/utils'
import { useCodesetCodes } from '@/hooks'
import { CODESETS } from '@/constants'

interface QuickNotesTimeDropdownProps {
  appointment: Appointment
}

const QuickNotesTimeDropdown = ({
  appointment,
}: QuickNotesTimeDropdownProps) => {
  const { time } = convertToTimezone(
    appointment.startDate,
    appointment.locationTimezoneId,
  )
  const timeZoneCodeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
const locationTimeZoneAbbreviation = getTimeZoneAbbreviation(appointment.locationTimezoneId,timeZoneCodeSets)
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Time ({locationTimeZoneAbbreviation})
      </Text>
      <TextField.Root size="1" disabled className="max-w-12" value={time} />
    </Flex>
  )
}

export { QuickNotesTimeDropdown }
