'use server'

import * as api from '@/api'
import { PreferredPartnerUser } from '@/types'

interface DeactivatePreferredPartnerUserParams {
  partnerId: string
  workListId: string
}

const deactivatePreferredPartnerUserAction = async ({
  partnerId,
  workListId,
}: DeactivatePreferredPartnerUserParams): Promise<
  api.ActionResult<PreferredPartnerUser[]>
> => {
  const response = await api.DELETE<PreferredPartnerUser[]>(
    api.DEACTIVATE_PREFERRED_PARTNER_USER(partnerId, workListId),
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

export type { DeactivatePreferredPartnerUserParams }
export { deactivatePreferredPartnerUserAction }
