'use client'

import * as api from '@/api/api.client'
import { GET_ROLES_HISTORY } from '@/api/endpoints'
import { Role } from '@/types'

const getAllRolesHistoryListAction = async (
  roleId: string,
): Promise<api.ActionResult<Role[]>> => {
  const response = await api.POST<Role[]>(`${GET_ROLES_HISTORY(roleId)}`, {})

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

export { getAllRolesHistoryListAction }
