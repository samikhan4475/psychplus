'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async (
  providerType?: string,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    providerType,
  }

  const response = await api.POST<StaffResource[]>(
    GET_STAFF_ENDPOINT,
    sanitizeFormData(body),
    {
      next: {
        revalidate: 3600,
      },
    },
  )

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
