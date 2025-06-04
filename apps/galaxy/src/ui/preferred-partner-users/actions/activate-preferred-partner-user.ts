'use server'

import * as api from '@/api'
import { PreferredPartnerUser } from '@/types'

interface ActivatePreferredPartnerUserParams {
  partnerId: string
  workListId: string
}

const activatePreferredPartnerUserAction = async ({
  partnerId,
  workListId,
}: ActivatePreferredPartnerUserParams): Promise<
  api.ActionResult<PreferredPartnerUser>
> => {
  const response = await api.POST<PreferredPartnerUser>(
    api.ACTIVATE_PREFERRED_PARTNER_USER(partnerId, workListId),
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

export type { ActivatePreferredPartnerUserParams }
export { activatePreferredPartnerUserAction }
