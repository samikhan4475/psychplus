import { DetailsType, GroupSelectSection } from '@/components'

const BLOCK_ID = 'medicationSe'

const BLOCK_TITLE = 'Medication SE'

const BLOCK_OPTIONS = [
  { label: 'GI Upset', value: 'medGiUpset' },
  { label: 'Sexual SE', value: 'medSexualSe' },
  { label: 'Weight Gain', value: 'medWeightGain' },
  { label: 'Headache', value: 'medHeadache' },
  { label: 'Rash', value: 'medRash' },
  { label: 'Hair Loss', value: 'medHairLoss' },
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
      label: 'Details',
      field: 'medOtherDetails',
    },
  },
]

const MedicationSeBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccMedicationSe"
    />
  )
}

export { MedicationSeBlock }
