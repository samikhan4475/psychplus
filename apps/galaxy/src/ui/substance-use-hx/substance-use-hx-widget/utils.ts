import { CodesWidgetItem, CptCodeKeys } from '@/types'

const substanceCptCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99406' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99407' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99408' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99409' },
]

const cptCodeMap = {
  smoking: { '>=3m': '99406', default: '99407' },
  alcohol: { '>=15m': '99408', default: '99409' },
}

const cptCodeKeysToWatch = [
  'smokingCessationDiscussionDuration',
  'alcoholSubstanceCessationDiscussionDuration',
]

export { substanceCptCodes, cptCodeMap, cptCodeKeysToWatch }
