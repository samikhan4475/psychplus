import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'adhdHyperactive'

const BLOCK_TITLE = 'ADHD Hyperactive'

const BLOCK_OPTIONS = [
  {
    label: 'Fidgeting',
    value: 'adhFidgeting',
  },
  {
    label: 'Leaves Assigned Space',
    value: 'adhLeavesAssignedSpace',
  },
  {
    label: 'Restless',
    value: 'adhRestless',
  },
  {
    label: 'Hard to Enjoy Relaxing',
    value: 'adhHardToEnjoyRelaxing',
  },
  {
    label: 'On the Go',
    value: 'adhOnTheGo',
  },
  {
    label: 'Excessive Talking',
    value: 'adhExcessiveTalking',
  },
  {
    label: 'Blurt Out Answers',
    value: 'adhBlurtsOutAnswers',
  },
  {
    label: 'Impatient',
    value: 'adhImpatient',
  },
  {
    label: 'Interrupts',
    value: 'adhInterrupts',
  },
  {
    label: 'Behavior Outbursts',
    value: 'adhBehaviorOutbursts',
  },
]

const AdhdHyperactiveBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccAdhdh"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { AdhdHyperactiveBlock }
