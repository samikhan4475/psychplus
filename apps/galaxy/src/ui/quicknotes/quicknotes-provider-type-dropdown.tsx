'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

interface Props {
  providerType?: string
}

const QuickNotesProviderTypeDropdown = ({ providerType }: Props) => {
  const options = useCodesetOptions(CODESETS.ProviderType)
  const providerTypeLabel =
    options?.find((opt) => opt?.value === providerType)?.label ?? 'N/A'

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Provider Type
      </Text>
      <Select.Root size="1" value="providerType" disabled>
        <Tooltip content={providerTypeLabel}>
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="providerType">{providerTypeLabel}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesProviderTypeDropdown }
