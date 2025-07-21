import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'bipolarMania'

const BLOCK_TITLE = 'Bipolar/Mania'

const BLOCK_OPTIONS = [
  { label: 'Elevated Mood', value: 'manElevatedMood' },
  { label: 'Distractibility', value: 'manDistractibility' },
  { label: 'Goal Directed', value: 'manGoalDirected' },
  { label: 'Grandiose Delusions', value: 'manGrandioseDelusions' },
  { label: 'Flight of ideas', value: 'manFlightOfIdeas' },
  { label: 'Lack of Sleep', value: 'manLackOfSleep' },
  { label: 'Pressured Speech', value: 'manPressuredSpeech' },
  {
    label: 'Impulsive/Reckless Behavior',
    value: 'manImpulsiveRecklessBehavior',
  },
]

const BipolarManiaBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccBipolar/Mania"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { BipolarManiaBlock }
