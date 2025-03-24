'use server'

import * as api from '@/api'
import { SelfPractice } from '@/types'

const getPracticeAction = async (): Promise<
  api.ActionResult<SelfPractice[]>
> => {
  const response = await api.GET<SelfPractice[]>(api.SELF_PRACTICES)

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

export { getPracticeAction }
