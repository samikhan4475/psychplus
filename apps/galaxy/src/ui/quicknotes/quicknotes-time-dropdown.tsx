'use client'

import { Flex, Select, Text } from '@radix-ui/themes'

const QuickNotesTimeDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Time
      </Text>
      <Select.Root size="1" value="08:00">
        <Select.Trigger className="max-w-[125px]" />
        <Select.Content highContrast>
          <Select.Item value="08:00">08:00</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesTimeDropdown }
