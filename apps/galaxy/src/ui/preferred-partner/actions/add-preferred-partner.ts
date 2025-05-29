'use server'

import * as api from '@/api'
import { PreferredPartnerItem } from '../types'

const addPreferredPartnerAction = async (
  payload: Partial<PreferredPartnerItem>,
): Promise<api.ActionResult<PreferredPartnerItem>> => {
  const response = await api.POST<PreferredPartnerItem>(
    api.ADD_PREFERRED_PARTNER_ENDPOINT,
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

export { addPreferredPartnerAction }
