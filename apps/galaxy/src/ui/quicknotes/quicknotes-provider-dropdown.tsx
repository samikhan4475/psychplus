'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { getUserFullName } from '@/utils'

interface Props {
  appointment?: Appointment
}

const QuickNotesProviderDropdown = ({ appointment }: Props) => {
  const provider = appointment?.isServiceTimeDependent
    ? appointment?.providerName
    : appointment?.noteSignedByUserName &&
      getUserFullName(appointment?.noteSignedByUserName)
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Provider
      </Text>
      <Select.Root size="1" value="dr-john-smith" disabled>
        <Tooltip content={provider}>
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="dr-john-smith">{provider ?? 'N/A'}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderDropdown }
