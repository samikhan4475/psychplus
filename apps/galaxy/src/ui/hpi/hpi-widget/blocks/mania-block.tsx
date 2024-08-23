import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'mania'

const BLOCK_TITLE = 'Mania'

const BLOCK_OPTIONS = [
  {
    label: 'Elevated Mood',
    value: 'elevatedMood',
  },
  {
    label: 'Distractibility',
    value: 'distractibility',
  },
  {
    label: 'Goal Directed',
    value: 'goalDirected',
  },
  {
    label: 'Grandiose Delusions',
    value: 'grandioseDelusions',
  },
  {
    label: 'Flight of ideas',
    value: 'flightOfIdeas',
  },
  {
    label: 'Lack of Sleep',
    value: 'lackOfSleep',
  },
  {
    label: 'Pressured Speech',
    value: 'pressuredSpeech',
  },
  {
    label: 'Impulsive/Reckless Behavior',
    value: 'impulsiveRecklessBehavior',
  },
]

const ManiaBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ManiaBlock }
