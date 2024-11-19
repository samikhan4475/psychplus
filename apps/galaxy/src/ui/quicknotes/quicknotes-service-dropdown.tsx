'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  service?: string
}

const QuickNotesServiceDropdown = ({ service }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Service
      </Text>
      <Select.Root size="1" value="group-therapy" disabled>
        <Tooltip content={service}>
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="group-therapy">{service}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesServiceDropdown }
