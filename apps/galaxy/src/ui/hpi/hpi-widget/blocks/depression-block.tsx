import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'depression'

const BLOCK_TITLE = 'Depression'

const BLOCK_OPTIONS = [
  { label: 'Low Mood', value: 'depLowMood' },
  { label: 'Sleep Concerns', value: 'depSleepConcerns' },
  { label: 'Low Interest', value: 'depLowInterest' },
  { label: 'Guilt', value: 'depGuilt' },
  { label: 'Poor Energy', value: 'depPoorEnergy' },
  { label: 'Poor Concentration', value: 'depPoorConcentration' },
  { label: 'Poor Motivation', value: 'depPoorMotivation' },
  { label: 'Appetite Concerns', value: 'depAppetiteConcerns' },
  { label: 'Hopeless', value: 'depHopeless' },
  { label: 'Slowing', value: 'depSlowing' },
  { label: 'Agitation', value: 'depAgitation' },
  { label: 'Suicidal Thoughts', value: 'depSuicidalThoughts' },
  { label: 'Anger', value: 'depAnger' },
]

const DepressionBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccDepression"
    />
  )
}

export { DepressionBlock }
