import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'relationshipStatus'

const BLOCK_TITLE = 'Relationship Status'

const BLOCK_OPTIONS = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'Divorced/Separated',
    value: 'divorcedSeparated',
  },
  {
    label: 'Dating',
    value: 'dating',
  },
  {
    label: 'Married',
    value: 'married',
  },
]

const RelationshipStatusBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { RelationshipStatusBlock }
