'use server'

import * as api from '@/api'
import { Encounter } from '@/types'

const getVisitEncounterTypesAction = async (): Promise<
  api.ActionResult<Encounter[]>
> => {
  const result = await api.POST<Encounter[]>(api.GET_VISIT_TYPE_ENDPOINT, {})

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getVisitEncounterTypesAction }
