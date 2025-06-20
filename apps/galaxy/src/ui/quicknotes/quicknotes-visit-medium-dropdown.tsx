'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

interface Props {
  visitMedium?: string
}

const QuickNotesVisitMediumDropdown = ({ visitMedium }: Props) => {
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)
  const medium = getCodesetDisplayName(visitMedium ?? '', mediumCodes)
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Visit Medium
      </Text>
      <Select.Root size="1" value="est-patient-outpatient-visit" disabled>
        <Tooltip content={medium}>
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="est-patient-outpatient-visit">
            {medium}
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesVisitMediumDropdown }
