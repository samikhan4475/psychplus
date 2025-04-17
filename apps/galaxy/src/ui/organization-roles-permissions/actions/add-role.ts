'use server'

import * as api from '@/api'
import { Role } from '@/types'

const addRoleAction = async (
  payload: Partial<Role>,
): Promise<api.ActionResult<Role>> => {
  const response = await api.POST<Role>(api.Add_USER_ROLES, payload)
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

export { addRoleAction }
