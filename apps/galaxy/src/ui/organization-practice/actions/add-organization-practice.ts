'use server'

import * as api from '@/api'
import type { Practice } from '../types'

const addOrganizationPracticeAction = async (
  organizationId: string,
  payload: Partial<Practice>,
): Promise<api.ActionResult<Practice>> => {
  const response = await api.POST<Practice>(
    api.ADD_ORGANIZATION_PRACTICE_ENDPOINT(organizationId),
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

export { addOrganizationPracticeAction }
