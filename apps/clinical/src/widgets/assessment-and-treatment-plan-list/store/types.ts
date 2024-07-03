import { AssessmentAndTreatment } from '@psychplus/assessment-and-treatment-plan/types'

interface AssessmentAndTreatmentPlanState {
  assessmentAndTreatmentPlans: AssessmentAndTreatment[]
  noteId: number
  patientId: number
  setAssessmentAndTreatmentPlans: (
    assessmentAndTreatmentPlans: AssessmentAndTreatment[],
  ) => void
  setPatientId: (patientId: number) => void
  setNoteId: (noteId: number) => void
}

type AssessmentAndTreatmentPlanStoreType = AssessmentAndTreatmentPlanState

export type {
  AssessmentAndTreatmentPlanStoreType,
  AssessmentAndTreatmentPlanState,
}
