'use server'

import * as api from '@/api'
import { Practice } from '@/types'

interface Payload {
  payload: {
    practiceId: string
  }
}
const getAllPracticesAction = async ({
  payload,
}: Payload): Promise<api.ActionResult<Practice[]>> => {
  const response = await api.POST<Practice[]>(
    api.GET_PRACTICE_IDS_LIST_ENDPOINT,
    payload,
  )

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

export { getAllPracticesAction }
