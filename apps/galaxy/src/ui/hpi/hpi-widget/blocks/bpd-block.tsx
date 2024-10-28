import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'bpd'

const BLOCK_TITLE = 'BPD (Borderline Personality Disorder)'

const BLOCK_OPTIONS = [
  {
    label: 'Fear of Abandonment',
    value: 'bpdFearOfAbandonment',
  },
  {
    label: 'Unstable Self-Image',
    value: 'bpdUnstableSelfImage',
  },
  {
    label: 'Unstable Relationships',
    value: 'bpdUnstableRelationships',
  },
  {
    label: 'Mood Swings',
    value: 'bpdMoodSwings',
  },
  {
    label: 'Black/White Thinking',
    value: 'bpdBlackWhiteThinking',
  },
  {
    label: 'Impulsiveness',
    value: 'bpdImpulsiveness',
  },
  {
    label: 'Self-Harm',
    value: 'bpdSelfHarm',
  },
]

const BpdBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccBpd"
    />
  )
}

export { BpdBlock }
