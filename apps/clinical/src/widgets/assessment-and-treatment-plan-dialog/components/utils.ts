import { AssessmentAndTreatment } from '@psychplus/assessment-and-treatment-plan/types'

interface Payload {
  patientId: number
  noteId: number
  status: string
  planDate: string
  planOfTreatmentNotes: string
  symptomCode: string
  symptomCodesetUsed: string
  symptomCodeDescription: string
  planType: string
  assessment: string
  assessmentPlanDate: string
}

function formatAssessmentPayload(originalData: Payload) {
  return {
    recordStatus: 'Active',
    status: originalData.status,
    patientId: originalData.patientId,
    noteId: originalData.noteId,
    assessmentPlanDate: originalData.assessmentPlanDate,
    patientAssessments: [
      {
        recordStatus: 'Active',
        assessment: originalData.assessment,
      },
    ],
    patientPlanOfTreatments: [
      {
        recordStatus: 'Active',
        planDate: originalData.planDate,
        planOfTreatmentNotes: originalData.planOfTreatmentNotes,
        symptomCode: originalData.symptomCode,
        symptomCodesetUsed: 'ICD', // Assuming ICD format
        symptomCodeDescription: originalData.symptomCodeDescription,
        planType: originalData.planType,
      },
    ],
  }
}
export { formatAssessmentPayload }
