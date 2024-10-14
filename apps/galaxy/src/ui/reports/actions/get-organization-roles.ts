'use server'

import * as api from '@/api'

const getOrganizationRolesAction = async (): Promise<
  api.ActionResult<string>
> => {
  const result = await api.POST<string>(api.GET_ORGANIZATION_ROLES, {
    organizationId : "F9E87082-3FC2-4D65-A0B7-810F0A18C59E", // will be replaced when we get data from BE
    includeRole : true,
  })

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

