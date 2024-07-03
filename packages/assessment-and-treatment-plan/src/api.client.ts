// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { AssessmentAndTreatment, IcdCodes, IcdFilters } from './types'

const getAssessmentPlanOfTreatments = (
  patientId: string,
  noteId: string,
): Promise<AssessmentAndTreatment[]> =>
  handleRequest(
    fetch(`/galaxy/api/assessmentplanoftreatments/actions/search`, {
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

const createAssessmentPlanOfTreatments = (
  payload: AssessmentAndTreatment,
): Promise<AssessmentAndTreatment> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(
      `/galaxy/api/patients/${payload.patientId}/notes/${payload.noteId}/assessmentplanoftreatments`,
      {
        method: 'POST',
        body: JSON.stringify(cleanData),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const updateAssessmentPlanOfTreatments = (
  payload: AssessmentAndTreatment | undefined,
): Promise<AssessmentAndTreatment> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${payload?.patientId}/notes/${payload?.noteId}/assessmentplanoftreatments/${payload?.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getIcdCodes = (payload?: IcdFilters): Promise<IcdCodes[]> =>
  handleRequest(
    fetch(
      '/galaxy/api/metadata/icd10codes/actions/search?offset=0&limit=0&orderBy=HcpcsCode%20asc',
      {
        method: 'POST',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteAssessment = (
  patientId: number,
  assessmentId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(`/galaxy/api/patients/1/assessments/${assessmentId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deletePlanTreatment = (
  patientId: number,
  planTreatmentId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${patientId}/planoftreatments/${planTreatmentId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteAssessmentPlanOfTreatment = (
  patientId: number,
  assessmentPlanOfTreatmentId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${patientId}/assessmentplanoftreatments/${assessmentPlanOfTreatmentId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getIcdCodesCached = cache(getIcdCodes)
export {
  getAssessmentPlanOfTreatments,
  createAssessmentPlanOfTreatments,
  deleteAssessmentPlanOfTreatment,
  updateAssessmentPlanOfTreatments,
  deleteAssessment,
  deletePlanTreatment,
  getIcdCodesCached as getIcdCodes,
}
