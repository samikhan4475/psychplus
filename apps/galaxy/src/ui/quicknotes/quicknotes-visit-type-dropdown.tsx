'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  visitType?: string
}

const QuickNotesVisitTypeDropdown = ({ visitType }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Visit Type
      </Text>
      <Select.Root size="1" value="est-patient-outpatient-visit" disabled>
        <Tooltip content="Est Pt, Outpatient Visit">
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="est-patient-outpatient-visit">
            {visitType}
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesVisitTypeDropdown }
