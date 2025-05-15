'use server'

import * as api from '@/api'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async (
  payload: {
    name?: string
    providerType?: string
    practicesIds?: string[]
    isResultsForNameList?: boolean
  } = {},
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    isIncludeTestProviders: false,
    ...payload,
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
