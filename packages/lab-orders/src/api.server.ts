import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type {
  getSpecimenTypes,
  LabOrder,
  LabOrders,
  LabResultPayload,
  LabSearchPayload,
  LabTest,
} from './types'

const fetchLabOrders = (
  appointmentId: string,
  payload?: LabOrders,
): Promise<LabOrder[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/appointments/${appointmentId}/laborders/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const fetchPills = (payload?: LabResultPayload): Promise<LabTest[]> =>
  handleRequest(
    fetch(`${API_URL}/api/labtests/actions/search?orderBy=testCodeCount`, {
      method: 'POST',
      body: JSON.stringify(payload || {}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getSpecimen = async (assigningAuthorityNamespace: string, SpecimenType: string,): Promise<getSpecimenTypes> =>
  handleRequest(
    fetch(`${API_URL}/api/codeset/authorities/${assigningAuthorityNamespace}/codesets/${SpecimenType}?includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`, {
      method: 'GET',
      headers: createHeaders(),
    }),
  )
const fetchSearchPills = async ({
  payload,
  offset = 0,
  limit = 10,
}: {
  payload?: LabSearchPayload,
  offset?: number,
  limit?: number,
}): Promise<LabTest[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/labcompendiums/actions/search?offset=${offset}&limit=${limit}&orderBy=testName`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

export {
  fetchLabOrders as getLabOrders,
  fetchPills as getMostFrequentLabTest,
  fetchSearchPills,
  getSpecimen,
}
