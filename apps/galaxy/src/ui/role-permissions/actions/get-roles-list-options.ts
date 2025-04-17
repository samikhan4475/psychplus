'use server'

import * as api from '@/api'
import { Role, SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

interface Payload {
  payload: {
    roleIds?: string[]
  }
}

const getAllRolesListOptionsAction = async ({
  payload,
}: Payload): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.GET_USER_ROLES)

  const response = await api.POST<Role[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
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
