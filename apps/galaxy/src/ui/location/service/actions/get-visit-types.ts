'use server'

import * as api from '@/api'
import { Encounter } from '@/types'

const getVisitTypesAction = async (
  locationType: string,
): Promise<api.ActionResult<Encounter[]>> => {
  const response = await api.POST<Encounter[]>(api.GET_VISIT_TYPE_ENDPOINT, {
    locationType,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}
export { getVisitTypesAction }
