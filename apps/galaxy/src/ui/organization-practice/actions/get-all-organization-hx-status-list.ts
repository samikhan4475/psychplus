'use server'

import * as api from '@/api'
import type { Organization } from '../types'

const getAllOrganizationHxStatusListAction = async (
  organizationId: string,
): Promise<api.ActionResult<Organization[]>> => {
  const response = await api.POST<Organization[]>(
    api.GET_ORGANIZATION_HX_STATUS_ENDPOINT(organizationId),
    {},
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

export { getAllOrganizationHxStatusListAction }
