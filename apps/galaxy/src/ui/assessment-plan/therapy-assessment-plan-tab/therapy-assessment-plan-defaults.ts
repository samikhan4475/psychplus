import { TherapyAssessmentPlanTabSchemaType } from './therapy-assessment-plan-tab-schema'

export const createEmptyFormValues =
  (): TherapyAssessmentPlanTabSchemaType => ({
    patientDiscussionCompleted: 'yes',
    assessmentTreatmentPlanNotes: '',
  })
