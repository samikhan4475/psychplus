'use server'

import * as api from '@/api'
import { UpdatePreferredPartnerUserParams, UpdatePreferredPartnerUserResponse } from '@/types'

const updatePreferredPartnerUserAction = async ({
  partnerId,
  workListId,
  data,
  newFamilyMembers = [],
  isNewFamilyMember = false,
  requestedChangedEntityId,
}: UpdatePreferredPartnerUserParams): Promise<
  api.ActionResult<UpdatePreferredPartnerUserResponse>
> => {
  const payload = {
    workListUser: data,
    newFamilyMembers,
    isNewFamilyMember,
    requestedChangedEntityId,
  }

  const response = await api.PUT<UpdatePreferredPartnerUserResponse>(
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

export { updatePreferredPartnerUserAction }
