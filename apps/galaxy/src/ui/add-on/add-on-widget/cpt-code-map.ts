import { CodesWidgetItem, CptCodeKeys } from '@/types'

const addOnCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90785' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '96372' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90833' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90836' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90838' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90837' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90845' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90833*1' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90836*1' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '90838*1' },
]

const theratimeSpentCodes = {
  timeRangeOne: '90833',
  timeRangeTwo: '90836',
  timeRangeThree: '90838',
}

const theratimeSpentCodes1 = {
  timeRangeOne: '90833*1',
  timeRangeTwo: '90836*1',
  timeRangeThree: '90838*1',
}
const therapyPsychoanalysisCodes = { psychoanalysis: '90845' }
const defaultCptCodeMap = {
  injection: '96372',
  therapyTimeSpent: theratimeSpentCodes,
  therapyPsychoanalysis: therapyPsychoanalysisCodes,
}

const getCptCodeMap = (visitType: string) => {
  let cptCodeMap: {
    injection?: string
    therapyTimeSpent?: Record<string, string>
    therapyPsychoanalysis?: Record<string, string>
    ect?: string
    interactiveComplexity?: string
  } = {}

  switch (visitType) {
    case 'EdVisit':
      cptCodeMap = {
        therapyTimeSpent: theratimeSpentCodes,
        therapyPsychoanalysis: therapyPsychoanalysisCodes,
      }
      break
    case 'HospitalCare':
    case 'NursingHomeCare':
    case 'PhpCare':
      cptCodeMap = {
        ...defaultCptCodeMap,
        ect: '90837',
      }
      break
    case 'IndividualPsychotherapy':
    case 'FamilyPsychotherapy':
      cptCodeMap = {
        interactiveComplexity: '90785',
      }
      break
    case 'Spravato':
      cptCodeMap = {
        therapyTimeSpent: theratimeSpentCodes1,
      }
      break
    case 'Tms':
    case 'Ect':
      cptCodeMap = {}
      break
    default:
      cptCodeMap = defaultCptCodeMap
      break
  }
  return cptCodeMap
}

export { addOnCodes, getCptCodeMap }
