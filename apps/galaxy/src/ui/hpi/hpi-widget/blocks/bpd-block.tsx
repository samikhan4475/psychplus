import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'
import { createBlockOptions } from '../utils'

const BLOCK_ID = 'bpd'

const BLOCK_TITLE = 'BPD (Borderline Personality Disorder)'

const BPD_OPTIONS = createBlockOptions([
  ['Fear of Abandonment', 'bpdFearOfAbandonment'],
  ['Unstable Self-Image', 'bpdUnstableSelfImage'],
  ['Unstable Relationships', 'bpdUnstableRelationships'],
  ['Mood Swings', 'bpdMoodSwings'],
  ['Black/White Thinking', 'bpdBlackWhiteThinking'],
  ['Impulsiveness', 'bpdImpulsiveness'],
  ['Self-Harm', 'bpdSelfHarm'],
  [
    'Other',
    'bpdOther',
    {
      type: 'text' as DetailsType,
      field: 'bpdOtherDetails',
      maxLength: 500,
    },
  ],
])

const BpdBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BPD_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccBpd"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { BpdBlock }
