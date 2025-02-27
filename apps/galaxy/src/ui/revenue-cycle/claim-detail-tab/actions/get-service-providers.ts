'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'

const getProviderOptionsAction = async (
  name: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const payload = {
    isExcludeSelf: false,
    isIncludeTestProviders: true,

    name,
  }
  const response = await api.POST<StaffResource[]>(
    api.SEARCH_STAFF_ENDPOINT,
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response.data.map((data) => ({
    value: data.id.toString(),
    label: `${data?.legalName?.firstName} ${data?.legalName?.lastName}`.trim(),
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProviderOptionsAction }
