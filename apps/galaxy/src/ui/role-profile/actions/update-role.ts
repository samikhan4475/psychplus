'use server'

import * as api from '@/api'
import { Role } from '@/types'

const updateRoleAction = async (
  payload: Partial<Role>,
  id: string,
): Promise<api.ActionResult<Role>> => {
  const response = await api.PUT<Role>(api.UPDATE_ROLE_ENDPOINT(id), payload)

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

export { updateRoleAction }
