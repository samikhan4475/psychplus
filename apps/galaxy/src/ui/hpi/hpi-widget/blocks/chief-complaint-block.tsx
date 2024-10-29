import { DetailsType, GroupSelectSection } from '@/components'

const BLOCK_ID = 'chiefComplaint'

const BLOCK_TITLE = 'Chief Complaint'

const BLOCK_OPTIONS = [
  {
    label: 'Depression',
    value: 'ccDepression',
    fieldName: 'depression',
  },
  {
    label: 'Anxiety',
    value: 'ccAnxiety',
    fieldName: 'anxiety',
  },
  {
    label: 'Bipolar/Mania',
    value: 'ccBipolar/Mania',
    fieldName: 'bipolarMania',
  },
  {
    label: 'PTSD',
    value: 'ccPtsd',
    fieldName: 'ptsd',
  },
  {
    label: 'Obsession/Ocd',
    value: 'ccObsession',
    fieldName: 'obsession',
  },
  {
    label: 'BPD',
    value: 'ccBpd',
    fieldName: 'bpd',
  },
  {
    label: 'Substance',
    value: 'ccSubstance',
    fieldName: 'substance',
  },
  {
    label: 'ADHD Inattentive',
    value: 'ccAdhdi',
    fieldName: 'adhdInattentive',
  },
  {
    label: 'ADHD Hyperactive',
    value: 'ccAdhdh',
    fieldName: 'adhdHyperactive',
  },
  {
    label: 'Autism',
    value: 'ccAutism',
    fieldName: 'autism',
  },
  {
    label: 'Conduct Disorder',
    value: 'ccConductDisorder',
    fieldName: 'conductDisorder',
  },
  {
    label: 'Dementia',
    value: 'ccDementia',
    fieldName: 'dementia',
  },
  {
    label: 'Schizophrenia',
    value: 'ccSchizophrenia',
    fieldName: 'schizophrenia',
  },
  {
    label: 'Medication SE',
    value: 'ccMedicationSe',
    fieldName: 'medicationSe',
  },

  {
    label: 'Other',
    value: 'ccOther',
    details: {
      type: 'text' as DetailsType,
      label: 'Details',
      field: 'ccOtherDetails',
    },
  },
]

const ChiefComplaintBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      hasChild
    />
  )
}

export { ChiefComplaintBlock }
