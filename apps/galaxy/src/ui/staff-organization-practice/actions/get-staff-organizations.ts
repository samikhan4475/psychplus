'use server'

import * as api from '@/api'
import { Organization } from '@/types'

const getStaffOrganizationsAction = async (
  userId: string,
): Promise<api.ActionResult<string[]>> => {
  const response = await api.GET<Organization[]>(
    `${api.GET_STAFF_ORGANIZATIONS_ENDPOINT(userId)}`,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const organizations: string[] = response.data.map(
    (organization: Organization) => organization.id,
  )

  return {
    state: 'success',
    data: organizations,
  }
}

export { getStaffOrganizationsAction }
