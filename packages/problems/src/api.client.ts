import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Problem } from './types'

const getProblems = (patientId: string): Promise<Problem[]> =>
  handleRequest(
    fetch(`/galaxy/api/healthproblems/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ patientIds: [patientId] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateProblem = (payload: Problem): Promise<Problem[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${payload.patientId}/healthproblems/${payload?.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteProblem = (
  patientId: number,
  problemId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/healthproblems/${problemId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createProblem = (payload: Problem): Promise<Problem> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  cleanData.appointmentId = payload.patientId
  return handleRequest(
    fetch(`/galaxy/api/patients/${payload.patientId}/healthproblems`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}
export { getProblems, updateProblem, createProblem, deleteProblem }
