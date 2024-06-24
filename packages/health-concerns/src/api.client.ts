// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type {
  HealthConcern,
  HealthObservationPayload,
  HealthProblem,
  IcdCodes,
  IcdFilters,
  Snomed,
} from '.'

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

const getIcdCodesCached = cache(getIcdCodes)

const getProblems = (patientId: number): Promise<HealthProblem[]> =>
  handleRequest(
    fetch(`/galaxy/api/healthproblems/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        patientIds: [patientId],
        recordStatus: ['Active'],
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createHealthConcern = (request: HealthConcern): Promise<HealthConcern> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${request.patientId}/healthconcerns`, {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateHealthConcern = (request: HealthConcern): Promise<HealthConcern> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${request.patientId}/healthconcerns/${request.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(request),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteHealthConcern = (
  request: HealthConcern,
): Promise<HealthConcern[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${request.patientId}/healthconcerns/${request.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify(request),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteHealthObservations = (request: HealthObservationPayload) =>
  handleRequest(
    fetch(
      `/galaxy/api/patients/${request.patientId}/healthobservations/${request.id}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getSnomedCodes = (payload?: IcdFilters): Promise<Snomed> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/IHTSDO/codesets/SNOMED-CT?${payload?.codeOrDescription}&includeExtraDetails=false&offset=0&orderBy=displayName%20asc`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getSnomedCodesCached = cache(getSnomedCodes)

export {
  getIcdCodesCached as getIcdCodes,
  getSnomedCodesCached as getSnomedCodes,
  getProblems,
  createHealthConcern,
  updateHealthConcern,
  deleteHealthConcern,
  deleteHealthObservations,
}
