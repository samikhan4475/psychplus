import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { DetailsType, GroupSelectSection } from '@/components'
import { INTELLECTUAL_IMPAIRMENT_OPTIONS } from '../constants'
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
  {
    label: 'Intellectual Impairment',
    value: 'autIntellectualImpairment',
    details: {
      type: 'select' as DetailsType,
      hideSelectedCount: true,
      label: 'Severity',
      options: INTELLECTUAL_IMPAIRMENT_OPTIONS,
      isOptionsChip: true,
      field: 'autismIntellectualImpairmentValue',
    },
  },
  {
    label: 'Other',
    value: 'autOther',
    details: {
      type: 'text' as DetailsType,
      field: 'autOtherDetails',
      maxLength: 500,
    },
  },
]

const AutismBlock = ({ disabled = false }: { disabled?: boolean }) => {
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<HpiWidgetSchemaType>()

  const hasError = errors?.hpiOther || errors?.chiefComplaint
  const autismValues = watch('autism')
  useEffect(() => {
    if (!autismValues.length) {
      setValue('autismIntellectualImpairmentValue', '')
    }
  }, [autismValues, getValues, setValue])

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccAutism"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      disabled={disabled}
    />
  )
}

export { AutismBlock }
