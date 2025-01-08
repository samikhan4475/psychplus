'use server'

import * as api from '@/api'
import type { Organization } from '../types'

const updateOrganizationAction = async (
  payload: Partial<Organization>,
  id: string,
): Promise<api.ActionResult<Organization>> => {
  const response = await api.PUT<Organization>(
    api.UPDATE_ORGANIZATION_ENDPOINT(id),
    payload,
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

export { updateOrganizationAction }
