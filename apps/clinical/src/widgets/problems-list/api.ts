import { Problem } from '@psychplus/problems'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Filters } from './store'

const getProblems = (payload?: Filters): Promise<Problem[]> =>
  handleRequest(
    fetch(`/api/healthproblems/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ ...payload, patientIds: [1] }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getProblems }
