'use client'

import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { MultiSelectChip } from '@/components-v2'
import { mapCodesetToOptions, useCodesetCodes } from '@/providers'
import FAMILY_PSYCH_BLOCK_OPTIONS from './family-psych-options.json'

const ConditionsBlock = () => {
  const RoleCodes = useCodesetCodes(CODESETS.Relationship).filter(
    (item) => item.groupingCode === 'PRIMARY',
  )
  const RELATIONSHIP_OPTIONS = mapCodesetToOptions(RoleCodes)

  return (
    <Flex gap="2" wrap="wrap">
      {FAMILY_PSYCH_BLOCK_OPTIONS.map((option) => (
        <MultiSelectChip
          key={option.field}
          label={option.label}
          field={option.field}
          details={{
            type: 'multi-select',
            label: 'Relationship',
            field: option.detailsField,
            options: RELATIONSHIP_OPTIONS,
            hideSelectedCount: true,
            isOptionsChip: true,
          }}
        />
      ))}
    </Flex>
  )
}

export { ConditionsBlock }
