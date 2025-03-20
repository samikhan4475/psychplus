'use server'

import * as api from '@/api'
import { TestLabsType } from '../blocks/types'

const addTestLabsApi = async (
  payload: TestLabsType[],
): Promise<api.ActionResult<TestLabsType[]>> => {
  const response = await api.POST<TestLabsType[]>(api.ADD_LAB_TESTS, payload)
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
