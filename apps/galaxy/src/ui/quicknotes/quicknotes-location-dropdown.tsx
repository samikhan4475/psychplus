'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  location?: string
}

const QuickNotesLocationDropdown = ({ location }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Location
      </Text>
      <Select.Root size="1" value="willowbrook-clinic" disabled>
        <Tooltip content={location}>
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="willowbrook-clinic">{location}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesLocationDropdown }
