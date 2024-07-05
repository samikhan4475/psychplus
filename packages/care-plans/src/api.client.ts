// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type {
  CarePlan,
  CarePlanPayload,
  IcdCodes,
  IcdFilters,
  Snomed,
} from './types'

const getCarePlans = (): Promise<CarePlan[]> =>
  handleRequest(
    fetch(`/galaxy/api/careplans/actions/search`, {
      method: 'POST',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateCareplan = (
  payload: CarePlan,
  carePlanId?: string,
  patientId?: number,
): Promise<CarePlan[]> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/careplans/${carePlanId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteCarePlan = (carePlanId?: string): Promise<void> =>
  handleRequest(
    fetch(`/galaxy/api/careplans/${carePlanId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getSnomedCodes = (payload?: IcdFilters): Promise<Snomed> => {
  return handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/IHTSDO/codesets/SNOMED-CT?${payload?.codeOrDescription}&includeExtraDetails=false&offset=0&orderBy=displayName%20asc`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const createCarePlan = ({
  payload,
  patientId,
}: CarePlanPayload): Promise<CarePlan> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/careplans`, {
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

const getIcdCodesCached = cache(getIcdCodes)
const getSnomedCodesCached = cache(getSnomedCodes)

export {
  getCarePlans,
  updateCareplan,
  createCarePlan,
  deleteCarePlan,
  getIcdCodesCached as getIcdCodes,
  getSnomedCodesCached as getSnomedCodes,
}
