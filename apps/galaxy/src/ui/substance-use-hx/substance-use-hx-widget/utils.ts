import { CodesWidgetItem, CptCodeKeys } from '@/types'

const substanceCptCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99406' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99407' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99408' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99409' },
]

const cptCodeMap = {
  smokingCessationDiscussionDuration: {
    '≥ 3 mins': '99406',
    '≥ 11 mins': '99407',
  },
  alcoholSubstanceCessationDiscussionDuration: {
    '≥ 15 mins': '99408',
    '≥ 31 mins': '99409',
  },
  tobacco: { yes: '99406' },
}

const cptCodeKeysToWatch = [
  'smokingCessationDiscussionDuration',
  'alcoholSubstanceCessationDiscussionDuration',
]

const getInitialValues = () => ({
  widgetContainerCheckboxField: undefined,
  tobacco: undefined,
  tobaccoChewSmoke: undefined,
  smokePacks: undefined,
  smokingCessationOption: undefined,
  counselingOption: undefined,
  smokingCessationDiscussionDuration: undefined,
  otherTobacco: undefined,
  alcohol: undefined,
  drugs: undefined,
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
  questionnaire: undefined,
  briefIntervention: undefined,
  briefInterventionDetail: undefined,
  referralTreatment: undefined,
  alcoholSubstanceCessationDiscussionDuration: undefined,
  otherAlcoholDrugs: '',
})

export { substanceCptCodes, cptCodeMap, cptCodeKeysToWatch, getInitialValues }
