import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'constitutional'

const BLOCK_TITLE = 'Constitutional'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Weight change',
    value: 'weightChange',
  },
  {
    label: 'Fever',
    value: 'fever',
  },
  {
    label: 'Chills',
    value: 'chills',
  },
  {
    label: 'Fatigue',
    value: 'fatigue',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const ConstitutionalBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ConstitutionalBlock }
