'use client'

import { Flex, Text, TextField } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { convertToTimezone } from '../visit/utils'

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

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Time
      </Text>
      <TextField.Root size="1" disabled className="max-w-12" value={time} />
    </Flex>
  )
}

export { QuickNotesTimeDropdown }
