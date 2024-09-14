import { cache } from 'react'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Provider, StaffAppointmentAvailabilities } from './types'

const searchAppointments = (): Promise<StaffAppointmentAvailabilities> => {
  const body = {
    MaxDaysOutToLook: 90,
  }

  return handleRequest(
    fetch(`${API_URL}/api/schedules/availability/search?limit=0&offset=0`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(body),
      headers: createHeaders(),
    }),
  )
}

const getCommonLanguages = (): Promise<AuthorityCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/FHIR/codesets/CommonLanguages?includeExtraDetails=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const searchProviders = (): Promise<Provider[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/staff/search?limit=0&offset=0&includeInactive=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify({
          roleCodes: ['1', '2'],
        }),
      },
    ),
  )

const searchAppointmentsCached = cache(searchAppointments)
const getCommonLanguagesCached = cache(getCommonLanguages)
const searchProvidersCached = cache(searchProviders)

export {
  searchAppointmentsCached as searchAppointments,
  getCommonLanguagesCached as getCommonLanguages,
  searchProvidersCached as searchProviders,
}
