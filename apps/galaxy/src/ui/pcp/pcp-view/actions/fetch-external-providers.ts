'use server'

import * as api from '@/api'
import { ExternalProvider } from '../../types'

const fetchExternalProvidersAction = async (
  firstName: string,
): Promise<api.ActionResult<ExternalProvider[]>> => {
  const payload = {
    firstName: firstName,
  }

  const result = await api.POST(
    api.FETCH_EXTERNAL_PROVIDERS_ENDPOINT(),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data as ExternalProvider[],
  }
}

export { fetchExternalProvidersAction }
