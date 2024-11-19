'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  provider?: string
}

const QuickNotesProviderDropdown = ({ provider }: Props) => {
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
          <Select.Item value="dr-john-smith">{provider}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderDropdown }
