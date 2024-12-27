'use server'

import * as api from '@/api'
import { TestLabsType } from '../blocks/types'

const getTestLabs = async (
  payload: any = {},
  limit?: number,
): Promise<api.ActionResult<TestLabsType[]>> => {
  const url = limit
    ? `${api.GET_SEARCHED_LAB_TESTS}?offset=0&limit=${limit}&orderBy=testName`
    : api.GET_SEARCHED_LAB_TESTS

  const response = await api.POST<TestLabsType[]>(url, {
    ...payload,
  })
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

export { getTestLabs }
