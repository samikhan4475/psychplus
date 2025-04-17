'use server'

import * as api from '@/api'
import { Role, SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includePermissions: true,
}

const getAllRolesListOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const url = new URL(api.GET_USER_ROLES)

  const response = await api.POST<Role[]>(`${url}`, {
    ...defaultPayload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getAllRolesListOptionsAction }
