'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  visitMedium?: string
}

const QuickNotesVisitMediumDropdown = ({ visitMedium }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Visit Medium
      </Text>
      <Select.Root size="1" value="est-patient-outpatient-visit" disabled>
        <Tooltip content={visitMedium}>
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="est-patient-outpatient-visit">
            {visitMedium}
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesVisitMediumDropdown }
