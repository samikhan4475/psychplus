import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Procedure } from './types'

const getProcedures = (patientId: number): Promise<Procedure[]> =>
  handleRequest(
    fetch(`${API_URL}/api/healthprocedures/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ patientIds: [patientId], recordStatus: 'Active' }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getProcedures }
