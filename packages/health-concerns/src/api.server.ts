// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { HealthConcern, HealthConcernPayload } from './types'

const getHealthConcerns = (
  request: HealthConcernPayload,
): Promise<HealthConcern[]> =>
  handleRequest(
    fetch(`${API_URL}/api/healthconcerns/actions/search?`, {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getHealthConcernsCached = cache(getHealthConcerns)

export { getHealthConcernsCached as getHealthConcerns }
