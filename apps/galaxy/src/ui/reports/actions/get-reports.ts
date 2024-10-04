'use server'

import * as api from '@/api'
import { Codeset } from '@/types'

const getReportsAction = async (): Promise<
  api.ActionResult<Codeset>
> => {
  const result = await api.GET<Codeset>(api.GET_REPORTS_CATEGORY_ENDPOINT)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data
  }
}

export { getReportsAction }

