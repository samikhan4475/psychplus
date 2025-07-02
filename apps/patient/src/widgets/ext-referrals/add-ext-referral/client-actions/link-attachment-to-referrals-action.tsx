'use client'

import type { ActionResult } from '@psychplus-v2/api/client'
import * as api from '@psychplus-v2/api/client'
import { API_URL } from '@psychplus-v2/env'

interface LinkReferrlaAttachmentParams {
  externalReferralId: string
  externalReferralAttachmentId: string
}

const LinkExternalReferralsAttachmentsClientAction = async (
  payload: LinkReferrlaAttachmentParams,
): Promise<ActionResult<void>> => {
  const { externalReferralId, externalReferralAttachmentId } = payload

  const response = await api.POST(
    `${API_URL}/api/externalreferrals/${externalReferralId}/attachments/${externalReferralAttachmentId}/actions/link/unauthenticated`,
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { LinkExternalReferralsAttachmentsClientAction }
