'use server'

import * as api from '@/api'
import { PreferredPartnerUser } from '@/types'

interface DeletePreferredPartnerUserParams {
  partnerId: string
  workListId: string
}

const deletePreferredPartnerUserAction = async ({
  partnerId,
  workListId,
}: DeletePreferredPartnerUserParams): Promise<
  api.ActionResult<PreferredPartnerUser>
> => {
  const response = await api.DELETE<PreferredPartnerUser>(
    api.DELETE_PREFERRED_PARTNER_USER(partnerId, workListId),
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

export type { DeletePreferredPartnerUserParams }
export { deletePreferredPartnerUserAction }
