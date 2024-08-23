import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'neuro'

const BLOCK_TITLE = 'Neuro'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Weakness',
    value: 'weakness',
  },
  {
    label: 'Paresthesia',
    value: 'paresthesia',
  },
  {
    label: 'Dizziness',
    value: 'dizziness',
  },
  {
    label: 'Headache',
    value: 'headache',
  },
  {
    label: 'Recent falls',
    value: 'recentFalls',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const NeuroBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { NeuroBlock }
