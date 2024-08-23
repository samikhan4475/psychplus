import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'eyes'

const BLOCK_TITLE = 'Eyes'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Eye pain',
    value: 'eyePain',
  },
  {
    label: 'Redness',
    value: 'redness',
  },
  {
    label: 'Discharge',
    value: 'discharge',
  },
  {
    label: 'Vision changes',
    value: 'visionChanges',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const EyesBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { EyesBlock }
