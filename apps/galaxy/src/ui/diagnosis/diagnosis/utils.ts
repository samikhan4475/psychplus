import { VisitSequenceTypes } from '@/types'
import { isHospitalCareVisit } from '@/utils'

const shouldDisableDiagnosisActions = (
  visitType: string,
  visitSequence: string,
): boolean => {
  if (!isHospitalCareVisit(visitType)) return false

  return visitSequence === VisitSequenceTypes.Discharge
}

export { shouldDisableDiagnosisActions }
