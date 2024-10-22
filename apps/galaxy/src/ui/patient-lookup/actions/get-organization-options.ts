'use server'

import * as api from '@/api'
import { Organization, SelectOptionType } from '@/types'

const getOrganizationOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Organization[]>(
    api.GET_ORGANIZATIONS_ENDPOINT,
    {},
  )

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

export { getOrganizationOptionsAction }
