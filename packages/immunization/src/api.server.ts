// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Immunization } from './types'

const getImmunizations = (appointmentId: number): Promise<Immunization[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/appointments/${appointmentId}/immunizations/actions/search?offset=0&limit=0&orderBy=datetimeAdministered%20desc`,
      {
        method: 'POST',
        body: JSON.stringify({ resourceStatusList: ['Active'] }),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getImmunizationsCached = cache(getImmunizations)
export { getImmunizationsCached as getImmunizations }
