'use server'

import * as api from '@/api'

const addTestLabsApi = async (payload: any): Promise<api.ActionResult<any>> => {
  const response = await api.POST<any>(api.ADD_LAB_TESTS, payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { addTestLabsApi }
