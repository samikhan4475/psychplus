'use server'

import * as api from '@/api'
import { PreferredPartnerUser } from '@/types'

interface UpdatePreferredPartnerUserParams {
  partnerId: string
  workListId: string
  data: PreferredPartnerUser
}

const updatePreferredPartnerUserAction = async ({
  partnerId,
  workListId,
  data,
}: UpdatePreferredPartnerUserParams): Promise<
  api.ActionResult<PreferredPartnerUser>
> => {
  const payload = {
    WorkListUser: data,
  }

  const response = await api.PUT<PreferredPartnerUser>(
    api.UPDATE_PREFERRED_PARTNER_USER(partnerId, workListId),
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

export type { UpdatePreferredPartnerUserParams }
export { updatePreferredPartnerUserAction }
