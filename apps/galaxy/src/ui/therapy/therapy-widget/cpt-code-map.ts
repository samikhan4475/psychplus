import { CodesWidgetItem, CptCodeKeys } from '@/types'

const addOnCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90833' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90836' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90838' },
]

const getCptCodeMap = () => {
  return {
    therapyTimeSpent: {
      timeRangeOne: '90833',
      timeRangeTwo: '90836',
      timeRangeThree: '90838',
    },
  }
}

export { addOnCodes, getCptCodeMap }
