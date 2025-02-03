import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'anxiety'

const BLOCK_TITLE = 'Anxiety'

const BLOCK_OPTIONS = [
  {
    label: 'Feeling Anxious',
    value: 'anxFeelingAnxious',
  },
  {
    label: 'Worrying',
    value: 'anxWorrying',
  },
  {
    label: 'Restless',
    value: 'anxRestless',
  },
  {
    label: 'Fatigue',
    value: 'anxFatigue',
  },
  {
    label: 'Muscle Tension',
    value: 'anxMuscleTension',
  },
  {
    label: 'Irritable',
    value: 'anxIrritable',
  },
  {
    label: 'Social Anxiety',
    value: 'anxSocialAnxiety',
  },
  {
    label: 'Panic Attacks',
    value: 'anxPanicAttacks',
  },
  {
    label: 'Phobia',
    value: 'anxPhobia',
  },
  {
    label: 'Abnormal Fear',
    value: 'anxAbnormalFear',
  },
]

const AnxietyBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccAnxiety"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { AnxietyBlock }
