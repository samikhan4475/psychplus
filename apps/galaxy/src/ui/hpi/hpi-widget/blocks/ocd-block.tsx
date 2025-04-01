import { useFormContext } from 'react-hook-form'
import { GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'ocd'

const BLOCK_TITLE = 'OCD (Obsessive-compulsive disorder)'

const BLOCK_OPTIONS = [
  { label: 'Checking', value: 'ocdChecking' },
  { label: 'Washing', value: 'ocdWashing' },
  { label: 'Counting', value: 'ocdCounting' },
  { label: 'Hoarding', value: 'ocdHoarding' },
  { label: 'Picking', value: 'ocdPicking' },
]

const OcdBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccOcd"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { OcdBlock }
