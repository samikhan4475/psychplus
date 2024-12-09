import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'relationshipStatus'

const BLOCK_TITLE = 'Relationship Status'

const RELATIONSHIP_BLOCK_OPTIONS = [
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
      options={RELATIONSHIP_BLOCK_OPTIONS}
    />
  )
}

export { RelationshipStatusBlock, RELATIONSHIP_BLOCK_OPTIONS }
