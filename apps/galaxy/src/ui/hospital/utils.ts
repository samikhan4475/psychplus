import { VisitSequenceTypes } from '@/types'
import { TabsValue } from './constants'

const getHospitalTab = (visitSequence: string) => {
  if (
    visitSequence === VisitSequenceTypes.Initial ||
    visitSequence === VisitSequenceTypes.Subsequent
  ) {
    return TabsValue.Initial
  }
  if (
    visitSequence === VisitSequenceTypes.InitialDischarge ||
    visitSequence === VisitSequenceTypes.Discharge
  ) {
    return TabsValue.Discharge
  }
  return undefined
}

export { getHospitalTab }
