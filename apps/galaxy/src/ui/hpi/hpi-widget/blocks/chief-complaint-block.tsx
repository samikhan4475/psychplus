import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'chiefComplaint'

const BLOCK_TITLE = 'Chief Complaint'

const BLOCK_OPTIONS = [
  {
    label: 'Depression',
    value: 'ccDepression',
  },
  {
    label: 'Anxiety',
    value: 'ccAnxiety',
  },
  {
    label: 'ADHD',
    value: 'ccAdhd',
  },
  {
    label: 'Dementia',
    value: 'ccDementia',
  },
  {
    label: 'OCD',
    value: 'ccOcd',
  },
  {
    label: 'PTSD',
    value: 'ccPtsd',
  },
  {
    label: 'Bipolar',
    value: 'ccBipolar',
  },
  {
    label: 'Schizophrenia',
    value: 'ccSchizophrenia',
  },
  {
    label: 'Substance',
    value: 'ccSubstance',
  },
  {
    label: 'Substance User',
    value: 'ccSubstanceUser',
  },
  {
    label: 'Other',
    value: 'ccOther',
  },
]

const ChiefComplaintBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ChiefComplaintBlock }
