import { useFormContext } from 'react-hook-form'
import {
  DetailsType,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const BLOCK_ID = 'medicationSe'

const BLOCK_TITLE = 'Medication SE'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'GI Upset', value: 'medGiUpset' },
  { label: 'Sexual SE', value: 'medSexualSe' },
  { label: 'Weight Gain', value: 'medWeightGain' },
  { label: 'Headache', value: 'medHeadache' },
  { label: 'Rash', value: 'medRash' },
  { label: 'Hair loss', value: 'medHairLoss' },
  { label: 'Dystonia', value: 'medDystonia' },
  { label: 'Akathesia', value: 'medAkathesia' },
  { label: 'Tardive Dyskinesia', value: 'medTardiveDyskinesia' },
  { label: 'Blurred Vision', value: 'medBlurredVision' },
  { label: 'Drowsiness', value: 'medDrowsiness' },
  { label: 'Dizzy', value: 'medDizzy' },
  {
    label: 'Other',
    value: 'medOther',
    details: {
      type: 'text' as DetailsType,
      field: 'medOtherDetails',
      maxLength: 500,
    },
  },
]

const MedicationSeBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  const error = form.formState?.errors
  const hasError = error?.hpiOther || error?.chiefComplaint

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // parentField="chiefComplaint"
      // valueInParent="ccMedicationSe"
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { MedicationSeBlock }
