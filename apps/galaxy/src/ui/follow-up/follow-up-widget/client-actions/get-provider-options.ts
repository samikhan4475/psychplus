'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { DEFAULT_STAFF_PAYLOAD_PARAMS, STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'
import { ProviderOptionParams } from '../../types'

const getProvidersOptionsAction = async (
  payload: Partial<ProviderOptionParams>,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    ...payload,
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
     ...DEFAULT_STAFF_PAYLOAD_PARAMS,
  }

  const response = await api.POST<StaffResource[]>(
    GET_STAFF_ENDPOINT,
    sanitizeFormData(body),
  )

  if (response.state === 'error') {
    return {
      error: response.error,
      state: 'error',
    }
  }

  const transformedData = response.data.map((data) => ({
    value: String(data.id),
    label: `${data.legalName.firstName} ${data.legalName.lastName}, ${data.legalName.honors}`,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
