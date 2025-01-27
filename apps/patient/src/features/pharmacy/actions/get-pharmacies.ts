'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Pharmacy } from '../types'

interface PharmaciesPayload {
  organizationName?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  npi?: string
  serviceLevelCodes?: string[]
}

const getPharmaciesAction = async ({
  payload,
}: {
  payload?: PharmaciesPayload
}): Promise<ActionResult<Pharmacy[]>> => {
  const result = await api.POST<Pharmacy[]>(
    `${API_URL}/api/pharmacies/actions/search`,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      ...payload,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { getPharmaciesAction }
