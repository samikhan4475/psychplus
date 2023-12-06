import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'
import { type Patients, type PatientsPayload } from './types'

const endpoint =
  '/api/patients/search?includeInactive=false&includeTest=true&offset=0&limit=100'

const getPatients = (request: PatientsPayload): Promise<Patients[]> =>
  handleRequest(
    fetch(forwardQuery(endpoint), {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  )

export { getPatients }
