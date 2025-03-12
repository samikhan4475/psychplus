const ALCOHOL_ID = 'alcohol'
const ALCOHOL_LABEL = 'Alcohol'
const DRUGS_ID = 'drugs'
const DRUGS_LABEL = 'Drugs'
const DRUGS_DESCRIPTION =
  'In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons?'
const TOBACCO_ID = 'tobacco'
const TOBACCO_LABEL = 'Tobacco:'
const TOBACCO_CHEW_SMOKE_ID = 'tobaccoChewSmoke'
const SMOKE_PACKS_ID = 'smokePacks'

const TOBACCO_CHEW_SMOKE_OPTIONS = [
  { label: 'Chew', value: 'chew' },
  { label: 'Smoke', value: 'smoke' },
]
const SMOKE_PACKS_OPTIONS = [
  { label: '0.5', value: '0.5' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
]

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const DRUG_DETAILS_OPTIONS = [
  {
    label: 'Opioids',
    detailsField: 'opioidsDetails',
    field: 'opioids',
  },
  {
    label: 'Sedative',
    detailsField: 'sedativeDetails',
    field: 'sedative',
  },
  {
    label: 'Cocaine',
    detailsField: 'cocaineDetails',
    field: 'cocaine',
  },
  {
    label: 'Amphetamine',
    detailsField: 'amphetamineDetails',
    field: 'amphetamine',
  },
  {
    label: 'PCP',
    detailsField: 'pcpDetails',
    field: 'pcp',
  },
  {
    label: 'Inhalants',
    detailsField: 'inhalantsDetails',
    field: 'inhalants',
  },
]
const PAST_PSYCH_BLOCK_OPTIONS = [
  {
    field: 'depression',
    detailsField: 'depressionAge',
    label: 'Depression',
  },
  {
    field: 'anxiety',
    detailsField: 'anxietyAge',
    label: 'Anxiety',
  },
  {
    field: 'schizophrenia',
    detailsField: 'schizophreniaAge',
    label: 'Schizophrenia',
  },
  {
    field: 'bipolar',
    detailsField: 'bipolarAge',
    label: 'Bipolar',
  },
  {
    field: 'disorder',
    detailsField: 'disorderAge',
    label: 'Disorder',
  },
  {
    field: 'obsessiveThinking',
    detailsField: 'obsessiveThinkingAge',
    label: 'Obsessive Thinking',
  },
  {
    field: 'compulsiveBehavior',
    detailsField: 'compulsiveBehaviorAge',
    label: 'Compulsive Behavior',
  },
  {
    field: 'adhd',
    detailsField: 'adhdAge',
    label: 'ADHD',
  },
  {
    field: 'autism',
    detailsField: 'autismAge',
    label: 'Autism',
  },
  {
    field: 'eatingDisorder',
    detailsField: 'eatingDisorderAge',
    label: 'Eating Disorder',
  },
  {
    field: 'exposureToTrauma',
    detailsField: 'exposureToTraumaAge',
    label: 'Exposure to Trauma',
  },
  {
    field: 'cuttingSelfHarmBehavior',
    detailsField: 'cuttingSelfHarmBehaviorAge',
    label: 'Cutting/Self-Harm Behavior',
  },
  {
    field: 'problemsWithSleep',
    detailsField: 'problemsWithSleepAge',
    label: 'Problems with Sleep',
  },
  {
    field: 'panicAttacks',
    detailsField: 'panicAttacksAge',
    label: 'Panic Attacks',
  },
  {
    field: 'dementia',
    detailsField: 'dementiaAge',
    label: 'Dementia',
  },
  {
    field: 'personalityDisorder',
    detailsField: 'personalityDisorderAge',
    label: 'Personality Disorder',
  },
  {
    field: 'intellectualDisability',
    detailsField: 'intellectualDisabilityAge',
    label: 'Intellectual Disability',
  },
  {
    field: 'other',
    detailsField: 'otherDetails',
    label: 'Other',
  },
]
export {
  ALCOHOL_ID,
  ALCOHOL_LABEL,
  DRUGS_ID,
  DRUGS_LABEL,
  DRUGS_DESCRIPTION,
  TOBACCO_ID,
  TOBACCO_LABEL,
  TOBACCO_CHEW_SMOKE_ID,
  TOBACCO_CHEW_SMOKE_OPTIONS,
  SMOKE_PACKS_ID,
  SMOKE_PACKS_OPTIONS,
  DRUG_DETAILS_OPTIONS,
  YES_NO_OPTIONS,
  PAST_PSYCH_BLOCK_OPTIONS,
}

