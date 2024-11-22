import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'autism'

const BLOCK_TITLE = 'Autism'

const BLOCK_OPTIONS = [
  { label: 'Delayed Milestones', value: 'autDelayedMilestones' },
  { label: 'Repetitive/restrictive behaviors', value: 'autRepetitive' },
  { label: 'Regression', value: 'autRegression' },
  { label: 'Social/communication issues', value: 'autSocial' },
  { label: 'Aversions/special interests', value: 'autAversions' },
  { label: 'Masking', value: 'autMasking' },
  { label: 'Emotional Dysregulations', value: 'autEmotionalDysregulation' },
]

const AutismBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccAutism"
    />
  )
}

export { AutismBlock }
