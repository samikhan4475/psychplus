const PATIENT_MEDICATIONS_TABLE_PAGE_SIZE = 1
const CURRENT_MEDICATIONS_TAB = 'currentMedications'
const HOME_MEDICATIONS_TAB = 'homeMedications'
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
    label: 'Discontinued',
    value: '4',
  },
]
const OPTIONS = [
  { value: 'food_intolerance', label: 'Food Intolerance' },
  { value: 'food_allergy', label: 'Food Allergy' },
  { value: 'drug_allergy', label: 'Drug Allergy' },
  { value: 'drug_intolerance', label: 'Drug Intolerance' },
]
export {
  PATIENT_MEDICATIONS_TABLE_PAGE_SIZE,
  CURRENT_MEDICATIONS_TAB,
  HOME_MEDICATIONS_TAB,
  EXTERNAL_MEDICATIONS_TAB,
  STATUS_CODESET,
  OPTIONS,
}
