import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { AssessmentAndTreatment } from './types'

const getAssessmentPlanOfTreatments = (
  patientId: number,
  noteId: number,
): Promise<AssessmentAndTreatment[]> =>
  handleRequest(
    fetch(`${API_URL}/api/assessmentplanoftreatments/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        patientIds: [patientId],
        noteIds: [noteId],
        recordStatus: 'Active',
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getAssessmentPlanOfTreatments }
