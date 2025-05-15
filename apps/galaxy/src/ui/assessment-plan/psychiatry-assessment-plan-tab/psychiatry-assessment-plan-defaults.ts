import { PsychiatryAssessmentPlanTabSchemaType } from './psychiatry-assessment-plan-tab-schema'

export const createEmptyFormValues =
  (): PsychiatryAssessmentPlanTabSchemaType => ({
    patientDiscussionCompleted: 'yes',
    assessmentTreatmentPlanNotes: '',
    safetyPlanningIntervention: false,
    copingStrategies: [],
    restrictingAccess: [],
    warningSigns: [],
  })
