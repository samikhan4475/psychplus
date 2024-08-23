import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'mood'

const BLOCK_TITLE = 'Mood'

const BLOCK_OPTIONS = [
  {
    label: 'Depressed',
    value: 'depressed',
  },
  {
    label: 'Dysphoric',
    value: 'dysphoric',
  },
  {
    label: 'Anxious',
    value: 'anxious',
  },
  {
    label: 'Elevated',
    value: 'elevated',
  },
  {
    label: 'Irritable',
    value: 'irritable',
  },
  {
    label: 'Angry',
    value: 'angry',
  },
  {
    label: 'Euthymic',
    value: 'euthymic',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const MoodBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { MoodBlock }
