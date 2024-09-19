import * as api from '@/api'
import type { StateCodeSet } from '../types'

const getStatesByCountry = async (
  country: string,
): Promise<api.ActionResult<StateCodeSet[]>> => {
  const response = await api.GET<StateCodeSet[]>(
    `${api.STATES_BY_COUNTRY_ENDPOINT(country)}`,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { getStatesByCountry }
