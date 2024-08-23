import { Flex } from '@radix-ui/themes'
import { SingleSelectChip } from '@/components'

const RELATIONSHIP_OPTIONS = [
  { label: 'Mother', value: 'mother' },
  { label: 'Father', value: 'father' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Child', value: 'child' },
  { label: 'Grandparent', value: 'grandparent' },
  { label: 'Other', value: 'other' },
]

const BLOCK_OPTIONS = [
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
      {BLOCK_OPTIONS.map((option) => (
        <SingleSelectChip
          key={option.field}
          label={option.label}
          field={option.field}
          details={{
            type: 'select',
            label: 'Relationship',
            field: option.detailsField,
            options: RELATIONSHIP_OPTIONS,
          }}
        />
      ))}
    </Flex>
  )
}

export { ConditionsBlock }
