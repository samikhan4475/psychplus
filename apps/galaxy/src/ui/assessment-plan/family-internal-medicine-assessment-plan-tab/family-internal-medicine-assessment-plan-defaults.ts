import { FamilyInternalMedicineAssessmentPlanTabSchemaType } from './family-internal-medicine-assessment-plan-tab-schema'

export const createEmptyFormValues =
  (): FamilyInternalMedicineAssessmentPlanTabSchemaType => ({
    patientDiscussionCompleted: 'yes',
    assessmentTreatmentPlanNotes: '',
  })
