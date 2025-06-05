'use server'

import * as api from '@/api'
import { PreferredPartnerItem } from '@/ui/preferred-partner/types'

interface Payload {
  partnerIds?: string[]
}

const getPreferredPartnerAction = async (
  payload: Payload,
): Promise<api.ActionResult<PreferredPartnerItem[]>> => {
  const response = await api.POST<PreferredPartnerItem[]>(
    api.GET_PREFERRED_PARTNER_LIST_ENDPOINT,
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getPreferredPartnerAction }
