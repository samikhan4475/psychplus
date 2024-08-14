import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Procedure } from './types'

const getProcedures = (patientId: string): Promise<Procedure[]> =>
  handleRequest(
    fetch(`/galaxy/api/healthproblems/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ patientIds: [patientId] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateProcedure = (payload: Procedure): Promise<Procedure> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${payload.patientId}/notes/${payload.noteId}/healthprocedures/${payload?.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteProcedure = (
  patientId: number,
  procedureId: string | undefined,
): Promise<void> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/healthprocedures/${procedureId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createProcedure = (payload: Procedure): Promise<Procedure> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(
      `/galaxy/api/patients/${payload.patientId}/notes/${payload.noteId}/healthprocedures`,
      {
        method: 'POST',
        body: JSON.stringify(cleanData),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}
export { getProcedures, updateProcedure, createProcedure, deleteProcedure }
