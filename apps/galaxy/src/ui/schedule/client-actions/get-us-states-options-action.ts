'use client'

import { GET_US_STATES_ENDPOINT } from '@/api/endpoints';
import * as api from '@/api/api.client'
import type { State } from '@/types'

const getUsStatesOptionsAction = async (): Promise<
  api.ActionResult<{ label: string; value: string }[]>
> => {
  const response = await api.GET<State[]>(GET_US_STATES_ENDPOINT, {
    next: {
      revalidate: 3600,
    },
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.stateName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getUsStatesOptionsAction }
