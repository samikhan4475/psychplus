import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'medicationSe'

const BLOCK_TITLE = 'Medication SE'

const BLOCK_OPTIONS = [
  {
    label: 'GI Upset',
    value: 'giUpset',
  },
  {
    label: 'Sexual SE',
    value: 'sexualSe',
  },
  {
    label: 'Weight Gain',
    value: 'weightGain',
  },
  {
    label: 'Headache',
    value: 'headache',
  },
  {
    label: 'Rash',
    value: 'rash',
  },
  {
    label: 'Hairloss',
    value: 'hairloss',
  },
  {
    label: 'Dystonia',
    value: 'dystonia',
  },
  {
    label: 'Akathesia',
    value: 'akathesia',
  },
  {
    label: 'Tardive Dyskinesia',
    value: 'tardiveDyskinesia',
  },
  {
    label: 'Blurred Vision',
    value: 'blurredVision',
  },
  {
    label: 'Drowsiness',
    value: 'drowsiness',
  },
  {
    label: 'Dizzy',
    value: 'dizzy',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const MedicationSeBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { MedicationSeBlock }
