'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

const QuickNotesLocationDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Location
      </Text>
      <Select.Root size="1" value="willowbrook-clinic" disabled>
        <Tooltip content="Willowbrook Clinic">
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="willowbrook-clinic">
            Willowbrook Clinic
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesLocationDropdown }
