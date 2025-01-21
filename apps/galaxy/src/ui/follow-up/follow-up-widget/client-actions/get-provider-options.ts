'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async ({
  locationId,
  providerType,
}: {
  locationId: string
  providerType: string
}): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    locationIds: [locationId],
    providerType,
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
    label: `${data.legalName.firstName} ${data.legalName.lastName}`,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }
