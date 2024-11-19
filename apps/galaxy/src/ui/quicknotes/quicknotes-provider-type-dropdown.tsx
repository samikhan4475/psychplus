'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  providerType?: string
}

const QuickNotesProviderTypeDropdown = ({ providerType }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Provider Type
      </Text>
      <Select.Root size="1" value="psychiatrist" disabled>
        <Tooltip content={providerType}>
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="psychiatrist">{providerType}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderTypeDropdown }
