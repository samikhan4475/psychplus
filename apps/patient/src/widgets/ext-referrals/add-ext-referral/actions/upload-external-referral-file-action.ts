'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { ExternalReferralDocument, UploadAttachmentResponse } from '../types'

interface ProfileImageUploadProps {
  data: FormData
  externalReferralId: string
  documentType: ExternalReferralDocument
}

const uploadExternalReferralFileAction = async ({
  data,
  externalReferralId,
  documentType,
}: ProfileImageUploadProps): Promise<
  api.ActionResult<UploadAttachmentResponse>
> => {
  const result = await api.POST<UploadAttachmentResponse>(
    `${API_URL}/api/externalreferrals/${externalReferralId}/attachments/actions/upload/${documentType}/unauthenticated`,
    data,
    { ignoreHeaders: false },
  )
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { uploadExternalReferralFileAction }
