'use server'

import * as api from '@/api'
import { StaffTopBarInfoResponse } from '@/types'

const getTopBarInformationAction = async (): Promise<
  api.ActionResult<StaffTopBarInfoResponse>
> => {
  const response = await api.GET<StaffTopBarInfoResponse>(
    api.GET_USERS_SELF_TOP_BAR_INFORMATION_ENDPOINT,
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

export { getTopBarInformationAction }
