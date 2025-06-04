'use server'

import * as api from '@/api'
import { PreferredPartnerUser } from '@/types'

interface LinkPreferredPartnerUserPatientParams {
  partnerId: string
  worklistId: string
  patientId: string
}

const linkPreferredPartnerUserPatientAction = async ({
  partnerId,
  worklistId,
  patientId,
}: LinkPreferredPartnerUserPatientParams): Promise<
  api.ActionResult<PreferredPartnerUser>
> => {
  const response = await api.POST<PreferredPartnerUser>(
    api.LINK_PREFERRED_PARTNER_USER_PATIENT(partnerId, worklistId, patientId),
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

export type { LinkPreferredPartnerUserPatientParams }
export { linkPreferredPartnerUserPatientAction }
