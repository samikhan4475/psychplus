import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'
import { createBlockOptions } from '../utils'

const BLOCK_ID = 'adhdHyperactive'

const BLOCK_TITLE = 'ADHD Hyperactive'

const ADHD_OPTIONS = createBlockOptions([
  ['Fidgeting', 'adhFidgeting'],
  ['Leaves Assigned Space', 'adhLeavesAssignedSpace'],
  ['Restless', 'adhRestless'],
  ['Hard to Enjoy Relaxing', 'adhHardToEnjoyRelaxing'],
  ['On the Go', 'adhOnTheGo'],
  ['Excessive Talking', 'adhExcessiveTalking'],
  ['Blurt Out Answers', 'adhBlurtsOutAnswers'],
  ['Impatient', 'adhImpatient'],
  ['Interrupts', 'adhInterrupts'],
  ['Behavior Outbursts', 'adhBehaviorOutbursts'],
  [
    'Other',
    'adhdhOther',
    {
      type: 'text' as DetailsType,
      field: 'adhdhOtherDetails',
      maxLength: 500,
    },
  ],
])

const AdhdHyperactiveBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={ADHD_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccAdhdh"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { AdhdHyperactiveBlock }
