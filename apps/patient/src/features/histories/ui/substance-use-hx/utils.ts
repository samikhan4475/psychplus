import { CodesWidgetItem, CptCodeKeys } from '@/features/codes/types'

const getInitialValues = () => ({
  completedSuicide: false,
  completedSuicideRelation: [],
  anxiety: false,
  anxietyRelation: [],
  depression: false,
  depressionRelation: [],
  ocd: false,
  cocaine: false,
  cocaineDetails: '',
  ocdRelation: [],
  bipolarDisorder: false,
  bipolarDisorderRelation: [],
  schizophrenia: false,
  schizophreniaRelation: [],
  alcoholUseDisorder: false,
  alcoholUseDisorderRelation: [],
  dementia: false,
  dementiaRelation: [],
  inhalants: false,
  inhalantsDetails: '',
  opioidsDetails:'',
  opioids: false,
  sedative: false,
  sedativeDetails: '',
  amphetamine: false,
  amphetamineDetails: '',
  pcp: false,
  pcpDetails: '',

})

const substanceCptCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99406' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99407' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99408' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99409' },
]

export { getInitialValues, substanceCptCodes }
