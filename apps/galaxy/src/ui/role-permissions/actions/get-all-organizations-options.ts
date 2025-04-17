'use server'

import * as api from '@/api'
import { Organization, SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllOrganizationsOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const url = new URL(api.GET_ORGANIZATIONS_ENDPOINT)

  const response = await api.POST<Organization[]>(`${url}`, {
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
    label: data.shortName,
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getAllOrganizationsOptionsAction }
