'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'

interface Props {
  appointment: Appointment
}

const QuickNotesServiceDropdown = ({ appointment }: Props) => {
  const ServicesOffered = useCodesetCodes(CODESETS.ServicesOffered)
  const serviceTitle = ServicesOffered.find(
    (service) => service.value === appointment.service,
  )?.display

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Service
      </Text>
      <Select.Root size="1" value="group-therapy" disabled>
        <Tooltip content={serviceTitle}>
          <Select.Trigger />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="group-therapy">{serviceTitle}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesServiceDropdown }
