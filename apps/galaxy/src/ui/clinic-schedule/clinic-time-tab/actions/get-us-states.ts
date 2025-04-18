'use server'

import * as api from '@/api'
import type { State } from '@/types'

const getUsStatesAction = async (): Promise<api.ActionResult<State[]>> => {
  const response = await api.GET<State[]>(api.GET_US_STATES_ENDPOINT, {
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

  return {
    state: 'success',
    data: response.data.filter((state) => state.stateCode),
  }
}

export { getUsStatesAction }
