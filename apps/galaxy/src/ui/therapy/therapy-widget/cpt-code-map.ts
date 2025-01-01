import { CodesWidgetItem, CptCodeKeys } from '@/types'

const addOnCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90846' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90847' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90832' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90834' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90837' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '90791' },
]

const getCptCodeMap = (visitType: string, visitSequence: string) => {
  let cptCodeMap = {}
  switch (visitType) {
    case 'IndividualPsychotherapy':
      if (visitSequence === 'New') {
        cptCodeMap = '90791'
        break
      }
      cptCodeMap = {
        therapyTimeSpent: {
          timeRangeOne: '90832',
          timeRangeTwo: '90834',
          timeRangeThree: '90837',
        },
      }
      break
    case 'FamilyPsychotherapy':
      cptCodeMap = {
        therapySessionParticipants: {
          FamilyWithOutPatientPresent: '90846',
          FamilyWithPatientPresent: '90847',
        },
      }
      break

    default:
      break
  }
  return cptCodeMap
}

export { addOnCodes, getCptCodeMap }
