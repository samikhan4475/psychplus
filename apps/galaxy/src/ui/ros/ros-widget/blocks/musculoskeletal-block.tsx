import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'musculoskeletal'

const BLOCK_TITLE = 'Musculoskeletal'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Myalgias',
    value: 'myalgias',
  },
  {
    label: 'Joint/musicle stiffness',
    value: 'jointMuscleStiffness',
  },
  {
    label: 'Breast changes',
    value: 'breastChanges',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const MusculoskeletalBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { MusculoskeletalBlock }
