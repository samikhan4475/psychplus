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

export { substanceCptCodes, cptCodeMap }
