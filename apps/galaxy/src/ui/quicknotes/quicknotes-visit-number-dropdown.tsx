'use client'

import { Flex, Select, Text } from '@radix-ui/themes'

const QuickNotesVisitNumberDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Visit #
      </Text>
      <Select.Root size="1" value="12536337" disabled>
        <Select.Trigger className="max-w-[150px]" />
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="12536337">12536337</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesVisitNumberDropdown }
