'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { DEFAULT_STAFF_PAYLOAD_PARAMS, STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

interface GetProviderOptionsParams {
  providerType: string
  locationIds: string[]
  stateIds: string[]
}

const getProvidersOptionsAction = async (
  params?: Partial<GetProviderOptionsParams>,
  useUserId = false,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    ...DEFAULT_STAFF_PAYLOAD_PARAMS,
    ...(params ?? {}),
  }

  const response = await api.POST<StaffResource[]>(
    GET_STAFF_ENDPOINT,
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
    value: useUserId ? String(data.userId) : String(data.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
