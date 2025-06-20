'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

interface Props {
  visitSequence?: string
}

const QuickNotesVisitSequenceDropdown = ({ visitSequence }: Props) => {
  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const sequence = getCodesetDisplayName(visitSequence ?? '', sequenceCodes)
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Visit Sequence
      </Text>
      <Select.Root size="1" value="est-patient-outpatient-visit" disabled>
        <Tooltip content={sequence}>
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="est-patient-outpatient-visit">
            {sequence}
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesVisitSequenceDropdown }
