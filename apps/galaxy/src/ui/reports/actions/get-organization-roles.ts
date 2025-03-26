'use server'

import * as api from '@/api'
import { UserGroup } from '../types'

const getOrganizationRolesAction = async (): Promise<
  api.ActionResult<UserGroup[]>
> => {
  const result = await api.POST<UserGroup[]>(api.GET_DISTRIBUTION_GROUPS,{})

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

export { getOrganizationRolesAction }

