import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'obsession'

const BLOCK_TITLE = 'Obsession/OCD (Obsessive Compulsive Disorder)'

const BLOCK_OPTIONS = [
  { label: 'Contamination', value: 'obsContamination' },
  { label: 'Doubt', value: 'obsDoubt' },
  { label: 'Somatic', value: 'obsSomatic' },
  { label: 'Aggression', value: 'obsAggression' },
  { label: 'Sexual', value: 'obsSexual' },
  { label: 'Checking', value: 'obsChecking' },
  { label: 'Washing', value: 'obsWashing' },
  { label: 'Counting', value: 'obsCounting' },
  { label: 'Hoarding', value: 'obsHoarding' },
  { label: 'Picking', value: 'obsPicking' },
]

const ObsessionBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccObsession"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { ObsessionBlock }
