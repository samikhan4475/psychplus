'use client'

import * as api from '@/api/api.client'
import { GET_PROVIDERS_ENDPOINT } from '@/api/endpoints'
import { DEFAULT_STAFF_PAYLOAD_PARAMS } from '@/constants'
import { StaffResource } from '@/types'
import { getPatientFullName, sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async (
  signal: AbortSignal,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    ...DEFAULT_STAFF_PAYLOAD_PARAMS,
  }

  const response = await api.POST<StaffResource[]>(
    GET_PROVIDERS_ENDPOINT,
    sanitizeFormData(body),
    { signal },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    label: getPatientFullName(data.legalName),
    value: String(data.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
