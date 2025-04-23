const PATIENT_MEDICATIONS_TABLE_PAGE_SIZE = 20
const CURRENT_MEDICATIONS_TAB = 'currentMedications'
const HOME_MEDICATIONS_TAB = 'homeMedications'
const PATIENT_MEDICATIONS_LIST_OPTION_SIZE = 20

const EXTERNAL_MEDICATIONS_TAB = 'externalMedications'
const STATUS_CODESET = [
  {
    label: 'Active',
    value: '1',
  },
  {
    label: 'Archived',
    value: '2',
  },
  {
    label: 'Cancelled',
    value: '3',
  },

  {
    label: 'Discontinued',
    value: '4',
  },

  {
    label: 'Awaiting Approval',
    value: '5',
  },

  {
    label: 'Current Medication',
    value: '6',
  },
]
const OPTIONS = [
  { value: 'food_intolerance', label: 'Food Intolerance' },
  { value: 'food_allergy', label: 'Food Allergy' },
  { value: 'drug_allergy', label: 'Drug Allergy' },
  { value: 'drug_intolerance', label: 'Drug Intolerance' },
]
const REFILLOPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]
export {
  PATIENT_MEDICATIONS_TABLE_PAGE_SIZE,
  CURRENT_MEDICATIONS_TAB,
  HOME_MEDICATIONS_TAB,
  EXTERNAL_MEDICATIONS_TAB,
  STATUS_CODESET,
  OPTIONS,
  PATIENT_MEDICATIONS_LIST_OPTION_SIZE,
  REFILLOPTIONS,
}
