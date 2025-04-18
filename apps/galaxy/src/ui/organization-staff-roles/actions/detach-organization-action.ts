'use server'

import * as api from '@/api'
import { Practice } from '@/ui/organization-practice/types'

interface Payload {
  roleIds: string[]
}

const detachOrganizationAction = async (
  payload: Payload,
  staffId: string,
  id: string,
): Promise<api.ActionResult<Practice>> => {
  const response = await api.POST<Practice>(
    api.DETACH_ORGANIZATION_STAFF_ENDPOINT(staffId, id),
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

export { detachOrganizationAction }
