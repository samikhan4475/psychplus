'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

const QuickNotesProviderTypeDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Provider Type
      </Text>
      <Select.Root size="1" value="psychiatrist" disabled>
        <Tooltip content="Therapist">
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="therapist">Therapist</Select.Item>
          <Select.Item value="psychiatrist">Psychiatrist</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderTypeDropdown }
