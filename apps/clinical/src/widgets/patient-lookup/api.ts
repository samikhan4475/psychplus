import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { type Patients, type PatientsPayload } from './types'

const getPatients = (request: PatientsPayload): Promise<Patients[]> =>
  handleRequest(
    fetch(
      '/api/patients/search?includeInactive=false&includeTest=true&offset=0&limit=100',
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

export { getPatients }
