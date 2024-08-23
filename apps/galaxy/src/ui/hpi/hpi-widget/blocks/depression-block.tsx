import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'depression'

const BLOCK_TITLE = 'Depression'

const BLOCK_OPTIONS = [
  {
    label: 'Low Mood',
    value: 'lowMood',
  },
  {
    label: 'Sleep Concerns',
    value: 'sleepConcerns',
  },
  {
    label: 'Low Interest',
    value: 'lowInterest',
  },
  {
    label: 'Guilt',
    value: 'guilt',
  },
  {
    label: 'Poor Energy',
    value: 'poorEnergy',
  },
  {
    label: 'Poor Concentration',
    value: 'poorConcentration',
  },
  {
    label: 'Poor Motivation',
    value: 'poorMotivation',
  },
  {
    label: 'Appetite Concerns',
    value: 'appetiteConcerns',
  },
  {
    label: 'Hopeless',
    value: 'hopeless',
  },
  {
    label: 'Slowing',
    value: 'slowing',
  },
  {
    label: 'Agitation',
    value: 'agitation',
  },
  {
    label: 'Suicidal Thoughts',
    value: 'suicidalThoughts',
  },
  {
    label: 'Anger',
    value: 'anger',
  },
]

const DepressionBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { DepressionBlock }
