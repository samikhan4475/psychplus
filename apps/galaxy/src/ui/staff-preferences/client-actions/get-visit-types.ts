'use client'

import * as api from '@/api/api.client'
import { GET_VISIT_TYPE_ENDPOINT } from '@/api/endpoints'
import { Encounter } from '@/types'

const getVisitEncounterTypesAction = async (): Promise<
  api.ActionResult<Encounter[]>
> => {
  const result = await api.POST<Encounter[]>(
    `${GET_VISIT_TYPE_ENDPOINT}?isIncludeDurations=true&isIncludeCPTCodes=true`,
    {
      isIncludeDurations: true,
      isIncludeCptCodes: true,
    },
  )

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
