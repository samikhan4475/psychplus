import { Flex } from '@radix-ui/themes'
import { SingleSelectChip } from '@/components-v2'
import { PAST_PSYCH_BLOCK_OPTIONS } from '../constants'

const ConditionsBlock = () => {
  return (
    <Flex gap="2" wrap="wrap">
      {PAST_PSYCH_BLOCK_OPTIONS.map((option) => (
        <SingleSelectChip
          key={option.field}
          field={option.field}
          label={option.label}
          details={{
            type: option.field === 'other' ? 'text' : 'number',
            label: option.field === 'other' ? '' : 'Age Started',
            field: option.detailsField,
            maxLength: option.field === 'other' ? 500 : undefined,
          }}
        />
      ))}
    </Flex>
  )
}

export { ConditionsBlock, PAST_PSYCH_BLOCK_OPTIONS }
