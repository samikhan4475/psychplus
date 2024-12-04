import { CodesWidgetItem, CptCodeKeys } from '@/types'

const addOnCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '96372' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90833' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90836' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90838' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90845' },
]

const cptCodeMap = {
  injection: '96372',
  therapyTimeSpent: {
    timeRangeOne: '90833',
    timeRangeTwo: '90836',
    timeRangeThree: '90838',
  },
  therapyPsychoanalysis: { psychoanalysis: '90845' },
}

export { addOnCodes, cptCodeMap }
