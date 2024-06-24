import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Problem, ProblemPayload } from './types'

const getProblems = (patientId: number): Promise<Problem[]> =>
  handleRequest(
    fetch(`${API_URL}/api/healthproblems/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ patientIds: [patientId], recordStatus: 'Active' }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateProblem = (
  patientId: string,
  problemId: string,
  payload: Problem,
): Promise<Problem[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/healthproblems${problemId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteProblem = (patientId: string, problemId: string): Promise<void> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/healthproblems/${problemId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createProblem = ({
  patientId,
  payload,
}: ProblemPayload): Promise<Problem> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  cleanData.appointmentId = patientId
  return handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/healthproblems`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

export { getProblems, updateProblem, createProblem, deleteProblem }
