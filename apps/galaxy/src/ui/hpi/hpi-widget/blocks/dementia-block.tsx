import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'dementia'

const BLOCK_TITLE = 'Dementia'

const BLOCK_OPTIONS = [
  { label: 'Memory Loss', value: 'demMemoryLoss' },
  { label: 'Confusion', value: 'demConfusion' },
  {
    label: 'Difficulty with Activities of Daily Living',
    value: 'demDifficultyWithAdls',
  },
  { label: 'Wandering', value: 'demWandering' },
  { label: 'Agitation', value: 'demAgitation' },
  { label: 'Auditory Hallucinations', value: 'demAh' },
  { label: 'Visual Hallucinations', value: 'demVh' },
  { label: 'Parkinson Symptoms', value: 'demParkinsonSymptoms' },
]

const DementiaBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      valueInParent="ccDementia"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { DementiaBlock }
