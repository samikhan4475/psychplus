'use server'

import * as api from '@/api'
import { UserSelfInitialInformation } from '@/types'

const getUserInitialInformationAction = async (): Promise<
  api.ActionResult<UserSelfInitialInformation>
> => {
  const response = await api.GET<UserSelfInitialInformation>(
    api.GET_USERS_SELF_INITIAL_INFORMATION_ENDPOINT,
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

export { getUserInitialInformationAction }
