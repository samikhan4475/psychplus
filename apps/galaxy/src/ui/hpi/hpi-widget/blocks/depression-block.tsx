import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

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
  { label: 'Suicidal Ideation', value: 'depSuicidalThoughts' },
  { label: 'Anger', value: 'depAnger' },
]

const DepressionBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccDepression"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { DepressionBlock }
