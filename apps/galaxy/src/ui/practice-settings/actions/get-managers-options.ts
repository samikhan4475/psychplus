'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
}

const getManagersOptionsAction = async (
  value: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<StaffResource[]>(api.GET_PROVIDERS_ENDPOINT, {
    ...defaultPayload,
    ...{
      name: value,
    },
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: `${data.id} - ${data.legalName.firstName} - ${data.legalName.lastName}`,
    label: data.legalName.firstName + ' ' + data.legalName.lastName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getManagersOptionsAction }
