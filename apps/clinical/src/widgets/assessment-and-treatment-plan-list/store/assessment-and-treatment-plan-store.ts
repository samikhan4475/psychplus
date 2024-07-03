import { StateCreator } from 'zustand'
import { type AssessmentAndTreatmentPlanState } from './types'

const assessmentAndTreatmentPlanStore: StateCreator<
  AssessmentAndTreatmentPlanState
> = (set) => ({
  assessmentAndTreatmentPlans: [],
  patientId: NaN,
  noteId: NaN,
  setPatientId: (patientId) => set({ patientId }),
  setNoteId: (noteId) => set({ noteId }),
  setAssessmentAndTreatmentPlans: (assessmentAndTreatmentPlans) => {
    set({ assessmentAndTreatmentPlans })
  },
})

export { assessmentAndTreatmentPlanStore }
