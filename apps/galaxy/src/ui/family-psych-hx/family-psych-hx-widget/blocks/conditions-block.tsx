'use client'

import { Flex } from '@radix-ui/themes'
import { MultiSelectChip } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { mapCodesetToOptions } from '@/utils'
import FAMILY_PSYCH_BLOCK_OPTIONS from './family-psych-options.json'

const ConditionsBlock = () => {
  const RELATIONSHIP_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.Relationship),
  )

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
