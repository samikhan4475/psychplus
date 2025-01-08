'use server'

import * as api from '@/api'
import type { Organization } from '../types'

const addOrganizationAction = async (
  payload: Partial<Organization>,
): Promise<api.ActionResult<Organization>> => {
  const response = await api.POST<Organization>(
    api.ADD_ORGANIZATION_ENDPOINT,
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

export { addOrganizationAction }
