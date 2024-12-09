import { Flex } from '@radix-ui/themes'
import { MultiSelectChip } from '@/components'

const RELATIONSHIP_OPTIONS = [
  { label: 'Parent', value: 'parent' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Child', value: 'child' },
  { label: 'Grand parent', value: 'grandparent' },
  { label: 'Parents sibling', value: 'parentSibling' },
]

const FAMILY_PSYCH_BLOCK_OPTIONS = [
  {
    label: 'Completed Suicide',
    field: 'completedSuicide',
    detailsField: 'completedSuicideRelation',
  },
  {
    label: 'Anxiety',
    field: 'anxiety',
    detailsField: 'anxietyRelation',
  },
  {
    label: 'Depression',
    field: 'depression',
    detailsField: 'depressionRelation',
  },
  {
    label: 'OCD',
    field: 'ocd',
    detailsField: 'ocdRelation',
  },
  {
    label: 'Schizophrenia',
    field: 'schizophrenia',
    detailsField: 'schizophreniaRelation',
  },

  {
    label: 'Bipolar disorder',
    field: 'bipolarDisorder',
    detailsField: 'bipolarDisorderRelation',
  },
  {
    label: 'Alcohol use disorder',
    field: 'alcoholUseDisorder',
    detailsField: 'alcoholUseDisorderRelation',
  },
  {
    label: 'Dementia',
    field: 'dementia',
    detailsField: 'dementiaRelation',
  },
]

const ConditionsBlock = () => {
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
          }}
        />
      ))}
    </Flex>
  )
}

export { ConditionsBlock, FAMILY_PSYCH_BLOCK_OPTIONS }
