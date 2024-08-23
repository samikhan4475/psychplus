import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'orientation'

const BLOCK_TITLE = 'Orientation'

const BLOCK_OPTIONS = [
  {
    label: 'Casual dress',
    value: 'casualDress',
  },
  {
    label: 'Disheveled',
    value: 'disheveled',
  },
  {
    label: 'Bad odor',
    value: 'badOdor',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const AppearanceBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AppearanceBlock }
