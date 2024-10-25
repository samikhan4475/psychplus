const ALCOHOL_ID = 'alcohol'
const ALCOHOL_LABEL = 'Alcohol'
const DRUGS_ID = 'drugs'
const DRUGS_LABEL = 'Drugs'
const DRUGS_DESCRIPTION =
  'In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons?'
const QUESTIONNAIRE_ID = 'questionnaire'
const QUESTIONNAIRE_LABEL = 'Questionnaire'
const QUESTIONNAIRE_DESCRIPTION = 'Pt was agreeable to detailed assessment?'
const TOBACCO_ID = 'tobacco'
const TOBACCO_LABEL = 'Tobacco'
const TOBACCO_CHEW_SMOKE_ID = 'tobaccoChewSmoke'
const SMOKE_PACKS_ID = 'smokePacks'
const SMOKE_PACKS_LABEL = 'Packs a day'

const TOBACCO_CHEW_SMOKE_OPTIONS = [
  { label: 'Chew', value: 'chew' },
  { label: 'Smoke', value: 'smoke' },
]
const SMOKE_PACKS_OPTIONS = [
  { label: '0.5', value: '0.5' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
]

const SMOKING_CESSATION_OPTIONS = [
  { label: 'Nicotine Replacement', value: 'nicotine' },
  { label: 'Wellbutrin', value: 'wellbutrin' },
  { label: 'Chantix', value: 'Chantix' },
  { label: 'Patient Refused', value: 'patientRefused' },
  { label: 'Counseling', value: 'counseling' },
]

const COUNSELING_OPTIONS = [
  { label: 'Individual Counseling', value: 'individual' },
  { label: 'Group counseling', value: 'group' },
  { label: 'Online Program', value: 'online' },
  { label: '1-800-QUIT-NOW', value: 'quitNow' },
  { label: 'Patient Refused', value: 'patientRefused' },
]

const DRUG_DETAILS_OPTIONS = [
  {
    label: 'Opioids',
    field: 'opioids',
    detailsField: 'opioidsDetails',
  },
  {
    label: 'Sedative',
    field: 'sedative',
    detailsField: 'sedativeDetails',
  },
  {
    label: 'Cocaine',
    field: 'cocaine',
    detailsField: 'cocaineDetails',
  },
  {
    label: 'Amphetamine',
    field: 'amphetamine',
    detailsField: 'amphetamineDetails',
  },
  {
    label: 'PCP',
    field: 'pcp',
    detailsField: 'pcpDetails',
  },
  {
    label: 'Inhalants',
    field: 'inhalants',
    detailsField: 'inhalantsDetails',
  },
]

const REFFERAL_TREATMENT_OPTIONS = [
  { label: 'Detox', value: 'Detox' },
  { label: 'Residential', value: 'residential' },
  { label: 'Online Program', value: 'online' },
  { label: 'Alcohol Anonymous', value: 'alcohol' },
  { label: 'Narcotics Anonymous', value: 'narcotics' },
  { label: 'Outpatient Therapy', value: 'outpatientTherapy' },
  { label: 'Medications', value: 'medications' },
]

export {
  ALCOHOL_ID,
  ALCOHOL_LABEL,
  DRUGS_ID,
  DRUGS_LABEL,
  DRUGS_DESCRIPTION,
  QUESTIONNAIRE_ID,
  QUESTIONNAIRE_LABEL,
  QUESTIONNAIRE_DESCRIPTION,
  TOBACCO_ID,
  TOBACCO_LABEL,
  TOBACCO_CHEW_SMOKE_ID,
  TOBACCO_CHEW_SMOKE_OPTIONS,
  SMOKE_PACKS_ID,
  SMOKE_PACKS_LABEL,
  SMOKE_PACKS_OPTIONS,
  SMOKING_CESSATION_OPTIONS,
  COUNSELING_OPTIONS,
  DRUG_DETAILS_OPTIONS,
  REFFERAL_TREATMENT_OPTIONS,
}
