'use server'

import * as api from '@/api'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { Provider, StaffResource } from '@/types'

const getProvidersAction = async (
  input: string,
): Promise<api.ActionResult<Provider[]>> => {
  const response = await api.POST<StaffResource[]>(api.SEARCH_STAFF_ENDPOINT, {
    body: JSON.stringify({
      name: input,
      roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    }),
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response?.data?.map((provider) => ({
    id: provider.id,
    avatar: provider?.avatar,
    firstName: provider.legalName.firstName,
    lastName: provider.legalName.lastName,
    honors: provider.legalName.honors,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersAction }
