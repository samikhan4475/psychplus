'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'

const getProvidersOptionsAction = async (): Promise<
  api.ActionResult<{ label: string; value: string }[]>
> => {
  const body = {
    roleCodes: ['1'],
  }
  const response = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, body)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    label: `${data.legalName.firstName} ${data.legalName.lastName}`,
    value: String(data.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
