'use server'

import * as api from '@/api'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async (
  providerType?: string,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    providerType,
    isIncludeTestProviders:false
  }

  const response = await api.POST<StaffResource[]>(
    api.GET_STAFF_ENDPOINT,
    sanitizeFormData(body),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    label: `${data.legalName.firstName} ${data.legalName.lastName}, ${data.legalName.honors}`,
    value: String(data.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
