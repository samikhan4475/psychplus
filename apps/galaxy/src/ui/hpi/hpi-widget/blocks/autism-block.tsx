import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'autism'

const BLOCK_TITLE = 'Autism'

const BLOCK_OPTIONS = [
  { label: 'Delayed Milestones', value: 'autDelayedMilestones' },
  { label: 'Repetitive/Restrictive Behaviors', value: 'autRepetitive' },
  { label: 'Regression', value: 'autRegression' },
  { label: 'Social/Communication Issues', value: 'autSocial' },
  { label: 'Aversions/Special Interests', value: 'autAversions' },
  { label: 'Masking', value: 'autMasking' },
  { label: 'Emotional Dysregulations', value: 'autEmotionalDysregulation' },
]

const AutismBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      valueInParent="ccAutism"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { AutismBlock }
