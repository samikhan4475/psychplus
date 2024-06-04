// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { FunctionalCognitive, IcdCodes, IcdFilters, Snomed } from './types'

const getFunctionalCognitives = (): Promise<FunctionalCognitive[]> =>
  handleRequest(
    fetch(`/galaxy/api/functionalcognitives/actions/search`, {
      method: 'POST',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateFunctionalCognitive = (
  payload: FunctionalCognitive,
): Promise<FunctionalCognitive> => {
  return handleRequest(
    fetch(`/galaxy/api/functionalcognitives/${payload?.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const deleteFunctionalCognitive = (
  functionalCognitiveIdId?: string,
): Promise<void> =>
  handleRequest(
    fetch(`/galaxy/api/functionalcognitives/${functionalCognitiveIdId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createFunctionalCognitives = (
  payload: FunctionalCognitive,
): Promise<FunctionalCognitive> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(`/galaxy/api/functionalcognitives`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

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

const getIcdCodesCached = cache(getIcdCodes)
const getSnomedCodesCached = cache(getSnomedCodes)

export {
  getFunctionalCognitives,
  updateFunctionalCognitive,
  createFunctionalCognitives,
  deleteFunctionalCognitive,
  getIcdCodesCached as getIcdCodes,
  getSnomedCodesCached as getSnomedCodes,
}
