const DRUGS_ID = 'drugs'
const ALCOHOL_LABEL = 'Alcohol'
const SMOKE_PACKS_ID = 'smokePacks'
const ALCOHOL_ID = 'alcohol'
const DRUGS_DESCRIPTION =
'In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons?'
const TOBACCO_CHEW_SMOKE_ID = 'tobaccoChewSmoke'
const TOBACCO_ID = 'tobacco'
const DRUGS_LABEL = 'Drugs'
const TOBACCO_LABEL = 'Tobacco:'

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]



const SMOKE_PACKS_OPTIONS = [
  { label: '0.5', value: '0.5' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
]

const TOBACCO_CHEW_SMOKE_OPTIONS = [
  { label: 'Chew', value: 'chew' },
  { label: 'Smoke', value: 'smoke' },
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
}
