import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'affect'

const BLOCK_TITLE = 'Affect'

const BLOCK_OPTIONS = [
  {
    label: 'Mood-congruent',
    value: 'moodCongruent',
  },
  {
    label: 'Mood-incongruent',
    value: 'moodIncongruent',
  },
  {
    label: 'Intense',
    value: 'intense',
  },
  {
    label: 'Restricted',
    value: 'restricted',
  },
  {
    label: 'Blunted',
    value: 'blunted',
  },
  {
    label: 'Flat',
    value: 'flat',
  },
  {
    label: 'Labile',
    value: 'labile',
  },
  {
    label: 'Guarded',
    value: 'guarded',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const AffectBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AffectBlock }
