'use server'

import * as api from '@/api'
import { PreferredPartnerItem } from '@/ui/preferred-partner/types'

interface PreferredPartnerUpdateParams {
  preferredPartnerId: string
  payload: Partial<PreferredPartnerItem>
}
const updatePreferredPartnerAction = async ({
  preferredPartnerId,
  payload,
}: PreferredPartnerUpdateParams): Promise<api.ActionResult<PreferredPartnerItem>> => {
  const response = await api.PUT<PreferredPartnerItem>(
    api.UPDATE_PREFERRED_PARTNER_ENDPOINT(preferredPartnerId),
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

export { updatePreferredPartnerAction }
