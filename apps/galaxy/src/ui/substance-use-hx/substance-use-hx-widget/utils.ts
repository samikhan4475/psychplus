import { CodesWidgetItem, CptCodeKeys } from '@/types'

const substanceCptCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99406' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99407' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99408' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99409' },
]

const cptCodeMap = {
  smokingCessationDiscussionDuration: { '>=3m': '99406', '>=11m': '99407' },
  alcoholSubstanceCessationDiscussionDuration: {
    '>=15m': '99408',
    '>=31m': '99409',
  },
  tobacco: { yes: '99406' },
}

const cptCodeKeysToWatch = [
  'smokingCessationDiscussionDuration',
  'alcoholSubstanceCessationDiscussionDuration',
]

const getInitialValues = () => ({
  widgetContainerCheckboxField: undefined,
  tobacco: null,
  tobaccoChewSmoke: undefined,
  smokePacks: undefined,
  smokingCessationOption: undefined,
  counselingOption: undefined,
  smokingCessationDiscussionDuration: undefined,
  otherTobacco: undefined,
  alcohol: null,
  drugs: null,
  opioids: undefined,
  opioidsDetails: undefined,
  sedative: undefined,
  sedativeDetails: undefined,
  cocaine: undefined,
  cocaineDetails: undefined,
  amphetamine: undefined,
  amphetamineDetails: undefined,
  pcp: undefined,
  pcpDetails: undefined,
  inhalants: undefined,
  inhalantsDetails: undefined,
  questionnaire: null,
  briefIntervention: undefined,
  referralTreatment: undefined,
  alcoholSubstanceCessationDiscussionDuration: undefined,
  otherAlcoholDrugs: null,
})

export { substanceCptCodes, cptCodeMap, cptCodeKeysToWatch, getInitialValues }
