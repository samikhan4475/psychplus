'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

const QuickNotesProviderDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Provider
      </Text>
      <Select.Root size="1" value="dr-john-smith" disabled>
        <Tooltip content="Dr. John Smith">
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="dr-john-smith">Dr. John Smith</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderDropdown }
