'use server'

import * as api from '@/api'
import { Role } from '@/types'

const getOrganizationRolesListAction = async (
  organizationId: string,
  staffId: string,
): Promise<api.ActionResult<Role[]>> => {
  const url = new URL(api.GET_ORGANIZATION_STAFF_ROLES(organizationId, staffId))

  const response = await api.GET<Role[]>(`${url}`)

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

export { getOrganizationRolesListAction }
