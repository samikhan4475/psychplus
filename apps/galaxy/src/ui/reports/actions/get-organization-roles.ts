'use client'

import * as api from '@/api/api.client'
import { GET_DISTRIBUTION_GROUPS } from '@/api/endpoints'
import { UserGroup } from '../types'

const getOrganizationRolesAction = async (): Promise<
  api.ActionResult<UserGroup[]>
> => {
  const result = await api.POST<UserGroup[]>(GET_DISTRIBUTION_GROUPS, {})

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getOrganizationRolesAction }
