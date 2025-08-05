import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'
import { createBlockOptions } from '../utils'

const BLOCK_ID = 'anxiety'

const BLOCK_TITLE = 'Anxiety'

const ANX_OPTIONS = createBlockOptions([
  ['Feeling Anxious', 'anxFeelingAnxious'],
  ['Worrying', 'anxWorrying'],
  ['Restless', 'anxRestless'],
  ['Fatigue', 'anxFatigue'],
  ['Muscle Tension', 'anxMuscleTension'],
  ['Irritable', 'anxIrritable'],
  ['Social Anxiety', 'anxSocialAnxiety'],
  ['Panic Attacks', 'anxPanicAttacks'],
  ['Phobia', 'anxPhobia'],
  ['Abnormal Fear', 'anxAbnormalFear'],
  [
    'Other',
    'anxOther',
    {
      type: 'text' as DetailsType,
      field: 'anxOtherDetails',
      maxLength: 500,
    },
  ],
])

const AnxietyBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={ANX_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccAnxiety"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { AnxietyBlock }
