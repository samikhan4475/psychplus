'use server'

import * as api from '@/api'
import { Role } from '@/types'

const getAllOrganizationPracticesListAction = async (
  practiceId: string,
  staffId: string,
): Promise<api.ActionResult<Role[]>> => {
  const url = new URL(api.GET_PRACTICE_STAFF_ROLES(practiceId, staffId))

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

export { getAllOrganizationPracticesListAction }
